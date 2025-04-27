import { Expression } from "./ast";
import {TokenType} from "../lexer/tokens";

export class NumberExpression extends Expression {
	value: number;

	constructor(value: number) {
		super();
		this.value = value;
	}
}

export enum Operator {
	Add = TokenType.Plus,
	Subtract = TokenType.Dash,
	Multiply = TokenType.Star,
	Divide = TokenType.Slash,
}

export class BinaryExpression extends Expression {
	left: Expression;
	operator: Operator
	right: Expression;

	constructor(left: Expression, right: Expression, operator: Operator) {
		super();
		this.left = left;
		this.right = right;
		this.operator = operator;
	}
}
