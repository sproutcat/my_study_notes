React 学习笔记
==================================

* <a href="http://www.css88.com/react/docs/hello-world.html" target="_blank">React 快速入门</a>
* <a href="http://www.css88.com/react/tutorial/tutorial.html" target="_blank">React 教程</a>
* <a href="https://ant.design/docs/react/getting-started-cn" target="_blank">Ant 快速入门</a>


* 解决 **create-react-app** 构建项目慢的问题，替换 npm 的源，提升 node.js 包的下载速度

		npm config set registry https://registry.npm.taobao.org
	
	配置后可通过下面方式来验证是否成功
	
		npm config get registry
		或
		npm info express

* JSX 的基本语法规则：遇到 HTML 标签（一对首字母小写的标签），就用 HTML 规则解析；遇到代码块（一对 **{}** 之间），就用 JavaScript 规则解析

* 渲染 HTML 标签，声明变量采用 首字母小写

* 组件类的第一个字母必须大写，因为渲染 React 组件，声明变量采用 首字母大写

* 组件类只能包含一个顶层标签

* 组件的属性可以在组件类的 **this.props** 对象上获取

* class 属性需要写成 **className** ，for 属性需要写成 **htmlFor**

* **this.props.children** 属性表示组件的所有子节点

* **this.props.children** 的值有三种可能：如果当前组件没有子节点，它就是 **undefined** ;如果有一个子节点，数据类型是 **Object** ；如果有多个子节点，数据类型就是 **Array**

* React 提供一个工具方法 **React.Children** 来处理 **this.props.children** 。我们可以用 **React.Children.map** 来遍历子节点

* 由于 **this.refs.[refName]** 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错

* **this.props** 表示那些一旦定义，就不再改变的特性，而 **this.state** 是会随着用户互动而产生变化的特性

* 我们写一个 JSX 标签，实质上就是在调用 **React.createElement** 这个方法，并返回一个 **ReactElement** 对象

* 当需要拓展我们的属性的时候，定义个一个属性对象，并通过 **{…props}** 的方式引入

* 属性值使用表达式，只要用 **{}** 替换 **""**

* 在一个组件的子元素位置使用注释要用 **{}** 包起来

* 直接在标签上使用 **style** 属性时，要写成 **style={{}}** 是两个大括号

* **margin-top** 要写成 **marginTop**

* 如果需要使用自定义属性，要加 **data-** 前缀

* 在编写 **JSX** 时，在 **{}** 中不能使用语句（if 语句、 for 语句等等），但可以使用求值表达式

* **map** 遍历的时候，需要为每一条记录添加 **key**

* 在 ES6 里，我们通过定义一个继承自 **React.Component** 的 **class** 来定义一个组件类

* 给组件定义方法不再用 **componentName:function()** 的写法，而是直接用 **componentName()** ，在方法的最后也不能有逗号了

* 在 ES6 下，你需要通过 **bind** 来绑定 **this** 引用，或者使用箭头函数（它会绑定当前 **scope** 的 **this** 引用）来调用 **sources** 下，点开可以看到 webpack: 目录，里面可以直接看到我们开发态的源代码，方便调试

* "build": "rimraf app/dist && webpack -p --env.config production" 先清除 dist 目录




