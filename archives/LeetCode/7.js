// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

// 示例 1:

// 输入: 123
// 输出: 321
//示例 2:

// 输入: -123
// 输出: -321
// 示例 3:

//输入: 120
// 输出: 21
// 注意:

// 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

/**
 * @param {number} x
 * @return {number}
 */
const reverse = function(x) {
  let sign,x_reverse;
  if(x === 0) return 0;
  if( x > 0 ) {
    sign = true
    x_reverse = x;
  }else{
    sign = false
    x_reverse = -x;
  };
  let x_array = x_reverse.toString().split("");
  x_array = x_array.reverse();
  while(x_array[0] === "0") {
    x_array = x_array.slice(1)
  }
  x_reverse = parseInt(x_array.join(""));
  if(x_reverse > Math.pow(2,31) - 1) return 0;
  x_reverse = sign ? x_reverse : -x_reverse
  return x_reverse;
};

// 解法二
const reverse_1 = function(x) {
  // num -> string
  let str = x.toString();
  // string -> array
  let arr = str.split("");
  // 判断是否有符号
  if( arr[0] !== "-" ) {
    let num = Number(arr.reverse().join(""));
    if(num <= 2147483647 && num >= -2147483648){
      return num;
    }else{
        return 0
    }
  }else{
    delete arr[0];
    let num = Number(arr.reverse().join(""));
    if(num <= 2147483647 && num >= -2147483648){
      return ~num + 1;
    }else{
      return 0
    }
  };
};

// 解法三 极简数学解法，运用JavaScript位运算
/**
 * @param {number} x
 * @return {number}
 */
const reverse_3 = function(x) {
  let result = 0;
  while(x !== 0) {
      result = result * 10 + x % 10;
      console.log(result)
      x = (x / 10) | 0;
      console.log(x)
  }
  return (result | 0) === result ? result : 0;
};

// 解法四 真正的大神
/**
 * @param {number} x
 * @return {number}
 */
const reverse_4 = function(x) {
  let ord = Math.abs(x);//去符号
  let now = 0;
  while(ord > 0){
      now = now * 10 + ord % 10;
      ord = Math.floor(ord / 10);
  }
  if(x < 0){
      return now <= Math.pow(2,31) ? -now : 0;
  }else{
      return now < Math.pow(2,31) ? now : 0;
  }
};


/**
 * @param {number} x
 * @return {number}
 */
const reverse_5 = function(x) {
  let now = Math.abs(x).toString().split("").reverse().join("");
  if(x < 0){
      return now <= Math.pow(2,31) ? -now : 0;
  }else{
      return now < Math.pow(2,31) ? now : 0;
  }
};


console.log(reverse_3(-2147483648))

