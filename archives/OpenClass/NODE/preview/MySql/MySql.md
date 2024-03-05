# MySql
数据库是什么？
用电脑去存储： 比如excel
但是存在以下问题：
- 无法处理大量数据
- 不利于程序读写-需要特别的API
- 关联查询比较困难和统计困难

数据库就是一种专门管理数据的软件
- 可以处理大量数据
- 有统一的程度读写接口比如SQL
- 可以通过统一的语法处理关联查询和统计

## 数据库基础
常用的数据库就是关系型数据库比如 mysql，oricle，sqlserver
### 表 字段 记录

### 数据类型

### 主键-primaryKey
- 自然主键 不靠谱
- 自增主键
- uuid

### SQL
SQL是结构化查询语言的缩写，用来访问和操作数据库系统
Structured Query Language

CREATE TABLE IF NOT EXISTS TBL_RESULT(
  id INT UNSIGNED AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  score INT UNSIGNED NOT NULL,
  PRIMARY KEY (id)
)

show tables;

desc TBL_RESULT;

ALTER TABLE TBL_RESULT MODIFY COLUMN score INT(20) UNSIGNED;

INSERT INTO TBL_RESULT  (name, score) VALUES ('arrow', 100);

SELECT * FROM TBL_RESULT;

UPDATE TBL_RESULT SET score=120 WHRER  name='arrow';

DELETE FROM TBL_RESULT WHRER name='arrow';

SELECT name, score FROM TBL_RESULT WHERE score > 60 ORDER BY score DESC;

SELECT name, AVG(score) FROM TBL_RESULT GROUP BY name;

连接查询
1. 内连接

2. 外连接（需要有一个主表）
SELECT a.name, a.score, b.postion FROM TBL_RESULT a LEFT JOIN TBL_POSITION b ON a.name = b.name;

### 