angular ionic使用笔记
===================================

0、参考资料
-----------------------------------

* [nodejs+ionic+cordova+intellijIdea搭建webApp环境](http://blog.csdn.net/btshjhewei/article/details/51068262)
* [Ionic 2 With TypeScript 入门](https://yanxiaodi.gitbooks.io/ionic2-guide/content/)

1、环境配置
-----------------------------------

* 安装java环境（建议安装jdk8），并配置环境变量
* 安装[Android SDK](http://www.androiddevtools.cn/)，并配置环境变量
* 安装Intellij Idea，并在IDEA中添加Cordova插件
* 安装Genymotion虚拟机
* 安装[node.js](https://nodejs.org/en/)
* 安装cordova，在命令行输入以下指令：**npm install -g cordova**
* 安装ionic，在命令行输入以下指令：**npm install -g ionic**

2、搭建demo项目
-----------------------------------

* 用命令行进入指定目录，在指定目录输入指令创建demo项目：

 		ionic start ionic_demo

* 添加Android组件，执行以下指令：

		ionic cordova platform add android

* 添加IOS组件，执行以下指令：

		ionic cordova platform add ios

* 在命令行中运行 **ionic serve** 指令，运行成功后会自动启动流浏览器，查看当前效果

