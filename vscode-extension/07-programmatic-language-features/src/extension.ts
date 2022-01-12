import * as vscode from 'vscode';

let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
	vscode.languages.registerHoverProvider('javascript', {
		provideHover(document, position, token) {
			return {
				contents: ['Hover Content!!']
			}
		}
	});

	vscode.workspace.onDidChangeTextDocument(event => {
		const uri = event.document.uri;
		
	});

}

export function deactivate() {}
