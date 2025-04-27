import {Expression, Statement} from "./ast";

export class BlockStatement extends Statement {
    body: Statement[]

    constructor(body: Statement[]) {
        super();
        this.body = body;
    }
}

export class ExpressionStatement extends Statement {
    expression: Expression

    constructor(expression: Expression) {
        super();
        this.expression = expression;
    }
}