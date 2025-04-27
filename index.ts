import fs from "fs"
import { Lexer } from "./lexer/lexer";

let path = process.argv[2];
let file = fs.readFileSync(path)
let lines = file.toString().trim().split("\n")

let lexer: Lexer = new Lexer(lines);
console.log(lexer.tokens)
