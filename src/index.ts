#!/usr/bin/env node

import fs from "node:fs";
import { Evaluator } from "./evaluator/evaluator.js";
import { Lexer } from "./lexer/lexer.js";
import { Parser } from "./parser/parser.js";

const [_nodeBinary, _fileName, code] = process.argv;
if (!code) {
    throw new Error("Deve ser fornecido o caminho do arquivo");
}

if (!code.endsWith(".gon")) {
    throw new Error("O arquivo deve ter a extensão .gon");
}

const content = fs.readFileSync(code, { encoding: "utf-8" });

const lexer = new Lexer(content);
const tokens = lexer.tokenize();
// console.log("Tokens:", tokens.map(token => token.toString()));

const parser = new Parser(tokens);
const ast = parser.parse();
// console.log("AST:", JSON.stringify(ast, null, 2)); // AST (Abstract Syntax Tree)

const evaluator = new Evaluator();
const result = evaluator.evaluate(ast);
console.log("Result:", result);