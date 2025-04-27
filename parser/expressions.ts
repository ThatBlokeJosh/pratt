import { Expression } from "./ast";

export class NumberExpression extends Expression {
	value: number;

	constructor(value: number) {
		super();
		this.value = value;
	}
}
