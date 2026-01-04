export class Browser {
	static isSafari = () => {
		if (!navigator) {
			return false;
		}

		const userAgent = navigator.userAgent || '';
		return userAgent.includes('Safari') && !userAgent.includes('Chrome') && !userAgent.includes('Chromium');
	};

	static isMobile = () => {
		if (!navigator) {
			return false;
		}

		const userAgent = navigator.userAgent || '';
		return userAgent.includes('Mobile');
	};
}
