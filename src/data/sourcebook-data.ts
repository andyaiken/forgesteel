import { FeatureFlags } from '@/utils/feature-flags';
import { Sourcebook } from '@/models/sourcebook';

export class SourcebookData {
	private static cache: Sourcebook[] | null = null;

	// Loads (and caches) all built-in sourcebooks, the same way homebrew sourcebooks
	// are loaded from storage at boot. Dynamic imports let the bundler split each
	// sourcebook (and the shared data pools it draws on) into its own chunk, fetched
	// alongside the rest of the app's async boot data instead of the main bundle.
	static loadAll = async () => {
		if (SourcebookData.cache) {
			return SourcebookData.cache;
		}

		const modules: Promise<Sourcebook>[] = [
			// Official
			import('@/data/sourcebooks/official/core').then(m => m.core),
			import('@/data/sourcebooks/official/orden').then(m => m.orden),
			import('@/data/sourcebooks/official/beastheart').then(m => m.beastheartSourcebook),
			import('@/data/sourcebooks/official/summoner').then(m => m.summonerSourcebook),

			// Third Party
			import('@/data/sourcebooks/community/community').then(m => m.community),
			import('@/data/sourcebooks/third-party/look-out').then(m => m.lookOut),
			import('@/data/sourcebooks/third-party/magazine-blacksmith').then(m => m.blacksmith),
			import('@/data/sourcebooks/third-party/magazine-ratcatcher').then(m => m.ratcatcher),
			import('@/data/sourcebooks/third-party/steel-echoes').then(m => m.steelEchoes),
			import('@/data/sourcebooks/third-party/triglav').then(m => m.triglav),
			import('@/data/sourcebooks/third-party/weapons-of-legend').then(m => m.weaponsOfLegend)
		];

		if (FeatureFlags.hasFlag(FeatureFlags.playtest.code)) {
			modules.push(import('@/data/sourcebooks/official/patreon').then(m => m.patreon));
		}
		if (FeatureFlags.hasFlag(FeatureFlags.communityPreRelease.code)) {
			modules.push(import('@/data/sourcebooks/community/community').then(m => m.communityPrerelease));
		}
		if (FeatureFlags.hasFlag(FeatureFlags.ageOfSecrets.code)) {
			modules.push(import('@/data/sourcebooks/community/age-of-secrets').then(m => m.ageOfSecrets));
		}

		SourcebookData.cache = await Promise.all(modules);
		return SourcebookData.cache;
	};

	static getCached = () => {
		if (!SourcebookData.cache) {
			throw new Error('SourcebookData.loadAll() has not resolved yet.');
		}

		return SourcebookData.cache;
	};
}
