#	ORACLE流复制双向数据同步实践

Stream 是Oracle 的消息队列(也叫Oracle Advanced Queue)技术的一种扩展应用。 <br>
Oracle 的消息队列是通过发布/订阅的方式来解决事件管理。流复制(Stream replication)只是基于它的一个数据共享技术，也可以被用作一个可灵活定制的高可用性方案。 它可以实现两个数据库之间数据库级，schema级，Table级的数据同步，并且这种同步可以是双向的。 Oracle Stream也是通过数据冗余来提高可用性，这一点和Data Guard 类型。



