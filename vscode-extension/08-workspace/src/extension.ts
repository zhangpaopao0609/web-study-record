import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "08-workspace" is now active!');

	let disposable = vscode.commands.registerCommand('08-workspace.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from 08-workspace!');
	});

	context.subscriptions.push(disposable);

	// console.log(1, vscode.workspace.fs);
	// console.log(2, vscode.workspace.isTrusted);
	// console.log(3, vscode.workspace.name);
	// console.log(4, vscode.workspace.notebookDocuments);
	// console.log(5, vscode.workspace.rootPath);
	// console.log(6, vscode.workspace.workspaceFolders);
	// console.log(7, vscode.workspace.textDocuments.forEach(item => {
	// 	console.log(item.fileName);
	// }));
	// console.log(8, vscode.workspace.workspaceFile);

	// vscode.workspace.onDidCreateFiles((e) => {
	// 	console.log(e);
	// })
	vscode.workspace.onDidSaveTextDocument((e) => {
		console.log(e);
	})

	vscode.workspace.findFiles('**/**/**.ts').then((res) => {
		console.log(res);
	})

	console.log(vscode.Uri.file('./package.json'));
	
}

export function deactivate() {}
