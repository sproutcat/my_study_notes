Activiti 使用笔记
===========================

一、参考文章
-----------------------------------------------------------

* [Activiti 源码分析](http://jiangwenfeng762.iteye.com/blog/1338553)
* [谈谈Activiti 中流程对象之间的关系](http://www.kafeitu.me/activiti/2012/08/09/activiti-objects.html)
* [Activiti 5.22 框架数据库设计说明](http://lucaslz.com/2016/11/15/java/activiti/activiti-db-5-22/)
* [工作流引擎Activiti使用总结](http://www.kafeitu.me/activiti/2012/03/22/workflow-activiti-action.html)
* [也谈一下Activiti工作流节点的自由跳转](http://blog.csdn.net/bluejoe2000/article/details/41778737)
* [Activti跳过中间节点的helloworld实例程序](http://blog.csdn.net/songzheng_741/article/details/17289633)
* [Activiti从当前任务任意回退至已审批任务](http://blog.csdn.net/bluejoe2000/article/details/39994647)
* [关于activiti驳回等功能的封装](http://blog.csdn.net/aochuanguying/article/details/7594197)
* [优雅的实现Activiti动态调整流程（自由跳转、前进、后退、分裂、前加签、后加签等），含范例代码！](http://blog.csdn.net/bluejoe2000/article/details/42234847)
* [Activiti 工作流会签开发设计思路](http://man1900.iteye.com/blog/1607753)
* [Activiti 实战篇 小试牛刀](http://blog.csdn.net/qq_30739519/article/details/51166062?spm=5176.100239.blogcont58641.3.xczVDw)


二、基础必知必会
---------------------------

* 一个插件：会安装和配置

* 一个引擎ProcessEngine：Activiti的大管家，负责生成流程运行时的各种实例及数据、监控和管理流程的运行。

* 一个配置文件：配置流程引擎创建工具的基本参数和数据库连接池参数

* 5种类型表、25张表

		ACT_GE_*	通用数据，用于不同场景下，如存放资源文件。
		ACT_HI_*	‘HI’表示history。 包含历史数据，比如历史流程实例，变量，任务等等。
		ACT_ID_*	‘ID’表示identity。 包含身份信息，比如用户，组等等，真实业务中一般不用这一套。
		ACT_RE_*	‘RE’表示repository。 包含了流程定义和流程静态资源（图片，规则，等等）。
		ACT_RU_*	‘RU’表示runtime。包含流程实例，任务，变量，异步任务，等运行中的数据。

	* 通用数据表说明：

			act_ge_bytearray		二进制数据表
			act_ge_property			属性数据表存储整个流程引擎级别的数据,初始化表结构时，会默认插入三条记录

	* 历史数据表说明：

			act_hi_actinst			历史节点表
			act_hi_attachment		历史附件表
			act_hi_comment			历史意见表
			act_hi_identitylink		历史流程人员表
			act_hi_detail			历史详情表，提供历史变量的查询
			act_hi_procinst			历史流程实例表
			act_hi_taskinst			历史任务实例表
			act_hi_varinst			历史变量表

	* 身份信息表说明：

			act_id_group			用户组信息表
			act_id_info				用户扩展信息表
			act_id_membership		用户与用户组对应信息表
			act_id_user				用户信息表

	* 流程定义、流程的资源表说明：

			act_re_deployment		部署信息表
			act_re_model			流程设计模型部署表
			act_re_procdef			流程定义数据表

	* 运行时表说明：

			act_ru_event_subscr		throwEvent、catchEvent时间监听信息表
			act_ru_execution		运行时流程执行实例表
			act_ru_identitylink		运行时流程人员表，主要存储任务节点与参与者的相关信息
			act_ru_job				运行时定时任务数据表
			act_ru_task				运行时任务节点表
			act_ru_variable			运行时流程变量数据表

	* 其他

			ACT_EVT_LOG				事件日志表
			ACT_PROCDEF_INFO		流程定义扩展表

	详细表结构请看[Activiti 5.22 框架数据库设计说明](http://lucaslz.com/2016/11/15/java/activiti/activiti-db-5-22/)

* 7项基本操作：

	* 设计流程图（各种组件，如连线、用户任务、网关）
	* 流程定义增删改查
	* 流程变量增删改查
	* 启动流程定义
	* 任务增删改查
	* 完成任务
	* 历史信息查询

* 7个service

		RepositoryService	流程仓库类，管理流程定义：bpmn文件和流程图片
		RuntimeService		执行管理，包括启动、推进、删除流程实例等操作
		TaskService			任务管理
		HistoryService		历史管理(执行完的数据的管理)
		IdentityService		组织机构管理
		FormService			任务表单管理
		ManagerService		定时器任务服务



三、多实例实现会签
------------------------------------------------------

* 会签说明

	会签，是指多个人员针对同一个事务进行协商处理，共同签署决定一件事情。 
	在工作流中会签，是指多个人员在同一个环节进行处理，同一环节的有多个处理人并行处理，按照配置规则，固定比例的人员办理完成后即可继续扭转至下一环节。

* 会签实现

	目前Activiti支持自定义配置完成比例，即 一定比例的人员 办理完成之后 即可扭转至下一步，这样就可以实现 多人处理一人审批即可通过和全部人员审批后才可通过，两种处理形式，配置方式如下：

		<userTask id="sid-1D9A88B5-D0DC-4056-A5DF-179D7220B76F" 
		          name="生产部领导会签" 
		          activiti:assignee="${assignee}" 
		          activiti:candidateGroups="生产部领导">
			<multiInstanceLoopCharacteristics isSequential="false" 
		                                       activiti:collection="${assignees}" 
		                                       activiti:elementVariable="assignee">
				<completionCondition>${nrOfCompletedInstances/nrOfInstances>0}</completionCondition>
			</multiInstanceLoopCharacteristics>
		</userTask>

	说明：

	* 1：此配置依赖外部传入流程参数 assignees，类型为 List<String>，此为所有参与审批的人员集合。

	* 2：activiti:elementVariable="assignee" 为内部处理参数，工作流引擎循环遍历处理这些人员时使用assignee变量来存储每一个人员信息。

	* 3：activiti:assignee="${assignee}"，执行审批人，此变量不需外部传入，对应上述第二点的内部变量。

	* 4：activiti:candidateGroups="生产部领导"，可不用配置，此处有配置是用来解析环节会签人员使用。
	
	* 5：**${nrOfCompletedInstances/nrOfInstances>0}**，配置完成比例，此处配置为>0,代表任意一人处理后即可扭转。

		* **nrOfInstances** 实例总数。

		* **nrOfCompletedInstances** 当前还没有完成的实例nr是number单词缩写。

		* **loopCounter** 已经循环的次数。

		* **nrOfActiveInstances** 已经完成的实例个数。

	* 6：isSequential="false" ，代表并行处理。








