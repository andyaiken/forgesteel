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

	static getMonogram = (text: string) => {
		const stopList = [ 'a', 'an', 'the', 'in', 'on', 'of' ];
		return text
			.replace(/[^a-zA-Z0-9 ]/g, '')
			.toLowerCase()
			.split(' ')
			.filter(token => !stopList.includes(token))
			.map(token => token[0])
			.join('')
			.substring(0, 3)
			.toUpperCase();
	};

	static stripEmojis = (str: string) => {
		return str
			.replace(
				/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
				''
			)
			.replace(/\s+/g, ' ')
			.trim();
	};

	static pluralize = (text: string, n?: number) => {
		let result = text;
		if (n === undefined || n > 1) {
			const esEndings = [ 'ss', 'j', 'sh', 'x', 'z', 'ch', 'o' ];
			const ysEndings = [ 'ay', 'ey', 'iy', 'oy', 'uy' ];
			if (esEndings.some(j => text.toLowerCase().endsWith(j))) {
				result += 'es';
			} else if (ysEndings.some(j => text.toLowerCase().endsWith(j))) {
				result += 's';
			} else if (text.toLowerCase().endsWith('y')) {
				result = text.slice(0, -1) + 'ies';
			} else if (text.toLowerCase().endsWith('f')) {
				result = text.slice(0, -1) + 'ves';
			} else if (text.toLowerCase().endsWith('fe')) {
				result = text.slice(0, -2) + 'ves';
			} else {
				result += 's';
			}
		}
		return result;
	};
}
