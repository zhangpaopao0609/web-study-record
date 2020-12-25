/*
 * @lc app=leetcode.cn id=278 lang=javascript
 *
 * [278] 第一个错误的版本
 *
 */

// @lc code=start
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
// 二分
// 还是颗粒化的，能干哟
const solution = function (isBadVersion) {
	/**
	 * @param {integer} n Total versions
	 * @return {integer} The first bad version
	 */
	return function (n) {
		let start = 1;
		let end = n;
		while(start < end) {
			const mid = start + ((end - start) >> 1);
			if(isBadVersion(mid)) {
				end = mid;
			}else {
				start = mid + 1;
			}
		}
		return start;
	};
};
// @lc code=end

