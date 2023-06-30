import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  { text: '起源', link: '/fate/' },
  {
    text: '搭建项目',
    items: [
      { text: 'Git', link: '/project/git/' },
      { text: 'npm/yarn/pnpm', link: '/project/package-manager/' },
    ],
  },
  { text: 'Linter', link: '/linter/' },
];

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fate/': [
    {
      text: '缘起',
      items: [
        {
          text: '一切的起点',
          link: '/fate/',
        },
        {
          text: '查看目录',
          link: '/fate/catalog',
        },
      ],
    },
  ],
  '/project/': [
    {
      text: 'git',
      collapsed: true,
      link: '/project/git/',
      items: [
        {
          text: 'git 基础',
          collapsed: true,
          items: [
            {
              text: '1-起步',
              link: '/project/git/pro-git/1-起步.md',
            },
          ],
        },
        {
          text: 'git 其它',
          collapsed: true,
          items: [
            {
              text: 'git 基础',
              link: '/project/git/other/index.md',
            },
          ],
        },
      ],
    },
    {
      text: 'APIs',
      items: [
        {
          text: 'Plugin API',
          link: '/guide/api-plugin',
        },
      ],
    },
  ],
  '/linter/': [
    {
      text: 'Linter',
      link: '/linter/',
    },
    {
      text: 'ESLint',
      items: [
        {
          text: 'ESLint 简述',
          link: '/linter/eslint/',
        },
      ],
      collapsed: true,
    },
    {
      text: 'StyleLint',
      items: [
        {
          text: 'StyleLint 简述',
          link: '/linter/stylelint/',
        },
      ],
      collapsed: true,
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
};
