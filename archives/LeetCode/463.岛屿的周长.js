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
const dfs = (grid, r, c) => {
  // 如果是往边界走周长加1
  if(!(r >= 0 && r < grid.length && c>=0 && c < grid[0].length)) {
    return 1;
  };
  // 如果是往水域走周长加1
  if(grid[r][c] === 0) {
    return 1;
  };
  // 如果是已经标记过的直接退出
  if(grid[r][c] === 2) {
    return 0;
  };

  grid[r][c] = 2;
  return dfs(grid, r-1, c)
    + dfs(grid, r+1, c)
    + dfs(grid, r, c-1)
    + dfs(grid, r, c+1);
}

const islandPerimeter = grid => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if(grid[r][c] === 1) {
        return dfs(grid, r, c);
      }
    }
  };
  return 0;
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

