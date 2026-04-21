import { Collections } from '@/utils/collections';
import { FactoryLogic } from '@/logic/factory-logic';
import { Pregen } from '@/models/pregen';

const dwarfFuryPregen: Pregen = {
	id: 'AkKRH-90Rou-1f2K7-yHZqO-eLUJM-Q1Dll',
	name: 'Keth',
	description: 'Level 1 Dwarf Fury',
	sourcebookIDs: [ '', 'orden' ],
	ancestryID: 'ancestry-dwarf',
	cultureID: 'culture-dwarf',
	careerID: 'career-warden',
	classID: 'class-fury',
	complicationID: null,
	incitingIncidentID: 'career-warden-ii-4',
	level: 1,
	characteristics: FactoryLogic.createCharacteristics(2, 2, -1, 1, 1),
	selectedSubclassIDs: [
		'fury-sub-1'
	],
	featureSelections: [
		{
			featureID: 'fury-1-5',
			selections: [
				'fury-ability-1'
			]
		},
		{
			featureID: 'fury-1-6',
			selections: [
				'fury-ability-5'
			]
		},
		{
			featureID: 'fury-1-7',
			selections: [
				'fury-ability-9'
			]
		},
		{
			featureID: 'org-bureaucratic',
			selections: [
				'Intimidate'
			]
		},
		{
			featureID: 'up-creative',
			selections: [
				'Blacksmithing'
			]
		},
		{
			featureID: 'default-language',
			selections: [
				'Caelian'
			]
		},
		{
			featureID: 'dwarf-feature-2',
			selections: [
				'dwarf-feature-2-1',
				'dwarf-feature-2-5'
			]
		},
		{
			featureID: 'fury-1-2',
			selections: [
				'Jump',
				'Navigate'
			]
		},
		{
			featureID: 'career-warden-feature-6',
			selections: [
				'perk-brawny'
			]
		},
		{
			featureID: 'career-warden-feature-2',
			selections: [
				'Climb'
			]
		},
		{
			featureID: 'fury-sub-1-1-1',
			selections: [
				'Lift'
			]
		},
		{
			featureID: 'career-warden-feature-3',
			selections: [
				'Alertness'
			]
		},
		{
			featureID: 'fury-sub-1-1-2',
			selections: [
				'kit-panther'
			]
		},
		{
			featureID: 'culture-language',
			selections: [
				'Zaliac'
			]
		},
		{
			featureID: 'career-warden-feature-4',
			selections: [
				'Vaslorian'
			]
		},
		{
			featureID: 'career-warden-feature-1',
			selections: [
				'Track'
			]
		},
		{
			featureID: 'fury-1-1',
			selections: [
				'Nature'
			]
		},
		{
			featureID: 'env-secluded',
			selections: [
				'Brag'
			]
		}
	]
};

const highElfTacticianPregen: Pregen = {
	id: 's7NJS-H09JA-pUTrY-d9Yni-BhYHn-IQCPL',
	name: 'The Earth Cries The Skies Divide',
	description: 'Level 1 Elf (high) Tactician',
	sourcebookIDs: [ '', 'orden' ],
	ancestryID: 'ancestry-high-elf',
	cultureID: 'culture-high-elf',
	careerID: 'career-soldier',
	classID: 'class-tactician',
	complicationID: null,
	incitingIncidentID: 'career-soldier-ii-4',
	level: 1,
	characteristics: FactoryLogic.createCharacteristics(2, 1, 2, -1, 1),
	selectedSubclassIDs: [
		'tactician-sub-3'
	],
	featureSelections: [
		{
			featureID: 'tactician-1-7',
			selections: [
				'tactician-ability-2'
			]
		},
		{
			featureID: 'tactician-1-8',
			selections: [
				'tactician-ability-7'
			]
		},
		{
			featureID: 'org-bureaucratic',
			selections: [
				'Flirt'
			]
		},
		{
			featureID: 'default-language',
			selections: [
				'Caelian'
			]
		},
		{
			featureID: 'career-soldier-feature-5',
			selections: [
				'perk-put-your-back-into-it'
			]
		},
		{
			featureID: 'career-soldier-feature-1',
			selections: [
				'Endurance'
			]
		},
		{
			featureID: 'tactician-1-4',
			selections: [
				'kit-shining-armor',
				'kit-rapid-fire'
			]
		},
		{
			featureID: 'high-elf-feature-2',
			selections: [
				'high-elf-feature-2-2',
				'high-elf-feature-2-4'
			]
		},
		{
			featureID: 'tactician-1-1',
			selections: [
				'Lead'
			]
		},
		{
			featureID: 'tactician-sub-3-1-1',
			selections: [
				'Intimidate'
			]
		},
		{
			featureID: 'career-soldier-feature-2',
			selections: [
				'Alertness'
			]
		},
		{
			featureID: 'culture-language',
			selections: [
				'Hyrallic'
			]
		},
		{
			featureID: 'career-soldier-feature-3',
			selections: [
				'Szetch',
				'Vaslorian'
			]
		},
		{
			featureID: 'up-martial',
			selections: [
				'Strategy'
			]
		},
		{
			featureID: 'env-secluded',
			selections: [
				'Persuade'
			]
		},
		{
			featureID: 'tactician-1-2',
			selections: [
				'Search',
				'Monsters'
			]
		}
	]
};

