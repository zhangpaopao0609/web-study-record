# 简单Nginx服务
1. 拉取官方镜像 - 面向docker的只读模板 
docker pull nginx

2. 查看
docker images nginx 

3. 制作index.html
mkdir www
echo 'hello docker !!' >> www.index.html

4. 启动
www目录里面放一个index.html 
docker run -p 6090:80 /data/www/:/usr/share/nginx/html nginx

5. 后台启动
docker run -p 6090:80 /data/www/:/usr/share/nginx/html -d nginx

6. 停止
docker stop dockerID

7. 查看进程
docker ps
docker ps -a

8. 伪终端（进入docker 容器）
docker exec -it dockerID /bin/bash

9. 删除docker
docker rm dockerID

