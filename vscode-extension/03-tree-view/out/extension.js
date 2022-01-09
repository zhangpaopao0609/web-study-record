"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const treeData_1 = require("./treeData");
function activate(context) {
    const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
        ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
    const nodeDependenciesProvider = new treeData_1.NodeDependenciesProvider(rootPath);
    vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
    vscode.commands.registerCommand('nodeDependencies.refreshEntry', () => {
        nodeDependenciesProvider.refresh();
    });
    vscode.commands.registerCommand('nodeDependencies.addEntry', () => {
        console.log('add');
    });
    vscode.commands.registerCommand('nodeDependencies.editEntry', () => {
        console.log('editEntry');
    });
    vscode.commands.registerCommand('nodeDependencies.deleteEntry', () => {
        console.log('deleteEntry');
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map