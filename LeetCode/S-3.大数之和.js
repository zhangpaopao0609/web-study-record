// 请使用js实现一个简单的大数相加函数sum，要求实现正数相加及正负数相加。

// 测试用例:
// console.log(sum("9007199254740991", "1229007199254740993443")); 
// console.log(sum("9007199254740991", "-1229007199254740993443"));

function addStrings(str1, str2) {
  let i = str1.length-1;
  let j = str2.length-1;
  let res = '', add = 0;

  while(i >= 0 || j >= 0 || add) {
    let now1 = i < 0 ? 0 : str1.charAt(i) - '0';
    let now2 = j < 0 ? 0 : str2.charAt(j) - '0';
    let nowSum =  add + now1 + now2;
    res = nowSum % 10 + res;
    add = nowSum > 9 ? 1 : 0;
    i--;
    j--;
  };
  return res;
};

function minusStrings(str1, str2) {
  let i = str1.length-1;
  let j = str2.length-1;
  let res = '', minus = 0;

  while(i >= 0 || j >= 0) {              
    let now1 = i < 0 ? 0 : str1.charAt(i) - '0';
    let now2 = j < 0 ? 0 : str2.charAt(j) - '0';
    let nowMinus = now1 - now2 - minus;   
    // 如果 nowMinus 大于等于零，那么减得够
    if(nowMinus >= 0) {
      res = nowMinus + res;
      minus = 0;
    }else {
      res = (10 + nowMinus) + res;
      minus = 1;
    }
    i--;
    j--;
  };
  while(res[0] === '0') {
    res = res.slice(1);
  }
  return res;
}

function compare(str1, str2) {
  let l1 = str1.length;
  let l2 = str2.length;

  if(l1 > l2) {
    return true;
  }else if(l1 < l2) {
    return false;
  }else {
    let i = 0;
    while(i <= l1) {
      if(str1[i] > str2[i]) {
        return true;
      }else if(str1[i] < str2[i]) {
        return false;
      }else {
        i++;
      }
    };
    return true;
  }
}

function sum(str1, str2) {
  if(str1[0] !== '-' && str2[0] !== '-') {    // 说明全为正
    return addStrings(str1, str2);
  }
  if(str1[0] === '-' && str2[0] === '-') {    // 说明全为负
    return '-' + addStrings(str1.slice(1), str2.slice(1));
  }
  if(str1[0] === '-' && str2[0] !== '-') {    // 说明 str1 为负，str2 为正
    if(compare(str1.slice(1), str2)) {       // 说明 str1 绝对值大于 str2 绝对值 
      return '-' + minusStrings(str1.slice(1), str2);
    }else {
      return minusStrings(str2, str1.slice(1));
    }
  }
  if(str1[0] !== '-' && str2[0] === '-') {    // 说明 str1 为负，str2 为正
    if(compare(str1, str2.slice(1))) {       // 说明 str1 绝对值大于 str2 绝对值 
      return minusStrings(str1, str2.slice(1));
    }else {
      return '-' + minusStrings(str2.slice(1), str1);
    }
  }
}

console.log(sum("-90071", "-101111111111111111111111111111111111111111110"))