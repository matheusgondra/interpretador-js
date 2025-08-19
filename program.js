import { ASTNode } from "./ast-node.js";

export class Program extends ASTNode {
    constructor(declarations) {
        super("Program", null, declarations);
    }
}