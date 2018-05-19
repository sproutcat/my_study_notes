bootstap-table 对应 angular 的兼容性修改
==========================================

主要针对bootstap-table 1.11.1版本的修改

1. 首先[bootstrap-table.js](https://github.com/wenzhixin/bootstrap-table/blob/develop/dist/bootstrap-table.js)源码的构造器里面增加**initRowAfter**函数:

        BootstrapTable.prototype.initRowAfter = function (trFragments, tr, row) {
            if (tr && tr !== true) {
                trFragments.append(tr);
            }
        }

2. 在[bootstrap-table.js](https://github.com/wenzhixin/bootstrap-table/blob/develop/dist/bootstrap-table.js)源码的第1822行到1824行:

        if (tr&&tr!==true) {
            trFragments.append(tr);
        }   

    改为:

        this.initRowAfter(trFragments, tr, item);


3. 对calculateObjectValue函数的优化，在[bootstrap-table.js](https://github.com/wenzhixin/bootstrap-table/blob/develop/dist/bootstrap-table.js)源码的第1822行到1824行，改为以下代码：

        var funReg = /[^a-zA-Z0-9_.]/g; // 用于判断是否function字符串
        var calculateObjectValue = function (self, name, args, defaultValue) {
            var func = name;

            if (typeof name === 'string') {
                // support obj.func1.func2
                if (funReg.test(name)) {
                    return name;
                } else { // TODO 正则表达式匹配有时会出现匹配不正确的结果，因此以下代码加入异常处理
                    try {
                        var names = name.split('.');

                        if (names.length > 1) {
                            func = window;
                            $.each(names, function (i, f) {
                                func = func[f];
                            });
                        } else {
                            func = window[name];
                        }
                    } catch (e) {
                        return name;
                    }
                }
            }
            if (typeof func === 'object') {
                return func;
            }
            if (typeof func === 'function') {
                return func.apply(self, args || []);
            }
            if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
                return sprintf.apply(this, [name].concat(args));
            }
            return defaultValue;
        };

4. 在[bootstrap-table-angular.js](https://github.com/wenzhixin/bootstrap-table/blob/22ca907e623ab696fd9711f497989cd30abb5d23/dist/extensions/angular/bootstrap-table-angular.js)中重写**initRowAfter**函数，在源码的103行之后添加以下代码：

        // 允许column的formatter支持angular的语法和标签
        $.fn.bootstrapTable.Constructor.prototype.initRowAfter = function (trFragments, tr, row) {
            if (tr && tr !== true) {
                var scope = $s.$new();
                scope.row = row;
                scope.$apply(function () {
                    trFragments.append($compile(tr)(scope));
                })
            }
        }
