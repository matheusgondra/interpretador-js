export class Token {
    private readonly type: string;
    private readonly value: string | number | null;

    static LPAREN = new Token("LPAREN", "(");
    static RPAREN = new Token("RPAREN", ")");
    static COMMA = new Token("COMMA", ",");
    static SEMICOLON = new Token("SEMICOLON", ";");
    static VAR = new Token("VAR", "var");
    static ASSIGNMENT = new Token("ASSIGNMENT", "=");

    constructor(type: string, value: string | number | null = null) {
        this.type = type;
        this.value = value;
    }

    getType() {
        return this.type;
    }

    getValue() {
        return this.value;
    }

    toString() {
        return `Token(${this.type}, ${this.value})`;
    }
}