import { CSSProperties } from 'react';
import './font-tester.scss';

const generateTestElement = (fontSize: number, weight: number) => {
	const testText = 'VICTORIES Character MIGHT Mastermind Hero Tactician Bleeding';
	const idText = `[${Math.floor(fontSize * 10).toString()}, ${weight.toString()}]`;

	const fontSizeRem = `${fontSize}rem`;
	const cssStyle: CSSProperties = {
		fontSize: fontSizeRem,
		fontWeight: weight
	};

	return (
		<div className='test-text' style={cssStyle}>
			{[ idText, testText ].join(' ')}
		</div>
	);
};

const generateTextSpread = (sizeMin: number, sizeMax: number, weightMin: number, weightMax: number) => {
	const dS = 0.1;
	const dW = 100;

	const testSpread = [];
	for (let s = sizeMin; s <= sizeMax; s += dS) {
		for (let w = weightMin; w <= weightMax; w += dW) {
			testSpread.push(generateTestElement(s, w));
		}
	}
	return testSpread;
};

export const FontTester = () => {
	const sizeMin = 1.0;
	const sizeMax = 1.4;
	const dS = 0.1;

	const weightMin = 100;
	const weightMax = 700;
	const dW = 100;

	const testSpread = [];
	for (let s = sizeMin; s <= sizeMax; s += dS) {
		for (let w = weightMin; w <= weightMax; w += dW) {
			testSpread.push(generateTestElement(s, w));
		}
	}

	return (
		<div className='font-test card'>
			<section className='bordered slab'>
				<h3>Roboto Slab</h3>
				{generateTextSpread(1.0, 1.4, 100, 700)}
			</section>

			<section className='bordered serif-alt'>
				<h3>Noto Serif</h3>
				{generateTextSpread(0.9, 1.4, 100, 700)}
			</section>

			<section className='bordered serif'>
				<h3>Merriweather</h3>
				{generateTextSpread(1.0, 1.4, 300, 700)}
			</section>

		</div>
	);
};
