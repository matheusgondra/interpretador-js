import { ASTNode } from "./ast-node.js";

export class CallExpression extends ASTNode {
    constructor(name, args) {
        super("CallExpression", name, args);
    }
}