#centos6.5系统下安装jdk1.7

###下载jdk1.7

从官网上下载rpm格式的包 [jdk下载 官方网址](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)

（我下的是jdk-7u79-linux-x64.rpm）

上传到centos系统中去，然后通过rpm命令安装

	rpm -ivh jdk-7u79-linux-x64.rpm
	
###配置环境变量

通过修改 /etc/profile，我们可以设置jdk的全局环境变量，它是所有用户的共用的环境变量。输入命令：

	vi /etc/profile

然后在打开的文件末尾添加如下内容：

	export JAVA_HOME=/usr/java/jdk1.7.0_79
	export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
	export PATH=$PATH:$JAVA_HOME/bin

使环境变量立即生效，输入命令：

	source /etc/profile

###检验是否安装成功

输入命令：

	java    #检测jdk bin环境

接着输入：

	javac  #检测jdk classpath环境

