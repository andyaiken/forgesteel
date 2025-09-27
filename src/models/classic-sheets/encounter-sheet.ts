import { FeatureMalice, FeatureMaliceAbility } from '../feature';
import { EncounterGroup } from '../encounter';
import { Terrain } from '../terrain';

export interface EncounterSheet {
	id: string;
	name: string;
	description: string;

	heroCount: number;
	heroLvl: number;
	heroVictories: number;

	difficulty: string;
	encounterVictories: number;
	encounterEv: number;

	successCondition?: string;
	failureCondition?: string;

	malice?: { monster: string, malice: (FeatureMalice | FeatureMaliceAbility)[] }[];
	groups?: EncounterGroup[];

	terrain?: Terrain[];
}
