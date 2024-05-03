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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const markdown_table_ts_1 = require("markdown-table-ts");
const vscode = __importStar(require("vscode"));
const toTable = (dependencies) => {
    const dependencyEntries = Object.entries(dependencies);
    const myTable = {
        head: ["Package Name", "Version"],
        body: dependencyEntries.map(([packageName, version]) => [
            packageName,
            version,
        ]),
    };
    const myAlignment = [markdown_table_ts_1.Align.Left, markdown_table_ts_1.Align.Left];
    const table = (0, markdown_table_ts_1.getMarkdownTable)({
        table: myTable,
        alignment: myAlignment,
        alignColumns: true,
    });
    return table;
};
async function addDataToLine(filePath, lineNumber, newData) {
    try {
        // Read the content of the Markdown file
        let data = "";
        try {
            data = await (0, fs_1.readFileSync)(filePath, "utf8");
        }
        catch (error) { }
        // Split the content into an array of lines
        const lines = data.split("\n");
        // Insert the new data at the specified line number
        lines.splice(lineNumber - 1, 0, newData);
        // Join the lines back into a single string
        const updatedContent = lines.join("\n");
        // Write the updated content back to the Markdown file
        await (0, fs_1.writeFileSync)(filePath, updatedContent, "utf8");
    }
    catch (err) {
        vscode.window.showErrorMessage("❌ No package.json found");
    }
}
async function Write_dependencies(line_number, packageJsonPath, readmeMdPath) {
    let packageJson;
    try {
        // read json file and get all dependencies
        const readFile = await (0, fs_1.readFileSync)(packageJsonPath, "utf8");
        packageJson = JSON.parse(readFile);
    }
    catch (error) {
        throw error;
    }
    let depDevTable = "";
    let devDepTable = "";
    let peerDepTable = "";
    // make all dependencies to markdown table
    if (packageJson.dependencies) {
        depDevTable = toTable(packageJson.dependencies);
        depDevTable = `
### <img width="30" src="https://raw.githubusercontent.com/devgauravjatt/NodeDevTable/main/images/main.svg" /> Dependencies :-
${depDevTable}
`;
    }
    if (packageJson.devDependencies) {
        devDepTable = toTable(packageJson.devDependencies);
        devDepTable = `
### <img width="30" src="https://raw.githubusercontent.com/devgauravjatt/NodeDevTable/main/images/dev.svg" /> Dev Dependencies :-
${devDepTable}
`;
    }
    if (packageJson.peerDependencies) {
        peerDepTable = toTable(packageJson.peerDependencies);
        peerDepTable = `
### <img width="30" src="https://raw.githubusercontent.com/devgauravjatt/NodeDevTable/main/images/peer.svg" /> Peer Dependencies :-
${peerDepTable}
`;
    }
    const myTable = `
## <img width="50" src="https://raw.githubusercontent.com/devgauravjatt/NodeDevTable/main/images/npm.svg" /> This project uses the following dependencies -
${depDevTable}${devDepTable}${peerDepTable}
`;
    try {
        await addDataToLine(readmeMdPath, line_number, myTable);
        vscode.window.showInformationMessage("✅ Dependencies table added successfully");
    }
    catch (error) {
        throw error;
    }
    return true;
}
exports.default = Write_dependencies;
