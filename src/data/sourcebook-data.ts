import { draachenmar } from '@/data/sourcebooks/draachenmar';
import { orden } from '@/data/sourcebooks/orden';
import { playtest } from '@/data/sourcebooks/playtest';
import { ratcatcher } from './sourcebooks/ratcatcher';

export class SourcebookData {
	static orden = orden;
	static playtest = playtest;
	static draachenmar = draachenmar;
	static ratcatcher = ratcatcher;
}
