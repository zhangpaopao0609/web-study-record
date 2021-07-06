const fs = require('fs');
const path = require('path');
const babylon = require('babylon');   // parse js code to ast
const babelTraverse = require('babel-traverse').default;
const babelCore = require('babel-core');

let ID = 0;

function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = babylon.parse(content, {
    sourceType: 'module',
  });

  const dependencies = [];

  babelTraverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });

  const { code } = babelCore.transformFromAst(ast, null, {
    presets: ['env'],
  });

  return {
    id: ID++,
    filename,
    dependencies,
    code,
  };
};

function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const queue = [ mainAsset ];

  for (const asset of queue) {
    asset.mapping = {};
    const dirname = path.dirname(asset.filename);

    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname,relativePath);
      const child = createAsset(absolutePath);
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    })
  };

  return queue;
};

function bundle(graph) {
  let modules = '';

  graph.forEach(mod => {
    modules += `
      ${mod.id}: [
        function(require, module, exports) { ${mod.code} },
        ${JSON.stringify(mod.mapping)},
      ], 
    `
  });

  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];

        function localRequire(relativePath) {
          return require(mapping[relativePath]);
        };
        const module = { exports: {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      };
      require(0);
    })({${ modules }});
  `;
  return result;
};

function generateResultFile(filename, script) {
  const has = fs.existsSync(filename);
  if (has) {
    fs.rmSync(filename);
  };
  fs.writeFileSync(filename, script);
}

const graph = createGraph('./example/entry.js');
const result = bundle(graph);
generateResultFile('./index.js', result);

// console.log(graph);
console.log(result);

 


// we need know which model thi module depends on
// we can do string analyze
// javascript bunlder servicer   AST parse
// AST

