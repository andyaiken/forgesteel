import { Condition } from '@/models/condition';
import { EncounterSlot } from '@/models/encounter';
import { Item } from '@/models/item';
import { Project } from '@/models/project';
import { Title } from '@/models/title';
import { TutorialMode } from '@/enums/tutorial-mode';

export interface HeroState {
	tutorialMode: TutorialMode
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
	titles: Title[];
	controlledSlots: EncounterSlot[];
	notes: string;
	inventoryText: string;
	hidden: boolean;
	encounterState: 'ready' | 'current' | 'finished';
	defeated: boolean;
}
