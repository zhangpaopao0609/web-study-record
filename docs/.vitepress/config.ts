import { defineConfig } from 'vitepress';

const logoPath = '/images/logo.png';

/**
 * @doc https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  title: 'Web Study Record',
  description: '用于我前端学习的记录, 记录的同时也做一个分享.',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: logoPath }]],

  /**
   * @doc https://vitepress.dev/reference/default-theme-config
   */
  themeConfig: {
    logo: logoPath,
    // 头部导航栏
    nav: [
      { text: '起源', link: '/' },
      { text: 'Lint', link: '/lint/' },
      {
        text: '搭建项目',
        link: '/project-config/',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Why Vite',
              link: '/guide/why',
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
      '/lint/': [
        {
          text: '为什么需要 Lint ？',
          link: '/lint/',
        },
        {
          text: 'ESLint',
          items: [
            {
              text: 'ESLint 简述',
              link: '/lint/eslint/',
            },
          ],
          collapsed: true,
        },
        {
          text: 'StyleLint',
          items: [
            {
              text: 'StyleLint 简述',
              link: '/lint/stylelint/',
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
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },

  lastUpdated: true,
});