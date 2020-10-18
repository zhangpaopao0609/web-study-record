const path = require('path');
const fs = require('fs');

module.exports = class AutoGenetareSpecFile {
	genJestSource(sourcePath = path.resolve('./')){
		const testPath = `${sourcePath}/__test__`;
		if(!fs.existsSync(testPath)) {
			fs.mkdirSync(testPath);
		}

		// 遍历代码文件
		let list = fs.readdirSync(sourcePath);
		list
			// 添加完成路径
			.map(v => `${sourcePath}/${v}`)
			// 过滤文件
			.filter(v => fs.statSync(v).isFile())
			// 排除测试代码
			.filter(v => v.indexOf('.spec') === -1)
			.map(v => this.getTestFile(v))
	}

	getTestFile(filename) {
		console.log('filename', filename);
		const testFileName = this.getTestFileName(filename);
		// 判断此文件是否存在
		if(fs.existsSync(testFileName)) {
			console.log('test files has existed', testFileName);
			return;
		}
		const mod = require(filename);
		let source;
		if(typeof mod === 'object') {
			source = Object.keys(mod)
				.map(v => this.getTestSource(v, path.basename(filename), true))
				.join('\n');
		}else if(typeof mod === 'function') {
			const baseName = path.basename(filename)
			source = this.getTestSource(baseName.replace('.js', ''), baseName, false)
		}; 
		fs.writeFileSync(testFileName, source);
	}

	getTestSource(methodName, classFile, isClass = false) {
		return `
			test('TEST ${methodName}', () => {
			const ${isClass ? '{' + methodName + '}' : methodName} = require('../${classFile}');
			const ret = ${methodName}();
			//	expect(ret)
			//		.toBe('test return')
			})
			`
	} 

	/**
	 * 生成测试文件名
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