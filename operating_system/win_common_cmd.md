WINDOWS 常用命令
=========================================

* 查看某个端口被占用
	
		netstat -aon|findstr "443"

* 端口映射

	* 增加端口映射，将 10.10.10.10 的 11111 映射到 10.10.10.11 的 80 端口 
	
			netsh interface portproxy add v4tov4 listenport=11111 listenaddress=10.10.10.10 connectport=80 connectaddress=10.10.10.11

	* 删除端口映射 
	
			netsh interface portproxy del v4tov4 listenport=11111 listenaddress=10.10.10.10

	* 查看已存在的端口映射 
	
			netsh interface portproxy show v4tov4

	* 可以通过命令 netstat -ano|find "11111" 查看端口是否已在监听

	* telnet 10.10.10.10 11111 测试端口是否连通

* 延时执行程序

	* ping 的方式（时间精度为1秒）

			@echo off
			@ping 127.0.0.1 -n 5 >nul
			start win_common_cmd.md

	* choice 的方式（ /c 按键列表，/m 提示内容，/n 表示不要显示提示信息，/d默认选择，/t等待秒数，/d 必须和 /t同时出现）

			@echo off
			choice /t 5 /d y /n >nul
			start win_common_cmd.md







