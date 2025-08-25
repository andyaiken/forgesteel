import { Condition } from './condition';
import { EncounterSlot } from './encounter-slot';
import { Item } from './item';
import { Project } from './project';

export interface HeroState {
	staminaDamage: number;
	staminaTemp: number;
	recoveriesUsed: number;
	surges: number;
	victories: number;
	xp: number;
	heroTokens: number;
	renown: number;
	wealth: number;
	projectPoints: number;
	conditions: Condition[];
	inventory: Item[];
	projects: Project[];
	controlledSlots: EncounterSlot[];
	notes: string;
	hidden: boolean;
	encounterState: 'ready' | 'current' | 'finished';
	defeated: boolean;
}
