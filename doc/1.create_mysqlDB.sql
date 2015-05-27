/*
* 测试库 demoDB 的创建脚本
*/
create database  if not exists demoDB  DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; 


/*
* 测试表 user 的创建
*/
use demoDB;

create table user
(
   user_id            int not null auto_increment,
   name          	  varchar(64) not null default '',
   age      		  int not null  default 0 comment '用户年龄',
   sex 			      int not null  default 0 comment '0=男，1=女',
   create_time          datetime not null default '2014-09-01',
   _timestamp           timestamp not null default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   primary key (user_id) 
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
AUTO_INCREMENT = 1;

alter table user comment '测试例子表user';


