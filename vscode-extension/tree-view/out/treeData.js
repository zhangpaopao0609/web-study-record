"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeDependenciesProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
class Dependency extends vscode.TreeItem {
    constructor(label, version, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.version = version;
        this.collapsibleState = collapsibleState;
        this.iconPath = {
            light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
        };
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
        this.contextValue = 'dependency';
    }
}
class NodeDependenciesProvider {
    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    pathExists(p) {
        try {
            fs.accessSync(p);
        }
        catch (error) {
            return false;
        }
        return true;
    }
    getDepsInPackageJson(packageJsonPath) {
        if (this.pathExists(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            const toDep = (moduleName, version) => {
                if (this.pathExists(path.join(this.workspaceRoot, 'node_modules', moduleName))) {
                    return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
                }
                else {
                    return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.None);
                }
            };
            const getDeps = (key) => packageJson[key]
                ? Object.entries(packageJson[key]).map(([moduleName, version]) => toDep(moduleName, version))
                : [];
            return getDeps('dependencies').concat(getDeps('devDependencies'));
        }
        else {
            return [];
        }
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No denpendency in empty workspace');
            return Promise.resolve([]);
        }
        console.log(1, element);
        if (element) {
            const packageJsonPath = path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json');
            return Promise.resolve(this.getDepsInPackageJson(packageJsonPath));
        }
        else {
            const packageJsonPath = path.join(this.workspaceRoot, 'package.json');
            if (this.pathExists(packageJsonPath)) {
                return Promise.resolve(this.getDepsInPackageJson(packageJsonPath));
            }
            else {
                vscode.window.showInformationMessage('Workspace has no package.json');
                return Promise.resolve([]);
            }
        }
    }
}
exports.NodeDependenciesProvider = NodeDependenciesProvider;
//# sourceMappingURL=treeData.js.map