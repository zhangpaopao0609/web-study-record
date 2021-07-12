const modules = {};

const res = require.context('./', true, /\.js/);
res.keys().forEach(module => {
  const m = module.replace(/(\.\/|\.js)/g, '');
  if(m !== 'index') {
    modules[m] = res(module);
  };
});

export { modules as default };
