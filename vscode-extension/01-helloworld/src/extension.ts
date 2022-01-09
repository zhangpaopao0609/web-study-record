// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from "path";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

async function printDefinitionsForActiveEditor() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return;
  }

  const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
    'vscode.executeDefinitionProvider',
    activeEditor.document.uri,
    activeEditor.selection.active
  );
	console.log(definitions);
  for (const definition of definitions) {
    console.log(definition);
  }
}


export function activate(context: vscode.ExtensionContext) {

	vscode.languages.registerHoverProvider(
    'javascript',
    new (class implements vscode.HoverProvider {
      provideHover(
        _document: vscode.TextDocument,
        _position: vscode.Position,
        _token: vscode.CancellationToken
      ): vscode.ProviderResult<vscode.Hover> {
        const commentCommandUri = vscode.Uri.parse(`command:editor.action.addCommentLine`);
        const contents = new vscode.MarkdownString(`[Add comment](${commentCommandUri})`);

        // To enable command URIs in Markdown content, you must set the `isTrusted` flag.
        // When creating trusted Markdown string, make sure to properly sanitize all the
        // input content so that only expected command URIs can be executed
        contents.isTrusted = true;

        return new vscode.Hover(contents);
      }
    })()
  );

  const commond = 'myExtension.sayHello';

	const commandHandler =  async (name: string = 'world') => {
		vscode.commands.executeCommand('myExtension.console');
		printDefinitionsForActiveEditor()
	}

	const say = vscode.commands.registerCommand(commond, commandHandler);

	vscode.commands.registerCommand('myExtension.console', () => {
		console.log('console--------');
	})

	context.subscriptions.push(say);
}

// this method is called when your extension is deactivated
export function deactivate() {}
