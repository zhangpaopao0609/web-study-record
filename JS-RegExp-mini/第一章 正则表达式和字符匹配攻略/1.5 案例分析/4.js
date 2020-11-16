// window 操作系统文件路径
// F:\study\javascript\regex\regular expression.pdf
// F:\study\javascript\regex
// F:\study\javascript
// F:\

const regex = /^[a-zA-Z]:\\([^\\:*<>|"?'\r\n/]+\\)*([^\\:*<>|"?'\r\n/]+)?$/;
const string = "F:\\study\\javascript\\regex\\regular expression.pdf"

console.log(regex.test(string));