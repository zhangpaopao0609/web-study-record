import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "01-vstodo" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand('01-vstodo.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World from 01-vstodo!');
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('01-vstodo.askQuestion', async () => {
      const answear = await vscode.window.showInformationMessage(
        'How was your day?',
        'good',
        'bad',
      );
      if (answear === 'bad') {
        vscode.window.showInformationMessage('Sorry to hear that!!');
      } else {
        console.log({ answear });
      }
    }),
  );
}

// this method is called when your extension is deactivated
export function deactivate() { }
