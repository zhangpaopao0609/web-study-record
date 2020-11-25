function compress(queryString) {
  const keys = {};
  queryString.replace(/([^=&]+)=([^&]*)/g, (match, $1, $2) => {
    keys[$1] = keys[$1] ? `${keys[$1]},${$2}` : $2;
  });
  const result = [];
  for (const key in keys) {
    result.push(`${key}=${keys[key]}`);
  };
  return result.join('&');
};

console.log(compress("a=1&b=2&a=3&c=4"));
