const resSend = (res, data, mime='text/plain') => {
  res.writeHead(200, {"Content-Type": `${mime}; charset=UTF-8`});
  res.end(data);
};

module.exports = resSend;