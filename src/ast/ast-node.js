export class ASTNode {
    #type
    #value
    #children

    constructor(type, value = null, children = []) {
        this.#type = type;
        this.#value = value;
        this.#children = children;
    }

    get type() {
        return this.#type;
    }

    get value() {
        return this.#value;
    }

    get children() {
        return this.#children;
    }

    toJSON() {
        return {
            type: this.#type,
            value: this.#value,
            children: this.#children.map(child => child.toJSON())
        };
    }
}