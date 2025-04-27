import fs from "fs"
import { Lexer } from "./lexer/lexer";
import {Parser} from "./parser/parser";

console.log("START\n")

let path = process.argv[2];
let file = fs.readFileSync(path)
let lines = file.toString().trim().split("\n")

let lexer: Lexer = new Lexer(lines);
let parser: Parser = new Parser(lexer.tokens);
let statement = parser.parse()
console.log(JSON.stringify(statement, null, 2))
