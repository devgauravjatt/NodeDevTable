"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const file_1 = __importDefault(require("./file"));
function activate(context) {
    const command = "myExtension.sayHello";
    const rootPath = vscode.workspace.workspaceFolders &&
        vscode.workspace.workspaceFolders.length > 0
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : undefined;
    const commandHandler = async (name = "world") => {
        const packageJsonPath = rootPath ? path.join(rootPath, "package.json") : "";
        const readmeMdPath = rootPath ? path.join(rootPath, "readme.md") : "";
        const Line_number = await vscode.window.showInputBox({
            prompt: "Enter line number",
            value: "1",
        });
        (0, file_1.default)(1, packageJsonPath, readmeMdPath);
    };
    context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}
exports.activate = activate;
