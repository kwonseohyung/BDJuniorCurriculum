 /*

cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
mysql -u root -p

 */
 create table `user`(
  `id` varchar(10) PRIMARY key,
  `pw` varchar(10) not null,
  `name` varchar(20) not null
 );

insert into user(id, pw, name) VALUES("1","1","kim"),("a","a","lee"),("test","testpw","테스트용");

insert into file(user_id, title, contents) VALUES("1","lala","zzzzzzzzzzzz");


 CREATE TABLE `file` (
  `id` varchar(10),
  `title` varchar(20) not null,
  `contents` varchar(200),
  foreign key (id) references user(id)
);




CREATE TABLE `activity_file` (
  `id` varchar(10) ,
  `activity_title` varchar(20),
   foreign key (id) references user(id)
);



insert into file(id, activity_title) VALUES("1","");
--
-- create table `user`(
--   `id` varchar(10) PRIMARY key,
--   `pw` varchar(10),
--   `name` varchar(20)
-- )


CREATE TABLE `file` (
  `id` varchar(10) not null,
  `title` varchar(20) not null,
  `contents` varchar(200),
  CONSTRAINT `user_title_unique` UNIQUE (`id`, `title`)
);




CREATE TABLE `activity_file` (
  `id` varchar(10),
  `is_on` varchar(20),
  `activity_title` varchar(20),
);


CREATE TABLE `activity` (
  `id` varchar(10),
  `is_on` varchar(20),
  `activity_title` varchar(20),
  CONSTRAINT `pk_activity` PRIMARY KEY (`id`, `activity_title`)
);










create table `user`(
  `id` varchar(10) PRIMARY key,
  `pw` varchar(10),
  `name` varchar(20)
)
 
create table `user1`(
  `file` varchar(20) PRIMARY key,
  `contents` varchar(200) 
 )

 create table `user2`(
  `file` varchar(20) PRIMARY key,
  `contents` varchar(200),
 )

 create table `user3`(
  `file` varchar(20) PRIMARY key,
  `contents` varchar(200),
 )

CREATE TABLE `activity_file` (
  `user_id` varchar(10),
  `is_on` varchar(20),
  `activity_title` varchar(20),
);











create table `activity_tile`(
  
)

  create table `user2`(
  `file` varchar(20) PRIMARY key,
  `contents` varchar(200)
 )

 create table `user3`(
  `file` varchar(20) PRIMARY key,
  `contents` varchar(200)
 )

CREATE TABLE `activity_file` (
  `user_id` varchar(10) ,
  `is_on` varchar(20),
  `activity_title` varchar(20),
  foreign key (user_id) references file(user_id)
);

CREATE TABLE `activity_file` (
  `user_id` varchar(10) ,
  `is_on` varchar(20),
  `activity_title` varchar(20),
  foreign key (user_id) references file(user_id)
);


 
-- INSERT INTO `author` VALUES (1,'egoing','developer');
-- INSERT INTO `author` VALUES (2,'duru','database administrator');
-- INSERT INTO `author` VALUES (3,'taeho','data scientist, developer');