import { ASTNode } from "./ast-node.js";

export class Program extends ASTNode {
    constructor(declarations: ASTNode[]) {
        super("Program", null, declarations);
    }
}