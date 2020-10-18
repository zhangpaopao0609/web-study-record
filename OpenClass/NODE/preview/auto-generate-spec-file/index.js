const path = require('path');
const { dirname } = require('path');
module.exports = class AutoGenetareSpecFile {
	/**
	 * 生成方法名
	 * @param {*} filename 代码文件名
	 */
	getTestFileName(filename) {
		const dirName = path.dirname(filename);
		const baseName = path.basename(filename);
		const extName = path.extname(filename);
		const testName = baseName.replace(extName, `.spec${extName}`);
		return path.format({
			root: path.join(dirName, '/__test__/'),
			base: testName
		});
	}
}