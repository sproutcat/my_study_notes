### MYSQL 备份脚本笔记

###### Windows 系统下的备份脚本

* 创建一个批处理脚本文件 **mysql_dump_win.bat** ，内容如下：

    @echo off
    title MYSQL 数据备份脚本
    
    echo MySQL 备份开始
    
    :: 保存备份天数
    set backup_day=15
    
    :: 备份保存路径
    set backup_dir=D:\mysql_backup
    
    :: 日期
    set backup_date=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
    
    :: 备份工具（注意：如 mysqldump 不在系统的环境变量中，必须要配置绝对路径）
    set tool=mysqldump
    
    :: 用户名
    set username=root
    
    :: 密码
    set password=root
    
    :: 将要备份的数据库
    set database_name=datasystem
    
    :: 如果文件夹不存在则创建
    if not exist %backup_dir% (
    	echo 创建 %backup_dir% 备份目录
    	md %backup_dir%
    )
    
    :: 简单写法 mysqldump -u root -p123456 databaseName > D:\mysql_backup\filename.sql
    echo 备份 %database_name% 数据
    %tool% -u %username% -p%password% %database_name% > %backup_dir%\%database_name%_%backup_date%.sql
    
    :: 写创建备份日志
    echo "create %backup_dir%\%database_name%_%backup_date%.dupm" >> %backup_dir%\backup_log.txt
    
    :: 找出需要删除的备份
    echo 删除 %backup_day% 天前的备份
    forfiles /p "%backup_dir%" /m %database_name%_*.sql -d -%backup_day% /c "cmd /c del /f @path"
    
    :: 写删除备份日志
    echo "Delete backups %backup_day% days ago" >> %backup_dir%\backup_log.txt
    
    echo MySQL 备份结束
    
    :: 延迟 10 秒关闭
    @ping 127.0.0.1 -n 10 >nul
    
    @echo on


###### Linux 系统下的备份脚本

* 创建一个 bash 脚本文件 **mysql_dump_linux.sh** ，内容如下：

    #!/bin/bash
    
    #保存备份个数，备份31天数据
    
    number=15
    
    #备份保存路径
    
    backup_dir=/root/mysql_backup
    
    #日期
    
    dd=`date +%Y-%m-%d-%H-%M-%S`
    
    #备份工具
    
    tool=mysqldump
    
    #用户名
    
    username=root
    
    #密码
    
    password=root
    
    #将要备份的数据库
    
    database_name=datasystem
    
    #如果文件夹不存在则创建
    
    if [ ! -d $backup_dir ];
    
    then
    
    mkdir -p $backup_dir;
    
    fi
    
    #简单写法 mysqldump -u root -p123456 users > /D:/cshl_backup/users-$filename.sql
    
    $tool -u $username -p$password $database_name > $backup_dir/$database_name-$dd.sql
    
    #写创建备份日志
    
    echo "create $backup_dir/$database_name-$dd.dupm" >> $backup_dir/log.txt
    
    #找出需要删除的备份
    
    delfile=`ls -l -crt $backup_dir/*.sql | awk '{print $9 }' | head -1`
    
    #判断现在的备份数量是否大于$number
    
    count=`ls -l -crt $backup_dir/*.sql | awk '{print $9 }' | wc -l`
    
    if [ $count -gt $number ]
    
    then
    
    #删除最早生成的备份，只保留number数量的备份
    
    rm $delfile
    
    #写删除文件日志
    
    echo "delete $delfile" >> $backup_dir/log.txt
    
    fi

