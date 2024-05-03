import { readFileSync, writeFileSync } from "fs";
import { Align, getMarkdownTable } from "markdown-table-ts";
import * as vscode from "vscode";

interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
}

const toTable = (dependencies: Record<string, string>) => {
  const dependencyEntries = Object.entries(dependencies);

  const myTable = {
    head: ["Package Name", "Version"],
    body: dependencyEntries.map(([packageName, version]) => [
      packageName,
      version,
    ]),
  };
  const myAlignment: Align[] = [Align.Left, Align.Left];
  const table = getMarkdownTable({
    table: myTable,
    alignment: myAlignment,
    alignColumns: true,
  });
  return table;
};

async function addDataToLine(
  filePath: string,
  lineNumber: number,
  newData: string
): Promise<void> {
  try {
    // Read the content of the Markdown file
    let data: string = "";
    try {
      data = await readFileSync(filePath, "utf8");
    } catch (error) {}

    // Split the content into an array of lines
    const lines: string[] = data.split("\n");

    // Insert the new data at the specified line number
    lines.splice(lineNumber - 1, 0, newData);

    // Join the lines back into a single string
    const updatedContent: string = lines.join("\n");

    // Write the updated content back to the Markdown file
    await writeFileSync(filePath, updatedContent, "utf8");
  } catch (err) {
    vscode.window.showErrorMessage("❌ No package.json found");
  }
}

async function Write_dependencies(
  line_number: number,
  packageJsonPath: string,
  readmeMdPath: string
) {
  let packageJson: PackageJson;
  try {
    // read json file and get all dependencies
    const readFile = await readFileSync(packageJsonPath, "utf8");
    packageJson = JSON.parse(readFile);
  } catch (error) {
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
    vscode.window.showInformationMessage(
      "✅ Dependencies table added successfully"
    );
  } catch (error) {
    throw error;
  }
  return true;
}

export default Write_dependencies;
