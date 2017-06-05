# WINDOWS下查找程序进程，并杀死进程

### 一、查看占用指定端口的程序

查询占用了8080端口的进程：
    
    netstat -ano|findstr "8080"
    
命令行显示如下：

    C:\Users\Administrator>netstat -ano|findstr "8080"
      TCP    0.0.0.0:8080           0.0.0.0:0              LISTENING       12672
      TCP    [::]:8080              [::]:0                 LISTENING       12672

LISTENING后面为进程号，看用这个进程号在命令行中查找到相应的进程，或者直接杀死进程。

### 二、通过任务管理器杀死相关的进程

###### 方法一：使用任务管理器杀死进程
打开任务管理器->查看->选择列->然后勾选PID选项，回到任务管理器上可以查看到对应的pid，然后结束进程
当然上面的方法有时候不好用，就是任务管理器中的进程比较多的时候，然后去找到对应的进程是很麻烦的，
所以还有一种方法可以杀死进程的

###### 方法二：使用命令杀死进程
1、首先找到进程号对应的进程名称
tasklist|findstr 进程号

    tasklist|findstr 12672
    
2、然后根据进程名称（或进程号）杀死进程
taskkill /f /t /im 进程名称（或进程号）

    taskkill /f /t /im java.exe
    或
    taskkill /f /t /im 12672
    
### 参考文章

[Window 通过cmd查看端口占用、相应进程、杀死进程等的命令](http://blog.csdn.net/jiangwei0910410003/article/details/18967441)
