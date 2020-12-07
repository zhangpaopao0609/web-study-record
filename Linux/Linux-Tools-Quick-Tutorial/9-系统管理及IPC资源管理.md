[toc]

# 9. 系统惯例及 IPC 资源管理

## 9.1 系统管理

### 1. 查询系统版本

查看 linux 系统版本

```bash
uname -a
lsb_release -a
```

查看Unix 系统版本： 操作系统版本

```bash
more /etc/release
```

### 2. 查询硬件信息

查看CPU 使用情况

```bash
sar -u 5 10
```

查询 CPU 信息

```bash
cat /proc/cpuinfo
```

显示内存 信息

```bash
cat /proc/meminfo
```

显示内存page大小（以 KByte为单位）

```bash
pagesize
```

显示架构

```bash
arch
```

### 3. 设置系统时间

显示当前系统时间

```bash
date
```

设置系统日期和时间（格式为2020-12-07-15 17:05:00）:

```bash
date -s 2020-12-07-15 17:05:00
```

设置时区：

```bash
选择时区信息。命令为：tzselect
根据系统提示，选择相应的时区信息
```

## 9.2 IPC 资源管理

### 1. IPC 资源查询

查看系统使用的IPC 资源

```bash
ipcs
```

查看系统使用的 IPC 共享内存资源

```bash
ipcs -m
```

查看系统使用的 IPC 队列资源

```bash
ipcs -q
```

查看系统使用的 IPC 信号量资源

```bash
ipcs -s
```

应用示例：查看IPC 资源被谁占用

有个 IPCKEY： 51036，需要查询其是否被占用

1. 首先通过计算器将其转为16进制

   ```
   51036 -> c75c
   ```

2. 如果知道是被共享内存占用

   ```bash
   ipcs -m | grep c75c
   ```

3. 如果不确定，则直接查找

   ```bash
   ipcs | grep c75c
   ```

### 2. 检查和设置系统资源限制

显示当前所有的系统资源 limit 信息

```bash
ulimit -a
```

对生成的 core 文件的大小不进行限制

```bash
ulimit -c unlimited
```



