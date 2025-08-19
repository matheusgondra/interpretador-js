import { Token } from "./token.js";

export class Lexer {
    private text: string;
    private position: number;
    private currentChar: string | null;

    constructor(text: string) {
        this.text = text;
        this.position = 0;
        this.currentChar = this.text[this.position];
    }

    tokenize(): Token[] {
        const tokens: Token[] = [];

        while (this.currentChar !== null) {
            if (this.isWhiteSpace()) {
                this.skipWhitespace();
                continue;
            }

            if (this.isDigit()) {
                const value = this.number();
                tokens.push(new Token("NUMBER", value));
                continue;
            }

            if (this.isIdentifier()) {
                const value = this.identifier();
                tokens.push(value);
                continue;
            }

            if (this.currentChar === "(") {
                tokens.push(Token.LPAREN);
                this.advance();
                continue;
            }

            if (this.currentChar === ")") {
                tokens.push(Token.RPAREN);
                this.advance();
                continue;
            }

            if (this.currentChar === ",") {
                tokens.push(Token.COMMA);
                this.advance();
                continue;
            }

            if (this.currentChar === ";") {
                tokens.push(Token.SEMICOLON);
                this.advance();
                continue;
            }

            if (this.currentChar === "=") {
                tokens.push(Token.ASSIGNMENT);
                this.advance();
                continue;
            }

            throw new Error("Caractere inválido: " + this.currentChar);
        }

        return tokens;
    }

    private skipWhitespace() {
        while (this.currentChar !== null && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    private number() {
        let result = "";

        while (this.currentChar !== null && /\d/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }

        return parseInt(result, 10);
    }

    private identifier() {
        let result = "";

        while (this.currentChar !== null && /[a-zA-Z]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }

        if (result === "var") {
            return Token.VAR;
        }

        return new Token("IDENTIFIER", result);
    }

    private advance() {
        this.position++;

        if (this.position >= this.text.length) {
            this.currentChar = null;
            return;
        }
        
        this.currentChar = this.text[this.position];
    }

    private isWhiteSpace() {
        return /\s/.test(this.currentChar!);
    }

    private isDigit() {
        return /\d/.test(this.currentChar!);
    }

    private isIdentifier() {
        return /[a-zA-Z]/.test(this.currentChar!);
    }
}