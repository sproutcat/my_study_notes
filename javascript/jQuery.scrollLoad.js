
var util = (function () {
    return {
        /**
         * 高频执行事件/方法的防抖
         * @param Function fn 		延时调用函数
         * @param Number delay 		延迟多长时间
         * @param Number atleast 	至少多长时间触发一次
         * @return Function 		延迟执行的方法
         */
        debounce : function(fn, delay, atleast) {
            var timer = null;
            var previous = null;

            return function () {
                var me = this, args = arguments;
                var now = +new Date();

                if ( !previous ) previous = now;

                if ( now - previous > atleast ) {
                    fn.apply(me, args);
                    // 重置上一次开始时间为本次结束时间
                    previous = now;
                } else {
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        fn.apply(me, args);
                    }, delay);
                }
            }
        }
    }
})();

/**
 *
 * 延迟执行，监听整体界面的滚动，目标对象可见时，触发事件
 *
 * 如，$("#test").scrollLoad(function() {alert(123);});
 * @Author tangguo
 *
 */
(function($) {
    var index = 0, $window = $(window);
    $.fn.scrollLoad = function(fn) {
        if(!fn) return false;
        var $me = $(this), scrollId = "scrollLoad" + (index++),
            inview, loaded;
        //util.log(scrollId);

        $me.on("scrollLoad", function(e) {
            if(fn.call(this) == false) {
                return false;
            }
            //util.log("=======delayLoad===========");
            $me.unbind("scrollLoad");
            $window.unbind("scroll." + scrollId);
        });

        $window.on("scroll." + scrollId, util.debounce(scrollLoad, 100, 500));
        scrollLoad();

        function scrollLoad() {
            //util.log("=======scrollLoad===========" + scrollId);
            if($me.is(":visible") == false) return false; // 隐藏的元素不需要继续执行
            inview = $me.filter(function() {

                var a = $window.scrollTop(),
                    b = $window.height(),
                    c = $(this).offset().top,
                    d = $(this).height();

                return c + d >= a && c <= a + b;
            });

            loaded = inview.trigger('scrollLoad');
            $me = $me.not(loaded);
        };
    };

})(jQuery);