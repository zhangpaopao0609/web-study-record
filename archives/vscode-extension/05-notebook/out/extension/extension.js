import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("util");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************************!*\
  !*** ./src/extension/extension.ts ***!
  \************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(/*! vscode */ "vscode");
const util_1 = __webpack_require__(/*! util */ "util");
;
class SampleSerializer {
    async deserializeNotebook(content, token) {
        const contents = new util_1.TextDecoder().decode(content);
        let raw = [];
        try {
            raw = JSON.parse(contents);
        }
        catch (error) {
            raw = [];
        }
        ;
        const cells = raw.map(item => new vscode.NotebookCellData(item.kind, item.value, item.language));
        return new vscode.NotebookData(cells);
    }
    async serializeNotebook(data, token) {
        const contents = [];
        for (const cell of data.cells) {
            contents.push({
                kind: cell.kind,
                language: cell.languageId,
                value: cell.value,
            });
        }
        return new util_1.TextEncoder().encode(JSON.stringify(contents));
    }
}
function activate(context) {
    // Nothing (yet)
    context.subscriptions.push(vscode.workspace.registerNotebookSerializer('my-notebook', new SampleSerializer()));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztTQ0FBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0QkEsMkRBQWlDO0FBQ2pDLHVEQUFnRDtBQU0vQyxDQUFDO0FBRUYsTUFBTSxnQkFBZ0I7SUFDcEIsS0FBSyxDQUFDLG1CQUFtQixDQUN2QixPQUFtQixFQUNuQixLQUErQjtRQUUvQixNQUFNLFFBQVEsR0FBRyxJQUFJLGtCQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkQsSUFBSSxHQUFHLEdBQXNCLEVBQUUsQ0FBQztRQUNoQyxJQUFJO1lBQ0YsR0FBRyxHQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9DO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ1Y7UUFBQSxDQUFDO1FBRUYsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUMzQixJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNsRSxDQUFDO1FBRUYsT0FBTyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELEtBQUssQ0FBQyxpQkFBaUIsQ0FDckIsSUFBeUIsRUFDekIsS0FBK0I7UUFFL0IsTUFBTSxRQUFRLEdBQXFCLEVBQUUsQ0FBQztRQUN0QyxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDbEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksa0JBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztDQUVGO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLE9BQWdDO0lBQ3ZELGdCQUFnQjtJQUNoQixPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQ25GO0FBQ0gsQ0FBQztBQUxELDRCQUtDO0FBRUQsU0FBZ0IsVUFBVSxLQUFLLENBQUM7QUFBaEMsZ0NBQWdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbm90ZWJvb2svZXh0ZXJuYWwgY29tbW9uanMgXCJ2c2NvZGVcIiIsIndlYnBhY2s6Ly9ub3RlYm9vay9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidXRpbFwiIiwid2VicGFjazovL25vdGVib29rL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25vdGVib29rLy4vc3JjL2V4dGVuc2lvbi9leHRlbnNpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidnNjb2RlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX2NyZWF0ZVJlcXVpcmUoaW1wb3J0Lm1ldGEudXJsKShcInV0aWxcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCAqIGFzIHZzY29kZSBmcm9tICd2c2NvZGUnO1xuaW1wb3J0IHsgVGV4dERlY29kZXIsIFRleHRFbmNvZGVyIH0gZnJvbSBcInV0aWxcIjtcblxuaW50ZXJmYWNlIFJhd05vdGVib29rQ2VsbCB7XG4gIGxhbmd1YWdlOiBzdHJpbmcsXG4gIHZhbHVlOiBzdHJpbmcsXG4gIGtpbmQ6IHZzY29kZS5Ob3RlYm9va0NlbGxLaW5kLFxufTtcblxuY2xhc3MgU2FtcGxlU2VyaWFsaXplciBpbXBsZW1lbnRzIHZzY29kZS5Ob3RlYm9va1NlcmlhbGl6ZXIge1xuICBhc3luYyBkZXNlcmlhbGl6ZU5vdGVib29rKFxuICAgIGNvbnRlbnQ6IFVpbnQ4QXJyYXksIFxuICAgIHRva2VuOiB2c2NvZGUuQ2FuY2VsbGF0aW9uVG9rZW5cbiAgKTogUHJvbWlzZTx2c2NvZGUuTm90ZWJvb2tEYXRhPiB7XG4gICAgY29uc3QgY29udGVudHMgPSBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUoY29udGVudCk7XG4gICAgbGV0IHJhdzogUmF3Tm90ZWJvb2tDZWxsW10gPSBbXTtcbiAgICB0cnkge1xuICAgICAgcmF3ID0gPFJhd05vdGVib29rQ2VsbFtdPkpTT04ucGFyc2UoY29udGVudHMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByYXcgPSBbXTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2VsbHMgPSByYXcubWFwKGl0ZW0gPT4gXG4gICAgICBuZXcgdnNjb2RlLk5vdGVib29rQ2VsbERhdGEoaXRlbS5raW5kLCBpdGVtLnZhbHVlLCBpdGVtLmxhbmd1YWdlKSAgXG4gICAgKTtcblxuICAgIHJldHVybiBuZXcgdnNjb2RlLk5vdGVib29rRGF0YShjZWxscyk7XG4gIH1cblxuICBhc3luYyBzZXJpYWxpemVOb3RlYm9vayhcbiAgICBkYXRhOiB2c2NvZGUuTm90ZWJvb2tEYXRhLCBcbiAgICB0b2tlbjogdnNjb2RlLkNhbmNlbGxhdGlvblRva2VuXG4gICk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgIGNvbnN0IGNvbnRlbnRzOlJhd05vdGVib29rQ2VsbFtdID0gW107XG4gICAgZm9yIChjb25zdCBjZWxsIG9mIGRhdGEuY2VsbHMpIHtcbiAgICAgIGNvbnRlbnRzLnB1c2goe1xuICAgICAgICBraW5kOiBjZWxsLmtpbmQsXG4gICAgICAgIGxhbmd1YWdlOiBjZWxsLmxhbmd1YWdlSWQsXG4gICAgICAgIHZhbHVlOiBjZWxsLnZhbHVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShKU09OLnN0cmluZ2lmeShjb250ZW50cykpO1xuICB9XG4gIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoY29udGV4dDogdnNjb2RlLkV4dGVuc2lvbkNvbnRleHQpIHtcbiAgLy8gTm90aGluZyAoeWV0KVxuICBjb250ZXh0LnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICB2c2NvZGUud29ya3NwYWNlLnJlZ2lzdGVyTm90ZWJvb2tTZXJpYWxpemVyKCdteS1ub3RlYm9vaycsIG5ldyBTYW1wbGVTZXJpYWxpemVyKCkpXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7IH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==