import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    semi: true,
    // https://eslint.style/rules
    overrides: {
      'style/brace-style': ['error', '1tbs'],
      // 'style/nonblock-statement-body-position': ['off', 'below'],
    },
  },

  formatters: {
    markdown: true,
  },

  vue: true,
  markdown: true,
  typescript: true,

  ignores: ['tsconfig.json', 'archives/*'],
  rules: {
    // https://eslint.org/docs/latest/rules/curly
    'curly': ['error', 'all'],
    'no-console': ['warn'],
  },
});
