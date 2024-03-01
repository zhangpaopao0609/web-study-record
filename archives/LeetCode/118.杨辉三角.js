/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 * 
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = numRows => {
  const ret = [];
  for (let i = 0; i < numRows; i++) {
    const row = Array(i+1).fill(1);
    // 这里挺巧妙的，用j直接略过了i为0和1
    for (let j = 1; j < i; j++) {
      row[j] = ret[i-1][j-1] + ret[i-1][j];
    };
    ret.push(row);
  };
  return ret;
};
// @lc code=end

const generate_1 = numRows => {
  if(!numRows) return [];
  if(numRows === 1) return [[1]];
  if(numRows === 2) return [[1], [1, 1]];
  let q = [[1], [1, 1]];
  for (let i = 2; i < numRows; i++) {
    const temp = [1];
    for (let j = 1; j < i; j++) {
      temp.push(q[i-1][j-1] + q[i-1][j]);
    };
    temp.push(1);
    q.push(temp);
  }
  return q;
};
