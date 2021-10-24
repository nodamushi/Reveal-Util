import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand(
		'reveal-util.showActiveFileInExplorer',
		showActiveFileInExplorer));
	context.subscriptions.push(vscode.commands.registerCommand(
		'reveal-util.newFile',
		newFile));
	context.subscriptions.push(vscode.commands.registerCommand(
		'reveal-util.newFolder',
		newFolder));
}

export function deactivate() { }

export async function showActiveFileInExplorer(): Promise<boolean> {
	const editor = vscode.window.activeTextEditor;
	if (editor === undefined) { return false; }

	if (vscode.workspace.getWorkspaceFolder(editor.document.uri) !== undefined) {
		await vscode.commands.executeCommand("workbench.files.action.showActiveFileInExplorer");
		return true;
	}

	return false;
}

export async function newFile() {
	await showActiveFileInExplorer();
	// The command may not respond, so sleep 0.1s.
	setTimeout(()=>vscode.commands.executeCommand('explorer.newFile'), 100);
}

export async function newFolder() {
	await showActiveFileInExplorer();
	// The command may not respond, so sleep 0.1s.
	setTimeout(()=>vscode.commands.executeCommand('explorer.newFolder'), 100);
}