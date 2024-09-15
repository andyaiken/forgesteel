export class Format {
	static capitalize = (text: string) => {
		return text
			.split(' ')
			.filter(token => token.length > 0)
			.map(token => `${token[0].toUpperCase()}${token.substring(1)}`)
			.join(' ');
	};
}
