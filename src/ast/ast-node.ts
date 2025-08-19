export class ASTNode {
    private readonly type: string;
    private readonly value: any;
    private readonly children: ASTNode[];

    constructor(type: string, value: any = null, children: ASTNode[] = []) {
        this.type = type;
        this.value = value;
        this.children = children;
    }

    getType() {
        return this.type;
    }

    getValue() {
        return this.value;
    }

    getChildren() {
        return this.children;
    }

    toJSON(): object {
        return {
            type: this.getType(),
            value: this.getValue(),
            children: this.getChildren().map(child => child.toJSON())
        };
    }
}