const humanCensorPregen: Pregen = {
	id: 'xD4WN-g9hyI-avTXz-mALVl-fl4HL-ENpgD',
	name: 'Jennet',
	description: 'Level 1 Human Censor',
	sourcebookIDs: [ '', 'orden' ],
	ancestryID: 'ancestry-human',
	cultureID: 'culture-human',
	careerID: 'career-watch-officer',
	classID: 'class-censor',
	complicationID: null,
	incitingIncidentID: 'career-watch-officer-ii-1',
	level: 1,
	characteristics: FactoryLogic.createCharacteristics(2, -1, 1, 1, 2),
	selectedSubclassIDs: [
		'censor-sub-3'
	],
	featureSelections: [
		{
			featureID: 'censor-1-8',
			selections: [
				'censor-ability-4'
			]
		},
		{
			featureID: 'censor-1-9',
			selections: [
				'censor-ability-7'
			]
		},
		{
			featureID: 'censor-1-10',
			selections: [
				'censor-ability-9'
			]
		},
		{
			featureID: 'org-communal',
			selections: [
				'Climb'
			]
		},
		{
			featureID: 'default-language',
			selections: [
				'Caelian'
			]
		},
		{
			featureID: 'censor-1-2',
			selections: [
				'domain-war'
			]
		},
		{
			featureID: 'censor-1-7',
			selections: [
				'domain-war-1'
			]
		},
		{
			featureID: 'career-watch-officer-feature-4',
			selections: [
				'perk-team-leader'
			]
		},
		{
			featureID: 'domain-war-1-2',
			selections: [
				'Jump'
			]
		},
		{
			featureID: 'human-feature-2',
			selections: [
				'human-feature-2-3',
				'human-feature-2-5'
			]
		},
		{
			featureID: 'censor-1-1',
			selections: [
				'Read Person',
				'Religion'
			]
		},
		{
			featureID: 'censor-sub-3-1-1',
			selections: [
				'Interrogate'
			]
		},
		{
			featureID: 'career-watch-officer-feature-1',
			selections: [
				'Alertness'
			]
		},
		{
			featureID: 'career-watch-officer-feature-2',
			selections: [
				'Search',
				'Lift'
			]
		},
		{
			featureID: 'censor-1-5',
			selections: [
				'kit-mountain'
			]
		},
		{
			featureID: 'up-labor',
			selections: [
				'Endurance'
			]
		},
		{
			featureID: 'culture-language',
			selections: [
				'Vaslorian'
			]
		},
		{
			featureID: 'career-watch-officer-feature-3',
			selections: [
				'Szetch',
				'Zaliac'
			]
		},
		{
			featureID: 'env-urban',
			selections: [
				'Intimidate'
			]
		}
	]
};

