anguler.js 1.x使用笔记
=======================

>该使用笔记，主要针对angular1.x版本的使用。

### 基础知识

* [Angular.js官方站点](https://angularjs.org/)
* [Angular.js中文教程](http://www.runoob.com/angularjs/angularjs-tutorial.html)
* [Angular.js中文社区](http://www.angularjs.cn/)  [AngularJS快速开始](http://www.angularjs.cn/A002)

### 获取angular的作用域

通过ID获取：

	var scope = angular.element(document.getElementById('modle')).scope();
	
改变作用域内的某个值(如，score内有个title属性)：

	scope.$apply(function() {
		scope.title += " 1111";
	});

### 手动插入DOM


