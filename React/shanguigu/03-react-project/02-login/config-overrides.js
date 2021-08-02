const { override, fixBabelImports, addLessLoader, addPostcssPlugins } = require('customize-cra');
const postcssPx2Rem = require('postcss-px2rem');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    }
  }),
  addPostcssPlugins([
    postcssPx2Rem({
      remUnit: 375/10
    }),
  ])
);