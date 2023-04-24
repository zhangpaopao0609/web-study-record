[toc]

# 服务器上的 Git

## 4.1 协议

本地协议（local） HTTP协议， SSH（Secure Shell）协议及 Git 协议

### 1. 本地协议

local protocol

### 2. HTTP 协议

### 3. SSH 协议

### 4. Git 协议

## 4.2 在服务器上搭建 Git

## 4.3 生成 SSH 公钥

默认情况下，用户的SSH密钥存储在其 `~/ .ssh`目录下。进入该目录并列出其中内容，便可以快速确认自己是否已拥有密钥

```bash
cd ~/ .ssh
ls
# authorized_keys2 id_dsa known_hosts config id_dsa.pub
```

我们需要寻找一对以 `id_dsa` 或 `id_rsa` 命名的文件，其中一个带有 `.pub` 扩展名。 `.pub` 文件是你的公钥，另一个则是私钥。如果找不到这样的文件，或者根本没有 `.ssh` 目录，可以通过运行 `ssh-keygen` 程序来创建它们。在 Linux/mac 系统中， `ssh-keygen` 随着 SSH 软件包提供；在 Windows 上，该程序包含于 MSysGit 软件包中。

```bash
$ ssh-keygen 
Generating public/private rsa key pair.
Enter file in which to save the key (/home/schacon/.ssh/id_rsa): 
Created directory '/home/schacon/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/schacon/.ssh/id_rsa. 
Your public key has been saved in /home/schacon/.ssh/id_rsa.pub. 
The key fingerprint is: d0:82:24:8e:d7:f1:bb:9b:33:53:96:93:49:da:9b:e3 schacon@mylaptop.local
```

首先 `ssh-keygen` 会确认密钥的存储位置（默认是 `.ssh/id_rsa`），然后它会要求你输入两次密钥口令。如果你不想在使用密钥时输入口令，将其留空即可。  

现在，找到你的公钥，大致是以下这样的。

```bash
cat ~/ .ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3 Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx NrRFi9wrf+M7Q== schacon@mylaptop.local
```

[更多关于在系统中生成SSH密钥的教程，参阅 GitHub 的 SSH 密钥指南](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/connecting-to-github-with-ssh)

## 4.4 配置服务器

## 4.5 Git 守护进程

## 4.6 Smart HTTP

## 4.7 GitWeb

## 4.8 GitLab









``

















