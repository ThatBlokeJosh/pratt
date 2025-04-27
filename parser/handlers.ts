import {BindingPower, ledFunc, LookupTable, nudFunc} from "./lookup";
import {TokenType} from "../lexer/tokens";
import {BinaryExpression, NumberExpression, Operator} from "../ast/expressions";
import {Expression, Statement} from "../ast/ast";
import {Parser} from "./parser";
import {ExpressionStatement} from "../ast/statements";

export class ParseHandlers {
    parser: Parser
    table: LookupTable

    constructor(parser: Parser, table: LookupTable) {
        this.parser = parser;
        this.table = table;
    }

    expressionHandler(bp: BindingPower): Expression {
        let token = this.parser.currentToken();
        let nudFunc = this.table.nudTable.get(token.token);
        if (nudFunc === undefined) {
            throw(`No implemented NUD handler for token ${token.token}`);
        }

        let left = nudFunc();

        while (this.table.bindingPowerTable.get(this.parser.currentToken().token)! > bp) {
            let token = this.parser.currentToken();

            let ledFunc = this.table.ledTable.get(token.token);
            if (ledFunc === undefined) {
                throw(`No implemented LED handler for token ${token.token}`);
            }

            left = ledFunc(left, bp);
        }

        return left;
    }

    literalHandler: nudFunc = () => {
        switch (this.parser.currentToken().token) {
            case TokenType.Number:
                return new NumberExpression(+this.parser.consume().value);
            default:
                throw(`Cannot parse literal from ${this.parser.currentToken().token}`)
        }
    }

    binaryExprHandler: ledFunc = (left, bp) => {
        let op = this.parser.consume().token as unknown as Operator;
        let right = this.expressionHandler(bp);
        return new BinaryExpression(left, right, op)
    }

    statementHandler(): Statement {
        let statementFunc = this.table.statementTable.get(this.parser.currentToken().token);

        if (statementFunc != undefined) {
            return statementFunc();
        }

        return this.expressionStatementHandler();
    }

    expressionStatementHandler(): ExpressionStatement {
        let expr = this.expressionHandler(BindingPower.Default);
        this.parser.expect(TokenType.SemiColon);
        return new ExpressionStatement(expr);
    }
}