const humanNullPregen: Pregen = {
	id: 'uZsUf-WAKiH-uoY6z-7TDMk-JTK72-8Pu38',
	name: 'Ashley',
	description: 'Level 1 Human Null',
	sourcebookIDs: [ '', 'orden' ],
	ancestryID: 'ancestry-human',
	cultureID: 'culture-bespoke-culture',
	careerID: 'career-farmer',
	classID: 'class-null',
	complicationID: null,
	incitingIncidentID: 'career-farmer-ii-5',
	level: 1,
	characteristics: FactoryLogic.createCharacteristics(1, 2, 0, 2, 0),
	selectedSubclassIDs: [
		'null-sub-3'
	],
	featureSelections: [
		{
			featureID: 'null-1-9',
			selections: [
				'null-ability-2',
				'null-ability-3'
			]
		},
		{
			featureID: 'null-1-10',
			selections: [
				'null-ability-12'
			]
		},
		{
			featureID: 'null-1-11',
			selections: [
				'null-ability-16'
			]
		},
		{
			featureID: 'org-communal',
			selections: [
				'Read Person'
			]
		},
		{
			featureID: 'default-language',
			selections: [
				'Caelian'
			]
		},
		{
			featureID: 'career-farmer-feature-5',
			selections: [
				'perk-monster-whisperer'
			]
		},
		{
			featureID: 'null-sub-3-1-1',
			selections: [
				'Climb'
			]
		},
		{
			featureID: 'career-farmer-feature-2',
			selections: [
				'Jump',
				'Alertness'
			]
		},
		{
			featureID: 'human-feature-2',
			selections: [
				'human-feature-2-5',
				'human-feature-2-2'
			]
		},
		{
			featureID: 'null-1-2',
			selections: [
				'Persuade',
				'Timescape'
			]
		},
		{
			featureID: 'career-farmer-feature-1',
			selections: [
				'Handle Animals'
			]
		},
		{
			featureID: 'up-labor',
			selections: [
				'Endurance'
			]
		},
		{
			featureID: 'culture-language',
			selections: [
				'Kalliak'
			]
		},
		{
			featureID: 'career-farmer-feature-3',
			selections: [
				'Vaslorian'
			]
		},
		{
			featureID: 'null-1-1',
			selections: [
				'Psionics'
			]
		},
		{
			featureID: 'null-1-7',
			selections: [
				'null-1-7a'
			]
		},
		{
			featureID: 'env-secluded',
			selections: [
				'Empathize'
			]
		}
	]
};

const humanTalentPregen: Pregen = {
	id: 'wt04z-EkqhA-sY1I9-Dw5wU-bpqHl-aYq9E',
	name: 'Garrick',
	description: 'Level 1 Human Talent',
	sourcebookIDs: [ '', 'orden' ],
	ancestryID: 'ancestry-human',
	cultureID: 'culture-monastic-order',
	careerID: 'career-agent',
	classID: 'class-talent',
	complicationID: null,
	incitingIncidentID: 'career-agent-ii-1',
	level: 1,
	characteristics: FactoryLogic.createCharacteristics(-1, 1, 2, 1, 2),
	selectedSubclassIDs: [
		'talent-sub-3'
	],
	featureSelections: [
		{
			featureID: 'talent-1-7',
			selections: [
				'talent-ability-4',
				'talent-ability-5'
			]
		},
		{
			featureID: 'talent-1-8',
			selections: [
				'talent-ability-9'
			]
		},
		{
			featureID: 'talent-1-9',
			selections: [
				'talent-ability-13'
			]
		},
		{
			featureID: 'up-academic',
			selections: [
				'Magic'
			]
		},
		{
			featureID: 'org-bureaucratic',
			selections: [
				'Disguise'
			]
		},
		{
			featureID: 'default-language',
			selections: [
				'Caelian'
			]
		},
		{
			featureID: 'human-feature-2',
			selections: [
				'human-feature-2-3',
				'human-feature-2-5'
			]
		},
		{
			featureID: 'talent-skill-c',
			selections: [
				'Timescape',
				'Lie'
			]
		},
		{
			featureID: 'career-agent-feature-2',
			selections: [
				'Persuade'
			]
		},
		{
			featureID: 'talent-skill-b',
			selections: [
				'Read Person'
			]
		},
		{
			featureID: 'career-agent-feature-5',
			selections: [
				'perk-forgettable-face'
			]
		},
		{
			featureID: 'career-agent-feature-1',
			selections: [
				'Sneak'
			]
		},
		{
			featureID: 'career-agent-feature-3',
			selections: [
				'Search'
			]
		},
		{
			featureID: 'culture-language',
			selections: [
				'Hyrallic'
			]
		},
		{
			featureID: 'talent-1-3',
			selections: [
				'Mindspeech'
			]
		},
		{
			featureID: 'career-agent-feature-4',
			selections: [
				'Vaslorian',
				'Yllyric'
			]
		},
		{
			featureID: 'talent-skill-a',
			selections: [
				'Psionics'
			]
		},
		{
			featureID: 'talent-1-5',
			selections: [
				'talent-1-5c'
			]
		},
		{
			featureID: 'env-secluded',
			selections: [
				'Empathize'
			]
		},
		{
			featureID: 'talent-1-6',
			selections: [
				'talent-1-6b'
			]
		}
	]
};

