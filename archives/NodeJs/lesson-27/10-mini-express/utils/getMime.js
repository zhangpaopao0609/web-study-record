/**
 * mime 数据，这里暂时就罗列这些
 */
const data = {
  txt: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  jpeg: 'image/jpg',
  jpeg: 'image/jpeg'
}

const getMime = extname => {
  if(data[extname]) {
    return data[extname];
  }else {
    return 'text/plain';
  }
};

module.exports = getMime;