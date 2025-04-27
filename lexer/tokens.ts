export interface Token {
	value: string,
	token: TokenType,
}

export enum TokenType {
	Number,
	Plus,
	Minus,
	Star,
	Dash,
	SemiColon,
	EOF,
}

export const TOKEN_MAP: Map<TokenType, RegExp> = new Map([
	[TokenType.Number, new RegExp("^[0-9]+")],
	[TokenType.Plus, new RegExp("^[+]")],
	[TokenType.Minus, new RegExp("^[-]")],
	[TokenType.Star, new RegExp("^[*]")],
	[TokenType.Dash, new RegExp("^[/]")],
	[TokenType.SemiColon, new RegExp("^[;]")],
	[TokenType.EOF, new RegExp("")],
])
