# Node-Day10-Deployment

# 如何搭建一个高可用的node环境
主要解决问题
- 故障恢复
- 多核利用
- 多进程共享端⼝（[查看](https://www.sohu.com/a/247732550_796914)）

守护进程（看门的）
宝塔进程

# ⽂件上传服务器
- scp (最原始)
```bash
scp docker-compose.yml root@47.98.252.43:/root/source/ #⽂件
scp -r mini-01 root@47.98.252.43:/root/source/ #⽂件夹
```
- git (实际⼯作中)
- deploy插件 (debug)