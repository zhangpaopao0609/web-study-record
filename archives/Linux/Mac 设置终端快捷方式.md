# Mac 设置终端命令快捷方式

有的命令我们会反复使用，比如：`git status`, `git commit -am`，这些命令还算短且比较好记的，再比如启动 mongoDB 的命令`mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork`，类似这样的，除了每次手打麻烦外，还有可能错，因此，我们需要为这些命令设置快捷方式。

1. 打开 `.bash_profile`

   ```bash
   vim ~/.bash_profile
   ```

   没有这个文件的话上述命令会自动创建的

2. 在文件末尾添加命令

   假设期望把 `git status` 用 `gs` 来代替

   ```bash
   alias gs='git status'
   ```

   假设期望把 `mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork` 用 `mongod-start` 来代替

   ```bash
   alias mongod-start='mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork'
   ```

3. 生效

   上述快捷方式输入完成后，在终端输入下述命令使得快捷方式生效

   ```bash
   source ~/.bash_profile
   ```

4. 可以使用啦

5. 注意事项

   如果使用的终端是zsh，可能会有重启终端后别名无法使用的问题，执行以下操作

   ```bash
   vim ~/.zshrc
   ```

   然后在文件末尾添加

   ```bash
   source ~/.bash_profile
   ```