const orcConduitPregen: Pregen = {
	id: 'PZcgI-IA0LT-qprwH-9FNCX-IhUdq-40QkW',
	name: 'Khettovek',
	description: 'Level 1 Orc Conduit',
	sourcebookIDs: [ '', 'orden' ],
	ancestryID: 'ancestry-orc',
	cultureID: 'culture-bespoke-culture',
	careerID: 'career-disciple',
	classID: 'class-conduit',
	complicationID: null,
	incitingIncidentID: 'career-disciple-ii-5',
	level: 1,
	characteristics: FactoryLogic.createCharacteristics(1, -1, 1, 2, 2),
	selectedSubclassIDs: [],
	featureSelections: [
		{
			featureID: 'conduit-1-4',
			selections: [
				'domain-life-1'
			]
		},
		{
			featureID: 'conduit-1-10',
			selections: [
				'conduit-ability-1',
				'conduit-ability-2'
			]
		},
		{
			featureID: 'conduit-1-11',
			selections: [
				'conduit-ability-11'
			]
		},
		{
			featureID: 'conduit-1-12',
			selections: [
				'conduit-ability-15'
			]
		},
		{
			featureID: 'org-communal',
			selections: [
				'Jump'
			]
		},
		{
			featureID: 'conduit-1-9',
			selections: [
				'conduit-1-9a'
			]
		},
		{
			featureID: 'up-creative',
			selections: [
				'Perform'
			]
		},
		{
			featureID: 'default-language',
			selections: [
				'Caelian'
			]
		},
		{
			featureID: 'conduit-1-2',
			selections: [
				'domain-life',
				'domain-sun'
			]
		},
		{
			featureID: 'domain-life-1-2',
			selections: [
				'Endurance'
			]
		},
		{
			featureID: 'conduit-1-1',
			selections: [
				'Persuade',
				'Read Person'
			]
		},
		{
			featureID: 'culture-language',
			selections: [
				'Kalliak'
			]
		},
		{
			featureID: 'career-disciple-feature-1',
			selections: [
				'Religion'
			]
		},
		{
			featureID: 'career-disciple-feature-2',
			selections: [
				'Magic',
				'Culture'
			]
		},
		{
			featureID: 'orc-feature-2',
			selections: [
				'orc-feature-2-5',
				'orc-feature-2-2'
			]
		},
		{
			featureID: 'conduit-1-8',
			selections: [
				'conduit-1-8b'
			]
		},
		{
			featureID: 'career-disciple-feature-4',
			selections: [
				'perk-ritualist'
			]
		},
		{
			featureID: 'conduit-1-7',
			selections: [
				'conduit-1-7a'
			]
		},
		{
			featureID: 'env-wilderness',
			selections: [
				'Climb'
			]
		}
	]
};

