import {TokenType} from "../lexer/tokens";
import {Expression, Statement} from "../ast/ast";
import {Parser} from "./parser";
import {ParseHandlers} from "./handlers";

export type statementFunc = () => Statement;

export type nudFunc = () => Expression;

export type ledFunc = (left: Expression, bp: BindingPower) => Expression;

export enum BindingPower {
    Default,
    Comma,
    Assignement,
    Logical,
    Relational,
    Additive,
    Multiplicative,
    Unary,
    Call,
    Member,
    Primary
}

export class LookupTable {
    parser: Parser;
    handlers: ParseHandlers;

    statementTable: Map<TokenType, statementFunc> = new Map([])
    nudTable: Map<TokenType, nudFunc> = new Map([])
    ledTable: Map<TokenType, ledFunc> = new Map([])
    bindingPowerTable: Map<TokenType, BindingPower> = new Map([])

    led(token: TokenType, bp: BindingPower, handler: ledFunc) {
        this.ledTable.set(token, handler);
        this.bindingPowerTable.set(token, bp);
    }

    nud(token: TokenType, bp: BindingPower, handler: nudFunc) {
        this.nudTable.set(token, handler);
        this.bindingPowerTable.set(token, bp);
    }

    constructor(parser: Parser) {
        this.parser = parser;
        this.handlers = new ParseHandlers(this.parser, this);

        // Literals
        this.nud(TokenType.Number, BindingPower.Primary, this.handlers.literalHandler);

        // Binary expressions
        this.led(TokenType.Plus, BindingPower.Additive, this.handlers.binaryExprHandler);
        this.led(TokenType.Minus, BindingPower.Additive, this.handlers.binaryExprHandler);
        this.led(TokenType.Star, BindingPower.Multiplicative, this.handlers.binaryExprHandler);
        this.led(TokenType.Slash, BindingPower.Multiplicative, this.handlers.binaryExprHandler);
    }
}







