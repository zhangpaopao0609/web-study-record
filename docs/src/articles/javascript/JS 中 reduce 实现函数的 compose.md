# JS 中 reduce 实现函数的 compose

## 1. 前言

如有以下三个函数，希望能执行 `f3(f2(f1(n)))`  也就是 f2 的入参是 f1 返回的结果， f3 的入参是 f2 返回的结果，直接写当然是可以的，如果我的函数有很多个呢？10个这样的函数，是不是得写成  f10(f9(.......f2(f1(n))))呢？那有没有什么办法可以解决呢？

```js
const f1 = (n) => {
  console.log(1);
  return n + 1;
}
const f2 = (n) => {
  console.log(2);
  return n + 2;
}
const f3 = (n) => {
  console.log(3);
  return n + 3;
}
```

解决办法就是利用 js 的 reduce 实现函数的扁平化，下面来看看如何实现的吧！

## 2. reduce 实现函数 compose

JS 中 reduce 是一个很神奇的 方法,

- reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

- reduce() 可以作为一个高阶函数，用于函数的 compose。

语法：

```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

| 参数                                      | 描述                               |
| :---------------------------------------- | :--------------------------------- |
| *function(total,currentValue, index,arr)* | 必需。用于执行每个数组元素的函数。 |

| 函数参数       | 描述                                           |
| :------------- | :--------------------------------------------- |
| *total*        | 必需。*初始值*, 或者上一次计算结束后的返回值。 |
| *currentValue* | 必需。当前元素                                 |
| *currentIndex* | 可选。当前元素的索引                           |
| *arr*          | 可选。当前元素所属的数组对象。                 |

这里特别注意 total， total 是上一次计算结束后的返回值，是不是刚好符合我们的目的，上一次计算的结果，也就是 f1(n)的结果，然后返回，用于 currentValue 作为入参；那么代码呼之欲出。

```js
function compose(fnList){
	return (...args) => {
		let len = fnList.length;
		if(len===0){
			return args;
		}
		if(len === 1){
			return fnList[0](...args);
    }
    // 如果想要反向，也就是实现 f1(f2(f3(n))),在这里将 fnList 逆序即可，
		return fnList.reduce((x,y)=>{
      // 最初 x 也就是 f1, y 是 f2
      // 然后 x 就是上一次的返回结果了， y 就是 f3
			return typeof x === 'function' ? y(x(...args)) : y(x);
		})
	}
}

const f1 = (n) => {
  console.log(1);
  return n + 1;
}
const f2 = (n) => {
  console.log(2);
  return n + 2;
}
const f3 = (n) => {
  console.log(3);
  return n + 3;
}

const fnList = [f1, f2, f3]
const res1 = f3(f2(f1(4)));
const res2 = compose(fnList)(4);
console.log(res1, res2);

// f1(f2(f3(4))) 
// 1   
// 2   
// 3   
// 10  10 
```

