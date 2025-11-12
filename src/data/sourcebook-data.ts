import { blacksmith } from '@/data/sourcebooks/blacksmith';
import { core } from '@/data/sourcebooks/core';
import { orden } from '@/data/sourcebooks/orden';
import { playtest } from '@/data/sourcebooks/playtest';
import { ratcatcher } from '@/data/sourcebooks/ratcatcher';

export class SourcebookData {
	// Official
	static core = core;
	static orden = orden;
	static playtest = playtest;

	// Third Party
	static blacksmith = blacksmith;
	static ratcatcher = ratcatcher;
}
