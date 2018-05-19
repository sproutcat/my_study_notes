React 学习笔记
==================================

1、 环境配置
----------------------------------

* 首先需要安装 [node.js](https://nodejs.org/en/)，如果已安装跳过此步骤;
	
	替换 npm 的源，提升 js 包的下载速度

		npm config set registry https://registry.npm.taobao.org
	
	配置后可通过下面方式来验证是否成功
	
		npm config get registry
		或
		npm info express

* 接着安装 **create-react-app** 包，在命令行输入以下命令：
	
		npm install -g create-react-app

2、 搭建项目
----------------------------------

* 使用 **create-react-app** 创建名称为 **myReact** 的项目，在命令行进入创建项目的根目录，然后输入以下命令：

		create-react-app my-react





