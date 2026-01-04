import { describe, expect, test } from 'vitest';
import { Utils } from '@/utils/utils';

describe('Utils', () => {
	describe('isNullOrEmpty', () => {
		test.each([
			[ '', true ],
			[ null, true ],
			[ undefined, true ],
			[ 'a', false ],
			[ '     ', true ],
			[ '  a   ', false ]
		])('returns the expected result', (value, expected) => {
			expect(Utils.isNullOrEmpty(value)).toBe(expected);
		});
	});

	describe('valueOrDefault', () => {
		test.each([
			[ '', 'default' ],
			[ null, 'default' ],
			[ undefined, 'default' ],
			[ 'a', 'a' ],
			[ '     ', 'default' ],
			[ '  a   ', '  a   ' ],
			[ 42, '42' ],
			[ 0, 'default' ],
			[ '0', '0' ]
		])('returns the expected result', (value, expected) => {
			expect(Utils.valueOrDefault(value, 'default')).toBe(expected);
		});
	});

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

	describe('getErrorMessage', () => {
		test.each([
			[ 'Just a string', 'Just a string' ],
			[ new Error('an error message'), 'an error message' ],
			[ { msg: 'an object' }, '[object Object]' ]
		])('Returns reasonable messages for various things that are error-like', (err, expected) => {
			expect(Utils.getErrorMessage(err)).toBe(expected);
		});
	});

	describe('hashCode', () => {
		test.each([
			[ 'some medium string', 'another medium string' ],
			[ '01234567890123456', 'another medium string' ]
		])('does not collide on medium-length strings', (a, b) => {
			expect(Utils.hashCode(a)).not.toEqual(Utils.hashCode(b));
		});
	});
});
