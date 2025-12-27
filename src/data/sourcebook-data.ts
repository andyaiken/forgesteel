import { community, communityPrerelease } from '@/data/sourcebooks/community/community';
import { blacksmith } from '@/data/sourcebooks/third-party/magazine-blacksmith';
import { core } from '@/data/sourcebooks/official/core';
import { lookOut } from '@/data/sourcebooks/third-party/look-out';
import { orden } from '@/data/sourcebooks/official/orden';
import { patreon } from '@/data/sourcebooks/official/patreon';
import { ratcatcher } from '@/data/sourcebooks/third-party/magazine-ratcatcher';
import { summonerSourcebook } from '@/data/sourcebooks/official/summoner';
import { triglav } from '@/data/sourcebooks/third-party/triglav';

export class SourcebookData {
	// Official
	static core = core;
	static orden = orden;
	static patreon = patreon;
	static summoner = summonerSourcebook;

	// Third Party
	static lookOut = lookOut;
	static magazineBlacksmith = blacksmith;
	static magazineRatcatcher = ratcatcher;
	static triglav = triglav;

	// Community
	static communityPrerelease = communityPrerelease;
	static community = community;
}
