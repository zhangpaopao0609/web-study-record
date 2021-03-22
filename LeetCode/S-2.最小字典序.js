// 字符串 S ，字符串T，S从头或者为添加为 T 的尾部，使得 T 的字典序最小

function miniDictionaryOrder(s) {
  // 如果 s 前后不同，直接取较小的那一个
  // 如果 s 前后相同，那么应该递归地比较内层大小，取内层较小，注意这里需要递归的比较
  let t = "";
  let l = 0, r = s.length-1;
  while(l <= r) {
    if(s[l] > s[r]) {
      t += s[r];
      r--;
    }else if(s[l] < s[r]) {
      t += s[l];
      l++;
    }else {
      // 相同时递归这比较内层， 直到找到较小者或越界了
      let i = 1, flag = true;      // 寻找的层数
      while(l+i < r-i) {
        console.log(l, r);
        if(s[l+i] > s[r-i]) {
          t += s[r];
          r--;
          flag = false;
          break;
        }else if(s[l+i] < s[r-i]) {
          t += s[l];
          l++;
          flag = false;
          break;
        }else {
          i++;
        }
      };
      if(flag) {    // 如果全部都相同，则就随意取一个
        t += s[r];
        r--;
      }
    }
  };
  return t;
};

const str = "ASDEFQEDSA";
console.log(miniDictionaryOrder(str));