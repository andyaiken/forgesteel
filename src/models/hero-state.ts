import { Condition } from '@/models/condition';
import { EncounterSlot } from '@/models/encounter-slot';
import { Item } from '@/models/item';
import { Project } from '@/models/project';

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
