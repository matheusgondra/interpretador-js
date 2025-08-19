import { ASTNode } from "./ast-node.js";

export class VariableDeclaration extends ASTNode {
    constructor(name: string, value: ASTNode) {
        super("VariableDeclaration", name, [value]);
    }
}