const polderElementalistPregen: Pregen = {
	id: 'YDBa2-Y6Kem-6pMRx-cMn3c-DYNI8-S9sOb',
	name: 'Bethell',
	description: 'Level 1 Polder Elementalist',
	sourcebookIDs: [ '', 'orden' ],
	ancestryID: 'ancestry-polder',
	cultureID: 'culture-polder',
	careerID: 'career-mages-apprentice',
	classID: 'class-elementalist',
	complicationID: null,
	incitingIncidentID: 'career-mages-apprentice-ii-1',
	level: 1,
	characteristics: FactoryLogic.createCharacteristics(-1, 1, 2, 2, 1),
	selectedSubclassIDs: [
		'elementalist-sub-2'
	],
	featureSelections: [
		{
			featureID: 'elementalist-1-9',
			selections: [
				'elementalist-ability-2',
				'elementalist-ability-8'
			]
		},
		{
			featureID: 'elementalist-1-10',
			selections: [
				'elementalist-ability-10'
			]
		},
		{
			featureID: 'elementalist-1-11',
			selections: [
				'elementalist-ability-13'
			]
		},
		{
			featureID: 'org-communal',
			selections: [
				'Gymnastics'
			]
		},
		{
			featureID: 'elementalist-1-2',
			selections: [
				'Blacksmithing',
				'Tailoring',
				'Alchemy'
			]
		},
		{
			featureID: 'up-creative',
			selections: [
				'Empathize'
			]
		},
		{
			featureID: 'default-language',
			selections: [
				'Caelian'
			]
		},
		{
			featureID: 'elementalist-1-8',
			selections: [
				'elementalist-1-8a'
			]
		},
		{
			featureID: 'elementalist-1-7',
			selections: [
				'elementalist-1-7c'
			]
		},
		{
			featureID: 'culture-language',
			selections: [
				'Khoursirian'
			]
		},
		{
			featureID: 'mages-apprentice-feature-3',
			selections: [
				'The First Language'
			]
		},
		{
			featureID: 'mages-apprentice-feature-1',
			selections: [
				'History'
			]
		},
		{
			featureID: 'elementalist-1-1',
			selections: [
				'Magic'
			]
		},
		{
			featureID: 'mages-apprentice-feature-2',
			selections: [
				'Monsters',
				'Timescape'
			]
		},
		{
			featureID: 'polder-feature-3',
			selections: [
				'polder-feature-3-5',
				'polder-feature-3-2',
				'polder-feature-3-1'
			]
		},
		{
			featureID: 'mages-apprentice-feature-5',
			selections: [
				'perk-arcane-trick'
			]
		},
		{
			featureID: 'env-urban',
			selections: [
				'Alertness'
			]
		}
	]
};

const polderShadowPregen: Pregen = {
	id: 'nZOww-Rv9L6-gzX61-UYLIJ-PlpcB-mTXKs',
	name: 'Bellamy',
	description: 'Level 1 Polder Shadow',
	sourcebookIDs: [ '', 'orden' ],
	ancestryID: 'ancestry-polder',
	cultureID: 'culture-polder',
	careerID: 'career-criminal',
	classID: 'class-shadow',
	complicationID: null,
	incitingIncidentID: 'career-criminal-ii-6',
	level: 1,
	characteristics: FactoryLogic.createCharacteristics(-1, 2, 2, 1, 1),
	selectedSubclassIDs: [
		'shadow-sub-1'
	],
	featureSelections: [
		{
			featureID: 'shadow-1-6',
			selections: [
				'shadow-ability-2'
			]
		},
		{
			featureID: 'shadow-1-7',
			selections: [
				'shadow-ability-8'
			]
		},
		{
			featureID: 'shadow-1-8',
			selections: [
				'shadow-ability-9'
			]
		},
		{
			featureID: 'org-communal',
			selections: [
				'Alchemy'
			]
		},
		{
			featureID: 'up-creative',
			selections: [
				'Forgery'
			]
		},
		{
			featureID: 'default-language',
			selections: [
				'Caelian'
			]
		},
		{
			featureID: 'career-criminal-feature-5',
			selections: [
				'perk-lucky-dog'
			]
		},
		{
			featureID: 'career-criminal-feature-2',
			selections: [
				'Pick Lock',
				'Pick Pocket'
			]
		},
		{
			featureID: 'shadow-1-1',
			selections: [
				'Hide',
				'Sneak'
			]
		},
		{
			featureID: 'shadow-1-5.5',
			selections: [
				'kit-cloak-and-dagger'
			]
		},
		{
			featureID: 'culture-language',
			selections: [
				'Khoursirian'
			]
		},
		{
			featureID: 'career-criminal-feature-3',
			selections: [
				'Szetch'
			]
		},
		{
			featureID: 'career-criminal-feature-1',
			selections: [
				'Criminal Underworld'
			]
		},
		{
			featureID: 'shadow-sub-1-1-1',
			selections: [
				'Magic'
			]
		},
		{
			featureID: 'polder-feature-3',
			selections: [
				'polder-feature-3-5',
				'polder-feature-3-1',
				'polder-feature-3-2'
			]
		},
		{
			featureID: 'shadow-1-3',
			selections: [
				'Alertness',
				'Flirt',
				'Gymnastics',
				'Jump',
				'Lie'
			]
		},
		{
			featureID: 'env-urban',
			selections: [
				'Conceal Object'
			]
		}
	]
};

