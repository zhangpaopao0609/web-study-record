import * as vscode from 'vscode';

import { NodeDependenciesProvider } from "./treeData";




export function activate(context: vscode.ExtensionContext) {
	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
	const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath)
	vscode.window.registerTreeDataProvider(
		'nodeDependencies',
		nodeDependenciesProvider,
	)

	vscode.commands.registerCommand('nodeDependencies.refreshEntry', () => {
		nodeDependenciesProvider.refresh();
	})
	vscode.commands.registerCommand('nodeDependencies.addEntry', () => {
		console.log('add');
	})
	vscode.commands.registerCommand('nodeDependencies.editEntry', () => {
		console.log('editEntry');
	})
	vscode.commands.registerCommand('nodeDependencies.deleteEntry', () => {
		console.log('deleteEntry');
	})
}

export function deactivate() {}
