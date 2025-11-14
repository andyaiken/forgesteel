import { community, communityPrerelease } from './sourcebooks/community';
import { blacksmith } from '@/data/sourcebooks/magazine-blacksmith';
import { core } from '@/data/sourcebooks/core';
import { orden } from '@/data/sourcebooks/orden';
import { playtest } from '@/data/sourcebooks/playtest';
import { ratcatcher } from '@/data/sourcebooks/magazine-ratcatcher';

export class SourcebookData {
	// Official
	static core = core;
	static orden = orden;
	static playtest = playtest;

	// Third Party
	static magazineBlacksmith = blacksmith;
	static magazineRatcatcher = ratcatcher;
	static communityPrerelease = communityPrerelease;
	static community = community;
}
