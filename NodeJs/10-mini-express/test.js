const G = {};

let app = (path) => {
  if(G[path]) {
    G[path]();
  }
};

app.get = (path, cb) => {
  G[path] = cb;
};

app.post = () => {
  console.log('post');
};

app.get('/aa', () => {
  console.log('aa');
});

app('/aa')