const wodeElfTroubadourPregen: Pregen = {
	id: 'VSLoV-HXFkr-mMquU-5YLvW-CxLEm-4TIyG',
	name: 'Lliarion',
	description: 'Level 1 Elf (wode) Troubadour',
	sourcebookIDs: [ '', 'orden' ],
	ancestryID: 'ancestry-wode-elf',
	cultureID: 'culture-bespoke-culture',
	careerID: 'career-performer',
	classID: '9y3Jx3koKZipiPh1',
	complicationID: null,
	incitingIncidentID: 'career-performer-ii-6',
	level: 1,
	characteristics: FactoryLogic.createCharacteristics(1, 2, 1, -1, 2),
	selectedSubclassIDs: [
		'tWBfpTKQXZ12jGsU'
	],
	featureSelections: [
		{
			featureID: 'JEPrmTnFwNbi7kWO',
			selections: [
				'oklqgAHvGNBYvZ6Y'
			]
		},
		{
			featureID: 'cCfz5o1dUmzOYVPL',
			selections: [
				'48Ek5173XbbcaIuv'
			]
		},
		{
			featureID: 'smLIhr6BGJPZscJG',
			selections: [
				'MKhak5HyGbRZdhWy'
			]
		},
		{
			featureID: 'org-bureaucratic',
			selections: [
				'Sneak'
			]
		},
		{
			featureID: 'up-creative',
			selections: [
				'Music'
			]
		},
		{
			featureID: 'default-language',
			selections: [
				'Caelian'
			]
		},
		{
			featureID: 'performer-feature-4',
			selections: [
				'perk-harmonizer'
			]
		},
		{
			featureID: 'UH5m1URtvSjZqfQb',
			selections: [
				'Brag'
			]
		},
		{
			featureID: 'zVuRuelOOMRXxCgG',
			selections: [
				'Read Person'
			]
		},
		{
			featureID: 'performer-feature-2',
			selections: [
				'Rumors',
				'Society'
			]
		},
		{
			featureID: 'GjD2ZwdbvEIZOKQV',
			selections: [
				'Flirt',
				'Persuade'
			]
		},
		{
			featureID: 'WpHiobCwPhxC5q2g',
			selections: [
				'Hide'
			]
		},
		{
			featureID: '3rwc3gnUTZ6Ta7a0',
			selections: [
				'kit-swashbuckler'
			]
		},
		{
			featureID: 'culture-language',
			selections: [
				'Yllyric'
			]
		},
		{
			featureID: 'performer-feature-1',
			selections: [
				'Perform'
			]
		},
		{
			featureID: 'env-wilderness',
			selections: [
				'Gymnastics'
			]
		},
		{
			featureID: 'wode-elf-feature-2',
			selections: [
				'wode-elf-feature-2-4',
				'wode-elf-feature-2-3'
			]
		}
	]
};

export class PregenData {
	static getPregens(): Pregen[] {
		const list = [
			dwarfFuryPregen,
			highElfTacticianPregen,
			humanCensorPregen,
			humanNullPregen,
			humanTalentPregen,
			orcConduitPregen,
			polderElementalistPregen,
			polderShadowPregen,
			wodeElfTroubadourPregen
		];

		return Collections.sort(list, pregen => pregen.name);
	}
}
