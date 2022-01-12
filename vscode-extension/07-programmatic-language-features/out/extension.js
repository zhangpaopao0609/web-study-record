"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
let diagnosticCollection;
function activate(context) {
    vscode.languages.registerHoverProvider('javascript', {
        provideHover(document, position, token) {
            return {
                contents: ['Hover Content!!']
            };
        }
    });
    vscode.workspace.onDidChangeTextDocument(event => {
        const uri = event.document.uri;
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map