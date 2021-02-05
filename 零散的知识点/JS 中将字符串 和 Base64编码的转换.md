[toc]

# JS 中将字符串 和 Base64编码的转换

## 1. 利用 buffer 机制转换

```js
const str = "张跑跑";
const str_to_base64 = Buffer.from(str).toString("base64");
console.log(str_to_base64);

const base64_to_str = Buffer.from(str_to_base64, "base64").toString()
console.log(base64_to_str);

// 5byg6LeR6LeR
// 张跑跑
```

