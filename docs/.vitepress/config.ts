import { defineConfig } from 'vitepress';
import { nav, sidebar } from './menu';

const logoPath = '/images/logo.png';

/**
 * @doc https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  title: 'Web Study Record',
  description: '用于我前端学习的记录, 记录的同时也做一个分享.',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.ico' }],
  ],

  /**
   * @doc https://vitepress.dev/reference/default-theme-config
   */
  themeConfig: {
    logo: logoPath,
    // 头部导航栏
    nav,
    // 侧边导航栏
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangpaopao0609' },
    ],
    outline: 'deep'
  },
  lastUpdated: true,
});
