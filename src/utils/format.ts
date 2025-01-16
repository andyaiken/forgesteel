export class Format {
	static capitalize = (text: string, separator: string = ' ') => {
		return text
			?.split(separator)
			.filter(token => token.length > 0)
			.map(token => `${token[0].toUpperCase()}${token.substring(1)}`)
			.join(' ');
	};

	static startsWithVowel = (text: string) => {
		const vowels = [ 'a', 'e', 'i', 'o', 'u' ];
		return vowels.some(v => text.toLowerCase().startsWith(v));
	};
}
