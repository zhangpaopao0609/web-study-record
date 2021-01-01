/*
 * @lc app=leetcode.cn id=463 lang=javascript
 *
 * [463] 岛屿的周长
 * 
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
// 总的减去重合的2倍即可
const islandPerimeter = grid => {
  let sum = 0;
  let cover = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if(grid[i][j]) {
        sum++;
        if(grid[i][j+1]) {
          cover++;
        }
        if(grid[i+1] && grid[i+1][j]) {
          cover++;
        }
      }
    }
  };
  return 4*sum - 2*cover;
};
// @lc code=end

// 总的减去重合的2倍即可
// 我这是投机倒把，看看人家的DFS
const islandPerimeter = grid => {
  let sum = 0;
  let cover = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if(grid[i][j]) {
        sum++;
        if(grid[i][j+1]) {
          cover++;
        }
        if(grid[i+1] && grid[i+1][j]) {
          cover++;
        }
      }
    }
  };
  return 4*sum - 2*cover;
};

