import * as vscode from 'vscode';
import * as path from "path";

const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
  'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};

function getWebviewContent(title: keyof typeof cats): string {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${title}</title>
		</head>
		<body>
				<img src="${cats[title]}" width="300" />
		</body>
		</html>
	`
}

export function activate(context: vscode.ExtensionContext) {
	let currentPanel: vscode.WebviewPanel | undefined  = undefined;

	let disposable = vscode.commands.registerCommand('catCoding.start', () => {
		vscode.window.showInformationMessage('Hello webviews start!');
		const columnToShowIn = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;
		if (currentPanel) {
			currentPanel.reveal(columnToShowIn);
		} else {
			currentPanel = vscode.window.createWebviewPanel(
				'catCoding',
				'Cat Coding',
				vscode.ViewColumn.One,
				{},
			);
			let iteration = 0;
			const updateWebview = () => {
				const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
				currentPanel!.title = cat;
				currentPanel!.webview.html = getWebviewContent(cat);
			};
			updateWebview();
	
			const timer = setInterval(updateWebview, 1000);
			const timeout = setTimeout(() => currentPanel!.dispose(), 50000);
		
			currentPanel.onDidDispose(
				() => {
					clearInterval(timer);
					clearTimeout(timeout);
					currentPanel = undefined;
				},
				null,
				context.subscriptions,	
			);
		}
	});

	let catCodingStart2 = vscode.commands.registerCommand('catCoding.start2', () => {
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{}
		);
		panel.webview.html = getWebviewContent('Coding Cat');

		function updateWebviewForCat(panel: vscode.WebviewPanel, catName: keyof typeof cats) {
			panel.title = catName;
			panel.webview.html = getWebviewContent(catName);
		}

		panel.onDidChangeViewState(
			e => {
				const nowPanel = e.webviewPanel;
				switch (nowPanel.viewColumn) {
					case vscode.ViewColumn.One:
						return updateWebviewForCat(panel, 'Coding Cat');
					case vscode.ViewColumn.Two:
						return updateWebviewForCat(panel, 'Compiling Cat');
					case vscode.ViewColumn.Three:
						return updateWebviewForCat(panel, 'Testing Cat');
				}
			},
			null,
			context.subscriptions,
		); 
	});

	let catCodingStart3 = vscode.commands.registerCommand('catCoding.start3', () => {
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))],
				enableScripts: true,
			}
		);
		
		const onDsikPath = vscode.Uri.file(
			path.join(context.extensionPath, 'media', 'cat.gif')
		);

		const catGifSrc = panel.webview.asWebviewUri(onDsikPath);
		console.log(catGifSrc);
		panel.webview.html = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Cat Coding</title>
		</head>
		<body>
				<img src="${catGifSrc}" width="300" />
				<h1 id="lines-of-code-counter">0</h1>
		
				<script>
						const counter = document.getElementById('lines-of-code-counter');
		
						let count = 0;
						setInterval(() => {
								counter.textContent = count++;
						}, 100);
				</script>
		</body>
		</html>
		`
	});

	let catCodingStart4 = vscode.commands.registerCommand('catCoding.start4', () => {
		if (currentPanel) {
			currentPanel.reveal(vscode.ViewColumn.One);
		} else {
			currentPanel = vscode.window.createWebviewPanel(
				'catCoding',
				'Cat Coding',
				vscode.ViewColumn.One,
				{
					enableScripts: true
				}
			);
			currentPanel.webview.html = `<!DOCTYPE html>
			<html lang="en">
			<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Cat Coding</title>
			</head>
			<body>
					<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
					<h1 id="lines-of-code-counter">0</h1>
			
					<script>
							const counter = document.getElementById('lines-of-code-counter');
			
							let count = 0;
							setInterval(() => {
									counter.textContent = count++;
							}, 100);
			
							// Handle the message inside the webview
							window.addEventListener('message', event => {
			
									const message = event.data; // The JSON data our extension sent
			
									switch (message.command) {
											case 'refactor':
													count = Math.ceil(count * 0.5);
													counter.textContent = count;
													break;
									}
							});
					</script>
			</body>
			</html>`;
			currentPanel.onDidDispose(
				() => {
					currentPanel = undefined;
				},
				undefined,
				context.subscriptions
			);
		}
	});

	const doRefactor = vscode.commands.registerCommand('catCoding.doRefactor', () => {
		if (!currentPanel) {
			return;
		}

		currentPanel.webview.postMessage({ command: 'refactor' })
	})

	context.subscriptions.push(
		disposable, 
		catCodingStart2, 
		catCodingStart3,
		catCodingStart4,
		doRefactor,
	);
}

export function deactivate() {}
