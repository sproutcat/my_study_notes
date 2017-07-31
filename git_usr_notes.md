GIT使用笔记（命令行）
================================

### 标签（tag）

列出现有标签的命令：

	git tag

列出特定标签的命令：

	git tag -l 'v1.4.2.*'

打标签的命令

	git tag -a tagName -m 'my version 1.4'

推送指定标签的命令：

	git push origin tagName

推送所有本地标签的命令：

	git push origin --tags	

删除本地标签的命令：

	git tag -d tagName

删除远程标签的命令：

	git push origin :refs/tags/tagName







