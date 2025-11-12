import { AncestryData } from '../ancestry-data';
import { BlacksmithItemData } from '../items/blacksmith-item-data';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { KitData } from '../kit-data';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookType } from '@/enums/sourcebook-type';

export const installImplant = FactoryLogic.createProject({
	id: 'project-install-implant',
	name: 'Install Implant',
	description: `
You can install a psionic implant into either yourself or another hero. Implants are rare and hard to create with the main hurdle being the prolonged process of installation. When this project is complete you gain the effect of the Psionic Implant.

| D6 | Event |
|:---|:------|
| 1  | Before the roll, the hero discovers an installation manual built into the implant. If the hero can read Voll, they treat the project roll as an automatic breakthrough.   |
| 2  | The Psi-tech the hero is installing contains a volatile, experimental AI, previously unknown to them. The AI may be purged from the device, but the Director must secretly roll an Easy Reason test for the hero. On a Tier 1 result, the AI survives within the implant, now desiring vengeance. If the hero chooses to keep the AI, it can communicate telepathically. As long as it remains on good terms with the hero, it grants an edge on all future research rolls. However, the AI is jealous of any other sentient equipment the hero possesses.   |
| 3  | The implant contains a psionic alarm; its creator immediately becomes aware of its location and that someone is attempting to install it.   |
| 4  | The stress of the installation process causes periodic malfunctions from the half-installed implant. Until the project is complete, the recipient gains the Psychic Eruption complication.   |
| 5  | During installation, a significant malfunction occurs. If the damage is not mitigated, the workshop is badly damaged and work on the project cannot continue until a replacement workshop is secured.   |
| 6  | A rogue Psi-borg learns of the procedure and offers to help install the implant. They reveal that they are being hunted by UNISOL agents, who are already on their trail. If the hero protects the Psi-borg from the agents, the Psi-borg becomes one of the hero’s followers. The follower is either a retainer or a sage as determined by the Director. If the hero helps the Psi-borg, they also gain an immediate 50 project points toward the implant’s installation.   |
`,
	prerequisites: 'A Psionic Implant',
	source: 'Text or lore in either Voll or Variac',
	characteristic: [ Characteristic.Reason, Characteristic.Intuition ],
	goal: 100
});

export const blacksmith: Sourcebook = {
	id: 'blacksmith',
	name: 'Blacksmith\'s Guild',
	description: 'Community-created content from the [Blacksmith\'s Guild](https://tabletopnonsenseverse.myshopify.com/).',
	type: SourcebookType.ThirdParty,
	ancestries: [
		AncestryData.goblinSquad,
		AncestryData.psiBorg
	],
	careers: [],
	complications: [],
	cultures: [],
	classes: [],
	domains: [],
	imbuements: [],
	items: [
		BlacksmithItemData.abundanceOfLoveAndReticence,
		BlacksmithItemData.braidedDecay,
		BlacksmithItemData.darkStarPlate,
		BlacksmithItemData.shiftingTides,
		BlacksmithItemData.siegeEnder,
		BlacksmithItemData.titanShield,
		BlacksmithItemData.wingedSandals,
		// Psi-Borg Implants
		BlacksmithItemData.arachnianImplants,
		BlacksmithItemData.internalSuspension,
		BlacksmithItemData.opticalMoteFocuser,
		BlacksmithItemData.psionicBackup
	],
	kits: [
		KitData.barnacle,
		KitData.condor,
		KitData.eagle,
		KitData.juggernaut,
		KitData.mauler,
		KitData.sunWukong,
		KitData.swift
	],
	monsterGroups: [],
	perks: [],
	projects: [
		installImplant
	],
	subclasses: [],
	terrain: [],
	titles: [],
	skills: [],
	languages: []
};
