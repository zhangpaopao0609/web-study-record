// id 匹配
// 从 <div id="container" class="main"></div>
// 提取出 id="container"

// const regex = /id=".*"/;

// const string ="<div id=\"container\" class=\"main\"></div>"

// console.log(string.match(regex));

// 可行，但是效率较低，涉及到回溯
// const regex = /id=".*?"/;

// const string ="<div id=\"container\" class=\"main\"></div>"

// console.log(string.match(regex));


const regex = /id="[^"]*"/;

const string ="<div id=\"container\" class=\"main\"></div>"

console.log(string.match(regex));
