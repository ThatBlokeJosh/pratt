import {Token, TokenType} from "../lexer/tokens";
import {BlockStatement} from "../ast/statements";
import {Statement} from "../ast/ast";
import {LookupTable} from "./lookup";

export class Parser {
    tokens: Token[];
    pos: number;

    parse(): BlockStatement {
        let body: Statement[] = [];
        let lookupTable = new LookupTable(this);

        while (this.hasTokens()) {
            let stmt: Statement = lookupTable.handlers.statementHandler();
            body.push(stmt);
        }

        return new BlockStatement(body);
    }

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.pos = 0;
    }

    currentToken(): Token {
        return this.tokens[this.pos];
    }

    hasTokens(): boolean {
        return this.pos < this.tokens.length && this.currentToken().token != TokenType.EOF;
    }

    consume(): Token {
        let token = this.currentToken();
        this.pos++;
        return token;
    }

    expect(token: TokenType) {
        let recv = this.consume().token;
        if (recv != token) {
            throw(`Expected ${token} received ${recv}`);
        }
    }
}