import { 
    NumberLiteral,
    Identifier,
    CallExpression,
    Program,
    VariableDeclaration,
    ASTNode
} from "../ast/index.js";
import { Token } from "../lexer/token.js";

export class Parser {
    private tokens: Token[] = [];
    private position: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    parse(): Program {
        const declarations = [];
        while (this.position < this.tokens.length) {
            const expression = this.parseExpression();
            this.expect("SEMICOLON");
            declarations.push(expression);
        }

        return new Program(declarations);
    }

    private parseExpression(): ASTNode {
        const token = this.peek();
        
        if (token.getType() === "VAR") {
            return this.parseVariableDeclaration();
        }

        if (token.getType() === "IDENTIFIER") {
            const nextToken = this.tokens[this.position + 1];

            const isFunctionCall = nextToken.getType() === "LPAREN";
            if (isFunctionCall) {
                return this.parseCallExpression();
            }

            return this.parseIdentifier();
        }

        if (token.getType() === "NUMBER") {
            return this.parseNumber();
        }

        throw new Error("Invalid expression");
    }
    

    private parseCallExpression(): CallExpression {
        const name = this.parseIdentifier();
        this.expect("LPAREN");

        const args = [];
        while (this.peek().getType() !== "RPAREN") {
            args.push(this.parseExpression());
        
            if (this.peek().getType() === "COMMA") {
                this.expect("COMMA");
            }
        }

        this.expect("RPAREN");

        return new CallExpression(name.getValue() as string, args);
    }

    private parseVariableDeclaration(): VariableDeclaration {
        this.expect("VAR");
        const name = this.expect("IDENTIFIER");
        this.expect("ASSIGNMENT");
        const value = this.parseExpression();

        return new VariableDeclaration(name.getValue() as string, value);
    }

    private peek(): Token {
        return this.tokens[this.position];
    }

    private parseIdentifier(): Identifier {
        const token = this.expect("IDENTIFIER");
        return new Identifier(token.getValue() as string);
    }

    private parseNumber(): NumberLiteral {
        const token = this.expect("NUMBER");
        return new NumberLiteral(token.getValue() as number);
    }

    private expect(type: string): Token {
        const token = this.consume();
        if (token.getType() !== type) {
            throw new Error(`Expected token type ${type}, but got ${token.getType()}`);
        }

        return token;
    }

    private consume(): Token {
        const token = this.peek();
        this.position++;
        return token;
    }
}