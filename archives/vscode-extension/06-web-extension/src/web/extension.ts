import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "web-extension" is now active in the web extension host!');

	let disposable = vscode.commands.registerCommand('web-extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from web-extension in a web extension host!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
