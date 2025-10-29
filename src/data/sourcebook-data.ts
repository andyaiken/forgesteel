import { core } from '@/data/sourcebooks/core';
import { orden } from '@/data/sourcebooks/orden';
import { playtest } from '@/data/sourcebooks/playtest';
import { ratcatcher } from './sourcebooks/ratcatcher';

export class SourcebookData {
	static core = core;
	static orden = orden;
	static playtest = playtest;
	static ratcatcher = ratcatcher;
}
