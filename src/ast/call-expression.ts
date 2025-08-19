import { ASTNode } from "./ast-node.js";

export class CallExpression extends ASTNode {
    constructor(name: string, args: ASTNode[]) {
        super("CallExpression", name, args);
    }
}