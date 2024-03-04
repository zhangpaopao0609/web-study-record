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
      // collapsed: true,
      link: '/git/',
      items: [
        {
          text: 'git 基础',
          items: [
            { text: '01-起步', link: '/git/pro-git/01-起步.md' },
            { text: '02-git基础', link: '/git/pro-git/02-git基础.md' },
            { text: '03-git分支', link: '/git/pro-git/03-git分支.md' },
            { text: '04-git配置', link: '/git/pro-git/04-git配置.md' },
            { text: '05-git常用命令汇总', link: '/git/pro-git/05-git常用命令汇总.md' },
          ],
        },
        {
          text: '常见问题',
          items: [
            { text: 'git fetch 和 git pull 的区别', link: '/git/faq/fetch-pull-diff.md' },
            { text: 'git reset 和 git revert 的区别', link: '/git/faq/reset-revert-diff.md' },
            { text: 'git submodule', link: '/git/faq/git-submodule.md' },
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
      link: '/articles/',
      items: [
        { text: 'JavaScript', items: [{ text: '聊2022年 JS 都有哪些更新', link: '/articles/javascript/2022-js-update/README.md' }] },
        { text: 'Mobile', items: [{ text: 'H5 陀螺仪', link: '/articles/mobile/H5-gyroscope/README.md' }] },
        { text: 'Repository', 
          items: [
            { text: '守护世界守护你', link: '/articles/repository/guarding-the-world-guarding-you/README.md' },
            { text: '四不像项目要如何进化', link: '/articles/repository/how-to-evolve-four-dissimilar-projects/README.md' },
            { text: '简单介绍一下项目仓库模式', link: '/articles/repository/intro-different-repository/README.md' },
          ] 
        },
        { text: 'Vue', 
          items: [
            { text: '谈谈如何”正确“的使用 Vuex', link: '/articles/vue/how-to-use-vuex-correctly/README.md' },
            { text: '四不像项目要如何进化', link: '/articles/repository/how-to-evolve-four-dissimilar-projects/README.md' },
          ] 
        },
        { text: '设计模式', 
          items: [
            { text: '适配器模式', items: [ { text: '统一接口', link: '/articles/design-patterns/adapter/uniform-interface/README.md' } ] },
          ] 
        },
        { text: 'workspace', link: '/package-manager/workspace.md' },
        { text: 'monorepo', link: '/package-manager/monorepo.md' },
      ],
    },
  ],
};
