/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import * as path from "path";
import Write_dependencies from "./file";

export function activate(context: vscode.ExtensionContext) {
  const command = "myExtension.sayHello";
  const rootPath =
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : undefined;

  const commandHandler = async (name: string = "world") => {
    const packageJsonPath = rootPath ? path.join(rootPath, "package.json") : "";
    const readmeMdPath = rootPath ? path.join(rootPath, "readme.md") : "";

    const Line_number = await vscode.window.showInputBox({
      prompt: "Enter line number",
      value: "1",
    });
    Write_dependencies(1, packageJsonPath, readmeMdPath);
  };

  context.subscriptions.push(
    vscode.commands.registerCommand(command, commandHandler)
  );
}
