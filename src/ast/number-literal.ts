import { ASTNode } from "./ast-node.js";

export class NumberLiteral extends ASTNode {
    constructor(value: number) {
        super("NumberLiteral", value);
    }
}