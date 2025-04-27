import { Token, TOKEN_MAP, TokenType } from "./tokens";

export class Lexer {
	lines: string[];
	tokens: Token[] = [];

	constructor(lines: string[]) {
		this.lines = lines;
		this.Tokenize()
	}

	TokenizeLine(line: string, line_number: number): Token[] {
		line = line.replace(new RegExp(" ", "g"), "")
		let tokens: Token[] = [];

		while (line.length > 0) {
			Array.from(TOKEN_MAP.entries()).every((entry) => {
				let [token, regex] = entry;
				let res = regex.exec(line);
				if (res === null) {
					return true;
				}
				if (token === TokenType.EOF) {
					throw (`Invalid token on line ${line_number}`)
				}
				let value = res[0]
				line = line.slice(value.length)
				tokens.push({ value, token })
				return false
			})
		}
		return tokens
	}

	Tokenize() {
		for (let i in this.lines) {
			let line_tokens = this.TokenizeLine(this.lines[i], +i)
			this.tokens.push(...line_tokens)
		}
		this.tokens.push({ value: "", token: TokenType.EOF })
	}
}
