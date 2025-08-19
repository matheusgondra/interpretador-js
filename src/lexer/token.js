export class Token {
    #type
    #value

    static LPAREN = new Token("LPAREN", "(");
    static RPAREN = new Token("RPAREN", ")");
    static COMMA = new Token("COMMA", ",");
    static SEMICOLON = new Token("SEMICOLON", ";");
    static VAR = new Token("VAR", "var");
    static ASSIGNMENT = new Token("ASSIGNMENT", "=");

    constructor(type, value = null) {
        this.#type = type;
        this.#value = value;
    }

    get type() {
        return this.#type;
    }

    get value() {
        return this.#value;
    }

    toString() {
        return `Token(${this.#type}, ${this.#value})`;
    }
}