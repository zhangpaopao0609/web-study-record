import * as vscode from 'vscode';
import { TextDecoder, TextEncoder } from "util";

interface RawNotebookCell {
  language: string,
  value: string,
  kind: vscode.NotebookCellKind,
};

class SampleSerializer implements vscode.NotebookSerializer {
  async deserializeNotebook(
    content: Uint8Array, 
    token: vscode.CancellationToken
  ): Promise<vscode.NotebookData> {
    const contents = new TextDecoder().decode(content);
    let raw: RawNotebookCell[] = [];
    try {
      raw = <RawNotebookCell[]>JSON.parse(contents);
    } catch (error) {
      raw = [];
    };

    const cells = raw.map(item => 
      new vscode.NotebookCellData(item.kind, item.value, item.language)  
    );

    return new vscode.NotebookData(cells);
  }

  async serializeNotebook(
    data: vscode.NotebookData, 
    token: vscode.CancellationToken
  ): Promise<Uint8Array> {
    const contents:RawNotebookCell[] = [];
    for (const cell of data.cells) {
      contents.push({
        kind: cell.kind,
        language: cell.languageId,
        value: cell.value,
      });
    }

    return new TextEncoder().encode(JSON.stringify(contents));
  }
  
}

export function activate(context: vscode.ExtensionContext) {
  // Nothing (yet)
  context.subscriptions.push(
    vscode.workspace.registerNotebookSerializer('my-notebook', new SampleSerializer())
  )
}

export function deactivate() { }
