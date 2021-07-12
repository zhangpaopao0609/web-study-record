// const context = require.context('./', false, /[^index]\.js$/);

const importAll = context => {
  const map = {}

  for (const key of context.keys()) {
    const keyArr = key.split('/')
    keyArr.shift() // 移除.
    map[keyArr.join('.').replace(/\.js$/g, '')] = context(key)
  }

  return map
};

const res = importAll(require.context('./', true, /\.js$/));

export default res;