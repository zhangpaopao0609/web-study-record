# 简介
Compose 项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速编排
也就是说，如果我有好几个docker的话，我想要一起工作，该怎么办


```yml
version: '2.0'
services:
  mongo:
    image: mongo
    restart: always
    ports: 
      - 27017:27017
  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 60900:8081

```