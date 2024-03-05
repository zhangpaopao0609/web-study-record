const url = require('url');

const initRoute = {
  G : {
    _get: {},
    _post: {}
  },

  get(path, cb)  {
    this.G._get[path] = cb;
  },

  post(path, cb){
    this.G._post[path] = cb;
  },

  init(req, res) {
    const method = req.method.toLowerCase();
    let { pathname } = url.parse(req.url);
    pathname = pathname === '/' ? '/index.html' : pathname;

    if(this.G['_'+method][pathname]) {
      if(method === 'post') {
        let _res = "";
        req.on('data', chunk => {
          _res += chunk;
        });
        req.on('end', () => {
          req.body = _res;
          this.G['_'+method][pathname](req, res);
        });
      }else {
        this.G['_'+method][pathname](req, res);
      }
    }else {
      res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
      res.end("页面不存在！");
    };
  }
};

module.exports = initRoute;