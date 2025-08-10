import { Monster, MonsterState } from "./monster";

export interface EncounterSlot {
    id: string;
    monsterID: string;
    count: number;
    customization: {
        addOnIDs: string[];
    };
    monsters: Monster[];
    state: MonsterState;
}