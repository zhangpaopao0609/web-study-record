import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

class Dependency extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private version: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}-${this.version}`;
    this.description = this.version;
    this.contextValue = 'dependency'
  }

  iconPath = {
    light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
    dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
  };
}

export class NodeDependenciesProvider implements vscode.TreeDataProvider<Dependency> {
  constructor(private workspaceRoot: string | undefined) {}

  private pathExists(p: string): boolean {
    try {
      fs.accessSync(p);
    } catch (error) {
      return false;
    }
    return true;
  }

  private getDepsInPackageJson(packageJsonPath: string): Dependency[] {
    if (this.pathExists(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      const toDep = (moduleName: string, version: string): Dependency => {
        if (this.pathExists(path.join(this.workspaceRoot, 'node_modules', moduleName))) {
          return new Dependency(
            moduleName,
            version,
            vscode.TreeItemCollapsibleState.Collapsed,
          )
        } else {
          return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.None)
        }
      }

      const getDeps = (key: string) => packageJson[key]
      ? Object.entries(packageJson[key]).map(([moduleName, version]) => 
        toDep(moduleName, version as string))
      : []

      return getDeps('dependencies').concat(getDeps('devDependencies'))
    } else {
      return [];
    }
  }

  private _onDidChangeTreeData: vscode.EventEmitter<Dependency | undefined | null | void> = new vscode.EventEmitter<Dependency | undefined | null | void>();

  readonly onDidChangeTreeData: vscode.Event<void | Dependency | null | undefined> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: Dependency): vscode.TreeItem {
    return element;
  }
  getChildren(element?: any): vscode.ProviderResult<Dependency[]> {
    if (!this.workspaceRoot) {
      vscode.window.showInformationMessage('No denpendency in empty workspace');
      return Promise.resolve([]);
    }
    console.log(1, element);
    if(element) {
      const packageJsonPath = path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json');
      return Promise.resolve(this.getDepsInPackageJson(packageJsonPath))
    } else {
      const packageJsonPath = path.join(this.workspaceRoot, 'package.json')
      if (this.pathExists(packageJsonPath)) {
        return Promise.resolve(this.getDepsInPackageJson(packageJsonPath))
      } else {
        vscode.window.showInformationMessage('Workspace has no package.json');
        return Promise.resolve([]);
      }
    }
  }
  
}