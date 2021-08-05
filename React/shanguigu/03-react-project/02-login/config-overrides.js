const { override, fixBabelImports, addLessLoader, addPostcssPlugins } = require('customize-cra');
const postcssPx2Rem = require('postcss-px2rem');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { 
        '@brand-primary': '#e1251b',
        '@brand-primary-tap': '#ac2821',
      },
    }
  }),
  addPostcssPlugins([
    postcssPx2Rem({
      remUnit: 375/10
    }),
  ])
);
