import { CallExpression } from "../ast/call-expression.js";
import { ASTNode, Identifier, NumberLiteral, Program, VariableDeclaration } from "../ast/index.js";

interface IFunction {
    [key: string]: Function;
}

export class Evaluator {
    private readonly scope = new Map<string, any>();
    private readonly functions: IFunction = {
        add: (...args: number[]) => args.reduce((acc, value) => acc + value, 0),
        sub: (...args: number[]) => args.reduce((acc, value) => acc - value)
    };

    evaluate(node: ASTNode): any {
        if (node instanceof Program) {
            let lastResult = null;

            for (const child of node.getChildren()) {
                lastResult = this.evaluate(child);
            }

            return lastResult;
        }

        if (node instanceof VariableDeclaration) {
            const value = this.evaluate(node.getChildren()[0]);
            const varName = typeof node.getValue() === "string" ? node.getValue() : node.getValue().value;
            this.scope.set(varName, value);

            return value;
        }

        if (node instanceof NumberLiteral) {
            return node.getValue();
        }

        if (node instanceof Identifier) {
            if (this.scope.has(node.getValue())) {
                return this.scope.get(node.getValue());
            }

            const functionImplementation = this.functions[node.getValue()];
            if (functionImplementation) {
                return functionImplementation;
            }

            throw new Error(`Identifier "${node.getValue()}" is not a function`);
        }

        if (node instanceof CallExpression) {
            const functionNode = this.evaluate(new Identifier(node.getValue()));
            
            const isFunction = typeof functionNode === "function";
            if (!isFunction) {
                throw new Error(`"${node.getValue()}" is not a function`);
            }

            const evaluateArgs = node.getChildren().map(child => this.evaluate(child));
            return functionNode(...evaluateArgs);
        }

        throw new Error(`Unknown AST node type: ${node.getType()}`);
    }
}