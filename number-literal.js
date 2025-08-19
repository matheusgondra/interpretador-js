import { ASTNode } from "./ast-node.js";

export class NumberLiteral extends ASTNode {
    constructor(value) {
        super("NumberLiteral", value);
    }
}