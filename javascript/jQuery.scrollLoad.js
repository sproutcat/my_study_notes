/**
 *
 * 延迟执行，监听整体界面的滚动，目标对象可见时，触发事件
 *
 * 如，$("#test").scrollLoad(function() {alert(123);});
 * @Author tangguo
 *
 */
(function($) {
    var index = 0;
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

        var $window = $(window).on("scroll." + scrollId, util.debounce(scrollLoad, 100, 500));
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