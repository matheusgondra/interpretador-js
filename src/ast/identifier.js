import { ASTNode } from "./ast-node.js";

export class Identifier extends ASTNode {
    constructor(name) {
        super("Identifier", name);
    }
}