# 题目二 不修改数组找出重复的数字
在一个长度为 n+1 的数组里所有数字都在1~n的范围内，所有数字中至少有一个数字是重复的。请找出数组中任意一个重复的数字，但不能修改输入的数组。
## 解法一
这一题看起来和上面的提类似，但是由于题目要求不能修改输入的数组，我们可以创建一个长度为 n+1的辅助数组，然后逐一把原数组的每个数字复制到辅助数组。如果原数组中被复制的数字是m，则把它复制到辅助数组中下标为m的位置，这样就很容易就能发现那个数字是重复的，由于需要创建一个数组，该方案需要O（n）的辅助空间
```js
const findCoverNum = function(arr) {
    let newArr = Array.from(arr.length);
    for (let i = 0; i < arr.length; i++) {
        if(newArr[arr[i]]) {
            return arr[i];
        } else {
            newArr[arr[i]] = arr[i];
        }
    }
    return null;
}
```
## 解法二
避免使用 O(n) 的辅助空间。为什么数组中会有重复的数字，假如没有重复的数字，那么在从1 ~ n的范围里只有n个数字，由于数组里面包含超过n个数字，所以一定包含了重复的数字。
我们把从1 ~ n的数字从中间的数字m分为两部分，前面一半为1~m，后面一半为m+1 ~ n，如果1 ~ m的数目超过m，那么这一班的区间里面一定包含重复的数字；否则，另一半m+1~n的区间里面一定包含重复的数字。我们可以继续把包含重复数字的区间一分为二，知道找到一个重复的数字。这个过程和二分查找法很类似，只是多了一步统计区间里面数字的数目
```js
const findCoverNum = function(arr) {
    if (arr.length <= 0) {
        return null;
    }
    let start = 1;
    const len = arr.length;
    let end = len -1;
    while(end >= start) {
        let middle = ((end -start) >> 1) + start;
        let count = findNumberCount(arr, len, start, middle);
        if(end == start) {
            if( count > 1 ) {
                return start;
            } else {
                break;
            }
        }
        if(count > (middle - start + 1)) {
            end = middle;
        } else {
            start = middle + 1;
        }
    }
    return null;
}

const findNumberCount = function(arr, len, start, end) {
    if(arr.length === 0) return 0;
    let count = 0;
    for (let i = 0; i < len; i++) {
        if(arr[i] >= start && arr[i] <= end) {
            ++count;
        }
    }
    return count;
}
```
上述代码按照二分查找的思路，如果输入长度为n的数组，那么函数findNumberCount将被调用O(logn),每次需要O(n)的时间，因此总的时间复杂度为O(nlogn),空间复杂度为O(1)
和解法1相比，这相当于以时间换空间