import { CallExpression } from "../ast/call-expression.js";
import { Identifier, NumberLiteral, Program, VariableDeclaration } from "../ast/index.js";

export class Evaluator {
    #functions = {
        add: (...args) => args.reduce((acc, value) => acc + value, 0),
        sub: (...args) => args.reduce((acc, value) => acc - value)
    };
    #scope = new Map();

    evaluate(node) {
        if (node instanceof Program) {
            let lastResult = null;
            
            for (const child of node.children) {
                lastResult = this.evaluate(child);
            }

            return lastResult;
        }

        if (node instanceof VariableDeclaration) {
            const value = this.evaluate(node.children[0]);
            const varName = typeof node.value === "string" ? node.value : node.value.value;
            this.#scope.set(varName, value);

            return value;
        }

        if (node instanceof NumberLiteral) {
            return node.value;
        }

        if (node instanceof Identifier) {
            if (this.#scope.has(node.value)) {
                return this.#scope.get(node.value);
            }

            const functionImplementation = this.#functions[node.value];
            if (functionImplementation) {
                return functionImplementation;
            }

            throw new Error(`Identifier "${node.value}" is not a function`);
        }

        if (node instanceof CallExpression) {
            const functionNode = this.evaluate(new Identifier(node.value));
            
            const isFunction = typeof functionNode === "function";
            if (!isFunction) {
                throw new Error(`"${node.value}" is not a function`);
            }

            const evaluateArgs = node.children.map(child => this.evaluate(child));
            return functionNode(...evaluateArgs);
        }

        throw new Error(`Unknown AST node type: ${node.type}`);
    }
}