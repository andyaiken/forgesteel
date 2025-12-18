import { describe, expect, test } from 'vitest';
import { Utils } from './utils';

describe('Utils', () => {
	describe('fixHostnameUrl', () => {
		test.each([
			[ 'HTTPS://SoMe.Url', 'https://some.url' ]
		])('converts the value to lowercase', (url, expected) => {
			expect(Utils.fixHostnameUrl(url)).toBe(expected);
		});

		test.each([
			[ 'https://some.url/', 'https://some.url' ],
			[ 'https://some.url///', 'https://some.url' ],
			[ 'https://some.url', 'https://some.url' ],
			[ 'https://some.url/path/', 'https://some.url/path' ]
		])('removes trailing slash if present', (url, expected) => {
			expect(Utils.fixHostnameUrl(url)).toBe(expected);
		});
	});
});
