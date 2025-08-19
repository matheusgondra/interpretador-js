import { CallExpression } from "./call-expression.js";
import { Identifier } from "./identifier.js";
import { NumberLiteral } from "./number-literal.js";
import { Program } from "./program.js";

export class Evaluator {
    #functions = {
        add: (args) => args.reduce((acc, value) => acc + value, 0),
        sub: (args) => args.reduce((acc, value) => acc - value)
    };

    evaluate(node) {
        if (node instanceof Program) {
            let lastResult = null;
            
            for (const child of node.children) {
                lastResult = this.evaluate(child);
            }

            return lastResult;
        }

        if (node instanceof NumberLiteral) {
            return node.value;
        }

        if (node instanceof Identifier) {
            throw new Error(`Identifier "${node.name}" is not a function`);
        }

        if (node instanceof CallExpression) {
            const functionName = node.value;
            const functionImplementation = this.#functions[functionName];

            if (!functionImplementation) {
                throw new Error(`Function "${functionName}" is not defined`);
            }

            const evaluateArgs = node.children.map(child => this.evaluate(child)); // [30, 25]

            return functionImplementation(evaluateArgs);
        }

        throw new Error(`Unknown AST node type: ${node.type}`);
    }
}