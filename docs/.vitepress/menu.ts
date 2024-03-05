import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  { text: '起源', link: '/fate/' },
  { text: 'Git', link: '/git/' },
  { text: '包管理器', link: '/package-manager/' },
  { text: 'Linter', link: '/linter/' },
  { text: '文章', link: '/articles/' },
];

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fate/': [
    {
      text: '缘起',
      items: [
        { text: '一切的起点', link: '/fate/' },
        { text: '查看目录', link: '/fate/catalog' },
      ],
    },
  ],
  '/git/': [
    {
      text: 'Git',
      link: "/git/",
      items: [
        {
          text: 'git 基础',
          base: "/git/pro-git",
          items: [
            { text: '01-起步', link: '/01-起步.md' },
            { text: '02-git基础', link: '/02-git基础.md' },
            { text: '03-git分支', link: '/03-git分支.md' },
            { text: '04-git配置', link: '/04-git配置.md' },
            { text: '05-git常用命令汇总', link: '/05-git常用命令汇总.md' },
          ],
        },
        {
          text: '常见问题',
          base: "/git/faq",
          items: [
            { text: 'git fetch 和 git pull 的区别', link: '/fetch-pull-diff.md' },
            { text: 'git reset 和 git revert 的区别', link: '/reset-revert-diff.md' },
            { text: 'git submodule', link: '/git-submodule.md' },
            { text: 'git 配置不同的 user 和 name', link: '/configure-diff-git-configs-under-different-files.md' },
          ],
        },
      ],
    },
  ],
  '/package-manager/': [
    {
      text: '包管理器',
      link: '/package-manager/',
      items: [
        { text: '介绍', link: '/package-manager/index.md' },
        { text: 'workspace', link: '/package-manager/workspace.md' },
        { text: 'monorepo', link: '/package-manager/monorepo.md' },
      ],
    },
  ],
  '/linter/': [
    {
      text: 'Linter',
      link: '/linter/',
    },
    {
      text: '1. ESLint',
      items: [
        {
          text: 'ESLint 简述',
          link: '/linter/01-eslint/index.md',
        },
        {
          text: 'ESLint 使用',
          link: '/linter/01-eslint/use.md',
        },
      ],
      // collapsed: true,
    },
    {
      text: '2. StyleLint',
      items: [
        {
          text: 'StyleLint 简述',
          link: '/linter/02-stylelint/index.md',
        },
        {
          text: 'StyleLint 使用',
          link: '/linter/02-stylelint/use.md',
        },
      ],
      // collapsed: true,
    },
    {
      text: '3. Prettier',
      items: [
        {
          text: 'Prettier 简述',
          link: '/linter/03-prettier/index.md',
        },
        {
          text: 'Prettier 使用',
          link: '/linter/03-prettier/use.md',
        },
      ],
      // collapsed: true,
    },
    {
      text: '4. TSLint',
      items: [
        {
          text: 'TSLint 简述',
          link: '/linter/04-tslint/index.md',
        },
      ],
    },
    {
      text: '5. Commitlint',
      items: [
        {
          text: 'Commitlint 简述',
          link: '/linter/05-commitlint/index.md',
        },
      ],
    },
    {
      text: '6. Husky',
      items: [
        {
          text: 'husky 简述',
          link: '/linter/06-husky/index.md',
        },
      ],
    },
    {
      text: '7. 实战',
      items: [
        {
          text: 'Lint 实战',
          link: '/linter/07-practice/index.md',
        },
      ],
    },
  ],
  '/project-config/': [
    {
      text: '搭建一个项目需要做的事情',
      items: [
        {
          text: 'Configuring Vite',
          link: '/project-config/',
        },
      ],
    },
  ],
  '/articles/': [
    {
      text: '文章',
      items: [
        {
          text: 'JavaScript',
          collapsed: true,
          base: "articles/javascript",
          items: [
            { text: '聊2022年 JS 都有哪些更新', link: '/2022-js-update/README.md' },
            { text: '数组 fill 方法有坑呐', link: '/silly-bug-in-array-fill-method-in-es6/README.md' },
          ]
        },
        {
          text: 'Mobile',
          base: "articles/mobile",
          items: [{ text: 'H5 陀螺仪', link: '/H5-gyroscope/README.md' }]
        },
        {
          text: 'Repository',
          collapsed: true,
          base: "articles/repository",
          items: [
            { text: '守护世界守护你', link: '/guarding-the-world-guarding-you/README.md' },
            { text: '四不像项目要如何进化', link: '/how-to-evolve-four-dissimilar-projects/README.md' },
            { text: '简单介绍一下项目仓库模式', link: '/intro-different-repository/README.md' },
            { text: '你所需要了解的关于 Monorepo 的一切', link: '/monorepo/README.md' },
          ]
        },
        {
          text: 'Vue',
          base: "articles/vue",
          items: [
            { text: '谈谈如何”正确“的使用 Vuex', link: '/how-to-use-vuex-correctly/README.md' },
          ]
        },
        {
          text: '设计模式',
          base: "articles/design-patterns",
          items: [
            { text: '适配器模式', items: [{ text: '统一接口', link: '/adapter/uniform-interface/README.md' }] },
          ]
        },
        {
          text: '前端',
          collapsed: true,
          base: "articles/front-end",
          items: [
            { text: '微前端的暗位面', link: '/the-dark-side-of-the-micro-front-end/README.md' },
            { text: '项目依赖的版本范围控制浅谈', link: '/study-semantic/README.md' },
            { text: '原来 peerDependencies 是这么个东东', link: '/peer-dependencies/README.md' },
          ]
        },
        {
          text: '网络',
          base: "articles/network",
          items: [
            { text: '服务端推送全貌', link: '/how-to-receive-server-side-push/README.md' },
          ]
        },
        {
          text: 'CSS',
          base: "articles/css",
          items: [
            { text: 'Sass 还可以这么玩 —— Sass 批量生成 `padding` 和 `margin`', link: '/padding-margin-classed-with-sass/README.md' },
          ]
        },
        {
          text: '程序',
          base: "articles/programming",
          items: [
            { text: '静态类型 vs 动态类型 和 弱类型 vs 强类型', link: '/static-vs-dynamic-and-weak-vs-strong/README.md' },
          ]
        },
        {
          text: '算法',
          base: "articles/alg",
          items: [
            { text: '大数之和', link: '/big-sum/README.md' },
          ]
        },
      ],
    },
  ],
};
