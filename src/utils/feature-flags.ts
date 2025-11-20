import { Utils } from '@/utils/utils';

interface FeatureFlag {
	code: number;
	description: string;
}

export class FeatureFlags {
	// #region List of all the recognised flags

	static warehouse: FeatureFlag = {
		code: -1310338776,
		description: 'Access to the Warehouse beta'
	};

	static playtest: FeatureFlag = {
		code: -1755389952,
		description: 'Access to the Playtest sourcebook'
	};

	static community: FeatureFlag = {
		code: Utils.hashCode('community'),
		description: 'Access to the (pre-release) Community sourcebook'
	};

	private static all = [
		FeatureFlags.warehouse,
		FeatureFlags.playtest,
		FeatureFlags.community
	];

	// #endregion

	// #region List functions

	static flagExists = (code: number) => {
		return FeatureFlags.all.some(f => f.code === code);
	};

	// #endregion

	// #region User entitlement functions

	static active = () => {
		return FeatureFlags.all
			.sort((a, b) => a.description.localeCompare(b.description))
			.filter(flag => FeatureFlags.hasFlag(flag.code));
	};

	static add = (code: number) => {
		const flag = FeatureFlags.all.find(f => f.code === code);
		if (!flag) {
			return;
		}

		if (FeatureFlags.hasFlag(flag.code)) {
			return;
		}

		const codes = FeatureFlags.getCurrentCodes();
		codes.push(flag.code);
		FeatureFlags.setCurrentCodes(codes);
	};

	static remove = (code: number) => {
		const codes = FeatureFlags.getCurrentCodes().filter(f => f !== code);
		FeatureFlags.setCurrentCodes(codes);
	};

	static clear = () => {
		FeatureFlags.setCurrentCodes([]);
	};

	static hasFlag = (code: number) => {
		const codes = FeatureFlags.getCurrentCodes();
		return codes.includes(code);
	};

	// #endregion

	// #region Local storage access

	private static KEY = 'feature_flag_codes';

	private static getCurrentCodes = () => {
		const codes = localStorage.getItem(FeatureFlags.KEY) || '';
		return codes.split(';').filter(f => !!f).map(f => parseInt(f));
	};

	private static setCurrentCodes = (codes: number[]) => {
		if (codes.length === 0) {
			localStorage.removeItem(FeatureFlags.KEY);
		} else {
			localStorage.setItem(FeatureFlags.KEY, codes.map(f => `${f}`).join(';'));
		}
	};

	// #endregion
}
