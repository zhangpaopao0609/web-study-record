# 定制NodeJS镜像
```bash
# 选择基础镜像，一般选择这个基础，较小
FROM node:10-alpine
# 将. 下的所有文件拷贝至镜像的/app/目录下
ADD . /app/
# 镜像中cd到/app
WORKDIR /app
# 安装依赖
RUN npm install
# 暴露3000端口
EXPOSE 3000
# docker run 时镜像运行的命令
CMD ["node", "app.js"]
```


