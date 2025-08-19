import { ASTNode } from "./ast-node.js";

export class VariableDeclaration extends ASTNode {
    constructor(name, value) {
        super("VariableDeclaration", name, [value]);
    }
}