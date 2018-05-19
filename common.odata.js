/**
 * 参照kendo.data.odata.js，主要处理中文乱码参数的问题
 * 源码地址：https://github.com/telerik/kendo-ui-core/blob/f68dbc2b3a4b51958c77be30234a44b39b9efbc1/src/kendo.data.odata.js
 * var params = {
 *  filter: { field: "name", operator: "contains", value: "测试" },
 *  sort: { field: "itemOrder", dir: "desc" },
 *  take: 10
 * };
 * $.toOdata(params);
 */
(function ($, undefined) {
    var odataFilters = {
            eq: "eq",
            neq: "ne",
            gt: "gt",
            gte: "ge",
            lt: "lt",
            lte: "le",
            ni:"ni",
            in: "in",
            like: "substringof",
            nolike: "substringof",
            contains: "substringof",
            doesnotcontain: "substringof",
            endswith: "endswith",
            startswith: "startswith",
            isnull: "eq",
            isnotnull: "ne",
            isempty: "eq",
            isnotempty: "ne"
        },
        mappers = {
            pageSize: $.noop,
            page: $.noop,
            filter: function (params, filter, useVersionFour) {
                if (filter) {
                    filter = toOdataFilter(filter, useVersionFour);
                    if (filter) {
                        params.$filter = filter;
                    }
                }
            },
            sort: function (params, orderby) {
                if (!$.isArray(orderby)) {
                    orderby = [orderby];
                }
                var expr = $.map(orderby, function (value) {
                    var order = value.field.replace(/\./g, "/");

                    if (value.dir === "desc") {
                        order += " desc";
                    }

                    return order;
                }).join(",");

                if (expr) {
                    params.$orderby = expr;
                }
            },
            skip: function (params, skip) {
                if (skip) {
                    params.$skip = skip;
                }
            },
            take: function (params, take) {
                if (take) {
                    params.$top = take;
                }
            }
        };

    function toOdataFilter(filter, useOdataFour) {
        var result = [],
            logic = filter.logic || "and",
            idx,
            length,
            field,
            type,
            format,
            operator,
            value,
            ignoreCase,
            filters;

        if (filter.field) {
            filters = [filter];
        } else {
            filters = filter.filters || [];
        }

        for (idx = 0, length = filters.length; idx < length; idx++) {
            filter = filters[idx];
            field = filter.field;
            value = filter.value;
            operator = filter.operator;

            if (filter.filters) {
                filter = toOdataFilter(filter, useOdataFour);
            } else {
                ignoreCase = filter.ignoreCase;
                field = field.replace(/\./g, "/");
                filter = odataFilters[operator];
                if (useOdataFour) {
                    filter = odataFilters[operator];
                }

                if (operator === "isnull" || operator === "isnotnull") {
                    filter = myFormat("{0} {1} null", field, filter);
                } else if (operator === "isempty" || operator === "isnotempty") {
                    filter = util.formatmyFormat("{0} {1} ''", field, filter);
                } else if (filter && value !== undefined) {
                    type = $.type(value);
                    if (type === "string") {
                        format = "'{1}'";
                        value = value.replace(/'/g, "''");

                        if (ignoreCase === true) {
                            field = "tolower(" + field + ")";
                        }
                        value = encodeURIComponent(value);

                    } else if (type === "date") {
                        format = "datetime'{1:yyyy-MM-dd HH:mm:ss}'";
                    } else {
                        format = "{1}";
                    }

                    if (filter.length > 3) {
                        if (filter !== "substringof") {
                            format = "{0}({2}," + format + ")";
                        } else {
                            format = "{0}(" + format + ",{2})";
                            if (operator === "doesnotcontain") {
                                if (useOdataFour) {
                                    format = "{0}({2},'{1}') eq -1";
                                    filter = "indexof";
                                } else {
                                    format += " eq false";
                                }
                            }
                        }
                    } else {
                        format = "{2} {0} " + format;
                    }

                    filter = myFormat(format, filter, value, field);
                }
            }

            filter && result.push(filter);
        }

        filter = result.join(" " + logic + " ");

        if (result.length > 1) {
            filter = "(" + filter + ")";
        }

        return filter;
    }

    function myFormat() {
            var str = arguments[0] || "", _d;
            if (!str) return false;
            var data = Array.prototype.slice.call(arguments, 1);
            if (data.length == 1 && (angular.isObject(data[0]) || angular.isArray(data[0]))) {
                data = data[0];
            }
            return str.replace(
                /\{(\w+)(:[^\}]+)?(\.[^\}]+)?\}/g,
                function (m, i, f) {
                    _d = data[i];
                    if (typeof _d == "undefined" || _d == null) {
                        return "";
                    } else if (angular.isDate(_d)) {
                        return _d.format(f.substr(1));
                    } else if (angular.isObject(_d) || angular.isArray(_d)) {
                        return JSON.stringify(_d);
                    } else {
                        if (f && f.length > 1) {
                            _d = new Date(_d).format(f.substr(1));
                        }
                        return _d;
                    }
                });
        }

    $.extend({
        toOdata: function (options) {
            options = options || {};

            var params = {
                $inlinecount: "allpages"
            };

            for (var option in options) {
                if (mappers[option]) {
                    mappers[option](params, options[option], true);
                } else {
                    params[option] = options[option];
                }
            }
            return params;
        },
        toOdataFilter: function (filters) {
            return toOdataFilter(filters, true)
        },
        toFormat: myFormat
    })

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
    if (!Date.prototype.format) {
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "H+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }

})(jQuery);