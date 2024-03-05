# git 配置不同的 user 和 name

> 不同的文件下配置不同的 git config

有时候我们需要在一台电脑上开发不同源的代码，一般需要使用不同的的 name 和 email。

> 比如公司的（假设 gitlab）和自己的（github）

我们都知道 git config 的优先级是 system < project < local，所以，可能大部分同学都是先配一个全局的 name 和 email，然后当遇到需要单独配置的项目，就在项目中配置一个本地的 name 和 email，但是这样不仅麻烦，而且还有可能会遗忘，万一用了 gitlab 的 name 提交到了 github，那就有些麻烦了。

本文跟大家讲一个简单便捷的方法

1. 分目录存放 githlab 和 github 的项目

   ```bash
   /Users/zhangpaopao/Desktop/gitlab  ---> 用于存放 gitlab 的项目
   /Users/zhangpaopao/Desktop/github  ---> 用于存放 github 的项目
   ```

2. 在 git 全局配置文件中配置

   - 打开 git 全局配置文件

     一般在 根目录下 `.gitconfig` ，没有的话可以直接新建一个

     ```
     vim .gitconfig
     ```

   - 配置  `.gitconfig` 

     ```bash
     [includeIf "gitdir:/Users/zhangpaopao/Desktop/gitlab"]
             path = ./.gitconfig-gitlab
     [includeIf "gitdir:/Users/zhangpaopao/Desktop/github"]
             path = ./.gitconfig-github
     ```

     > 其实这里的意思很简单，就是根据不同的目录使用不同的 git 配置，这是 git 提供的能力

   - 在根目录下新建 `.gitconfig-gitlab` 和 `.gitconfig-github`

     `.gitconfig-gitlab`

     ```bash
     [user]
         name = gitlab
         email = gitlab@gitlab.com
     ```

     `.gitconfig-github`

     ```bash
     [user]
         name = github
         email = github@github.com
     ```

   - 然后就阔以了

     这样配置以后，只要是在  `/Users/zhangpaopao/Desktop/gitlab` 的项目，git 的配置就会是 gitlab，反义亦然。

     

     有关于 "Conditional Includes" 的更多介绍，请查阅官方文档：https://git-scm.com/docs/git-config#_conditional_includes

