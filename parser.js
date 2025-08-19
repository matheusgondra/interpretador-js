import { NumberLiteral } from "./number-literal.js";
import { Identifier } from "./identifier.js";
import { CallExpression } from "./call-expression.js";
import { Program } from "./program.js";
import { VariableDeclaration } from "./variable-declaration.js";

export class Parser {
    #tokens = [];
    #position = 0;

    constructor(tokens) {
        this.#tokens = tokens;
    }

    parse() {
        const declarations = [];
        while (this.#position < this.#tokens.length) {
            const expression = this.#parseExpression();
            this.#expect("SEMICOLON");
            declarations.push(expression);
        }

        return new Program(declarations);
    }

    #parseExpression() {
        const token = this.#peek();
        
        if (token.type === "VAR") {
            return this.#parseVariableDeclaration();
        }

        if (token.type === "IDENTIFIER") {
            const nextToken = this.#tokens[this.#position + 1];

            const isFunctionCall = nextToken.type === "LPAREN";
            if (isFunctionCall) {
                return this.#parseCallExpression();
            }

            return this.#parseIdentifier();
        }

        if (token.type === "NUMBER") {
            return this.#parseNumber();
        }
        throw new Error("Invalid expression");
    }
    

    #parseCallExpression() {
        const name = this.#parseIdentifier();
        this.#expect("LPAREN");

        const args = [];
        while (this.#peek().type !== "RPAREN") {
            args.push(this.#parseExpression());
        
            if (this.#peek().type === "COMMA") {
                this.#expect("COMMA");
            }
        }

        this.#expect("RPAREN");

        return new CallExpression(name.value, args);
    }

    #parseVariableDeclaration() {
        this.#expect("VAR");
        const name = this.#expect("IDENTIFIER");
        this.#expect("ASSIGNMENT");
        const value = this.#parseExpression();

        return new VariableDeclaration(name, value);
    }

    #peek() {
        return this.#tokens[this.#position];
    }

    #parseIdentifier() {
        const token = this.#expect("IDENTIFIER");
        return new Identifier(token.value);
    }

    #parseNumber() {
        const token = this.#expect("NUMBER");
        return new NumberLiteral(token.value);
    }

    #expect(type) {
        const token = this.#consume();
        if (token.type !== type) {
            throw new Error(`Expected token type ${type}, but got ${token.type}`);
        }

        return token;
    }

    #consume() {
        const token = this.#peek();
        this.#position++;
        return token;
    }
}