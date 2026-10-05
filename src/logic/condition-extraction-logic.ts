import { ConditionEndType, ConditionType } from '@/enums/condition-type';
import { Feature, FeaturePackageContent } from '@/models/feature';
import { Ability } from '@/models/ability';
import { Collections } from '@/utils/collections';
import { ConditionLogic } from '@/logic/condition-logic';
import { DamageType } from '@/enums/damage-type';
import { Element } from '@/models/element';
import { Encounter } from '@/models/encounter';
import { EncounterLogic } from '@/logic/encounter-logic';
import { FeatureType } from '@/enums/feature-type';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterLogic } from '@/logic/monster-logic';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';

export interface ExtractedCondition {
	name: string;
	rules: string;
	ends: ConditionEndType;
	owner: string;
	abilities: string[];
	related: string[];
}

// A named block of rules text: an ability, a feature, or a monster group information entry
interface TextUnit {
	id: string;
	name: string;
	texts: string[];
	extras: { name: string, text: string }[];
	trigger: string;
}

const standardConditions = Object.values(ConditionType)
	.filter(c => (c !== ConditionType.Custom) && (c !== ConditionType.Quick))
	.map(c => c.toLowerCase());
const damageWords = [ ...Object.values(DamageType).map(d => d.toLowerCase()), 'damage' ];
const stopWords = (
	'the a an and or of to by it they them their target targets is are be can can’t can\'t takes take has have gains gain '
	+ 'loses lose makes make with while each any this that who which your you ends until end turn not no on in at from as '
	+ 'for its creature creatures enemy enemies ally allies object objects into through also either instead then now still'
).split(' ');
const excludedWords = 'keywords keyword features feature condition additionally moved halved'.split(' ');

export class ConditionExtractionLogic {
	static getConditionsForMonster = (monster: Monster, group: MonsterGroup | null) => {
		const units = ConditionExtractionLogic.getMonsterUnits(monster);
		const groupUnits = group ? ConditionExtractionLogic.getGroupUnits(group, monster.id) : [];
		return ConditionExtractionLogic.extract(units, [ units, groupUnits ], monster.name);
	};

	static getConditionsForHero = (hero: Hero, sourcebooks: Sourcebook[]) => {
		const owner = hero.name || 'Unnamed Hero';

		// Retinue monsters are extracted as monsters in their own right
		const retinue = [
			...HeroLogic.getCompanions(hero),
			...HeroLogic.getRetainers(hero),
			...HeroLogic.getSummons(hero).map(s => s.monster)
		];
		const retinueIDs = retinue.flatMap(m => ConditionExtractionLogic.getMonsterUnits(m)).map(u => u.id);

		const features = HeroLogic.getFeatures(hero).map(f => f.feature);
		const packages = features.filter((f): f is FeaturePackageContent => f.type === FeatureType.PackageContent);
		const abilityUnits = HeroLogic.getAbilities(hero, sourcebooks, [])
			.map(a => a.ability)
			.filter(a => !retinueIDs.includes(a.id))
			.map(a => ConditionExtractionLogic.getAbilityUnit(a, packages));
		const featureUnits = features
			.filter(f => (f.type !== FeatureType.Ability) && (f.type !== FeatureType.PackageContent))
			.flatMap(ConditionExtractionLogic.getFeatureUnits);
		const units = [ ...abilityUnits, ...featureUnits ];

		const conditions = ConditionExtractionLogic.extract(units, [ units ], owner);
		conditions.forEach(c => {
			const word = ConditionExtractionLogic.getWordRegex(c.name);
			c.related = abilityUnits
				.filter(u => !c.abilities.includes(u.name))
				.filter(u => word.test(u.trigger) || ConditionExtractionLogic.getAllTexts(u).some(t => word.test(t)))
				.map(u => u.name);
		});

		retinue.forEach(m => conditions.push(...ConditionExtractionLogic.getConditionsForMonster(m, null)));

		return ConditionExtractionLogic.merge(conditions);
	};

	static getConditionsForEncounter = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		const conditions: ExtractedCondition[] = [];

		Collections.distinct(encounter.groups.flatMap(g => g.slots).map(s => s.monsterID), id => id)
			.forEach(id => {
				const monster = SourcebookLogic.getMonster(sourcebooks, id);
				if (monster) {
					conditions.push(...ConditionExtractionLogic.getConditionsForMonster(monster, SourcebookLogic.getMonsterGroup(sourcebooks, id)));
				}
			});

		EncounterLogic.getMonsterGroups(encounter, sourcebooks).forEach(group => {
			const units = group.malice.flatMap(ConditionExtractionLogic.getFeatureUnits);
			conditions.push(...ConditionExtractionLogic.extract(units, [ units, ConditionExtractionLogic.getGroupUnits(group, null) ], group.name));
		});

		const terrains = SourcebookLogic.getTerrains(sourcebooks);
		encounter.terrain.forEach(slot => {
			const terrain = terrains.find(t => t.id === slot.terrainID);
			if (terrain) {
				const units = [
					...terrain.sections,
					...terrain.upgrades.filter(u => slot.upgradeIDs.includes(u.id)).flatMap(u => u.sections)
				]
					.flatMap(s => s.content)
					.flatMap(ConditionExtractionLogic.getFeatureUnits);
				conditions.push(...ConditionExtractionLogic.extract(units, [ units ], terrain.name));
			}
		});

		encounter.heroes.forEach(hero => conditions.push(...ConditionExtractionLogic.getConditionsForHero(hero, sourcebooks)));

		return ConditionExtractionLogic.merge(conditions);
	};

	// Initial-state conditions that came from something which is no longer in the encounter
	static getStaleConditions = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		const current = ConditionExtractionLogic.getConditionsForEncounter(encounter, sourcebooks);
		const stale: { monster: string, condition: string, owner: string }[] = [];

		encounter.groups.flatMap(g => g.slots).forEach(slot => {
			slot.customization.conditions.forEach(condition => {
				const source = ConditionLogic.getSource(condition);
				if (source && !current.some(c => (c.name === source.name) && (c.owner === source.owner))) {
					stale.push({
						monster: SourcebookLogic.getMonster(sourcebooks, slot.monsterID)?.name || 'Unknown monster',
						condition: source.name,
						owner: source.owner
					});
				}
			});
		});

		return stale;
	};

	// #region Text units

	private static getAbilityUnit = (ability: Ability, packages: FeaturePackageContent[] = []): TextUnit => {
		const texts: string[] = [];
		const extras: { name: string, text: string }[] = [];

		ability.sections.forEach(section => {
			switch (section.type) {
				case 'text':
					texts.push(section.text);
					break;
				case 'field':
					texts.push(section.effect);
					break;
				case 'roll':
					texts.push(section.roll.tier1, section.roll.tier2, section.roll.tier3);
					break;
				case 'package':
					packages
						.filter(f => f.data.tag === section.tag)
						.forEach(f => extras.push({ name: f.name, text: f.description }));
					break;
			}
		});

		return {
			id: ability.id,
			name: ability.name,
			texts: texts.filter(t => !!t),
			extras: extras,
			trigger: ability.type.trigger
		};
	};

	private static getFeatureUnits = (feature: Feature): TextUnit[] => {
		switch (feature.type) {
			case FeatureType.Ability:
			case FeatureType.MaliceAbility:
				return [ ConditionExtractionLogic.getAbilityUnit(feature.data.ability) ];
			case FeatureType.Malice:
				return [ {
					id: feature.id,
					name: feature.name,
					texts: [
						feature.description,
						...feature.data.sections.flatMap(s => typeof s === 'string' ? [ s ] : [ s.tier1, s.tier2, s.tier3 ])
					].filter(t => !!t),
					extras: [],
					trigger: ''
				} ];
			case FeatureType.Multiple:
				return feature.data.features.flatMap(ConditionExtractionLogic.getFeatureUnits);
		}

		return feature.description ? [ ConditionExtractionLogic.getElementUnit(feature) ] : [];
	};

	private static getElementUnit = (element: Element): TextUnit => {
		return {
			id: element.id,
			name: element.name,
			texts: [ element.description ],
			extras: [],
			trigger: ''
		};
	};

	private static getMonsterUnits = (monster: Monster) => {
		return MonsterLogic.getFeatures(monster).flatMap(ConditionExtractionLogic.getFeatureUnits);
	};

	private static getGroupUnits = (group: MonsterGroup, excludeMonsterID: string | null) => {
		return [
			...group.information.map(ConditionExtractionLogic.getElementUnit),
			...group.malice.flatMap(ConditionExtractionLogic.getFeatureUnits),
			...group.monsters.filter(m => m.id !== excludeMonsterID).flatMap(ConditionExtractionLogic.getMonsterUnits)
		];
	};

	private static getAllTexts = (unit: TextUnit) => {
		return [ ...unit.texts, ...unit.extras.map(e => e.text) ];
	};

	// #endregion

	// #region Extraction

	private static extract = (units: TextUnit[], scopes: TextUnit[][], owner: string) => {
		const conditions: ExtractedCondition[] = [];

		units.forEach(unit => {
			ConditionExtractionLogic.getApplications(unit).forEach(application => {
				const rules = ConditionExtractionLogic.getRules(application.name, unit, scopes);
				if (!rules) {
					return;
				}

				const name = `${application.name[0].toUpperCase()}${application.name.substring(1)}`;
				const existing = conditions.find(c => (c.name === name) && (c.rules === rules));
				if (existing) {
					if (!existing.abilities.includes(unit.name)) {
						existing.abilities.push(unit.name);
					}
				} else {
					conditions.push({
						name: name,
						rules: rules,
						ends: application.ends,
						owner: owner,
						abilities: [ unit.name ],
						related: []
					});
				}
			});
		});

		return conditions;
	};

	private static getApplications = (unit: TextUnit) => {
		const applications: { name: string, ends: ConditionEndType }[] = [];

		ConditionExtractionLogic.getAllTexts(unit).forEach(text => {
			for (const match of text.matchAll(/\((?:save ends|EoT)\)|\buntil the end of (?:the|their|its|your|that) (?:encounter|next turn|turn|round)\b/gi)) {
				const clause = (text.substring(0, match.index).split(/[;.:`(]|\]|\b[MARIP]\s*<\s*\S+/).pop() || '')
					.trim()
					.replace(/\s+by (?:you|them|the [\w’'-]+|any [\w’'-]+(?: [\w’'-]+)?)$/i, '')
					.replace(/^.*\b(?:is|are|becomes?|goes)\s+/i, '');

				clause.split(/,\s*|\s+and\s+|\s+or\s+/)
					.map(token => token.trim().replace(/^[*_]+|[*_]+$/g, '').toLowerCase())
					.filter(ConditionExtractionLogic.isCandidate)
					.filter(name => !applications.some(a => a.name === name))
					.forEach(name => applications.push({ name: name, ends: ConditionExtractionLogic.getEndType(match[0]) }));
			}
		});

		return applications;
	};

	private static isCandidate = (token: string) => {
		if (!/^[a-z’'-]+(?: [a-z’'-]+){0,2}$/.test(token)) {
			return false;
		}

		const words = token.split(' ');
		const first = words[0];
		const last = words[words.length - 1];
		if (standardConditions.includes(first) || standardConditions.includes(last)) {
			return false;
		}
		if (stopWords.includes(first) || stopWords.includes(last)) {
			return false;
		}
		return !words.some(w => damageWords.includes(w) || excludedWords.includes(w));
	};

	private static getEndType = (ender: string) => {
		if (/save ends/i.test(ender)) {
			return ConditionEndType.SaveEnds;
		}
		if (/EoT|turn/i.test(ender)) {
			return ConditionEndType.EndOfTurn;
		}
		return ConditionEndType.UntilRemoved;
	};

	private static getRules = (name: string, unit: TextUnit, scopes: TextUnit[][]): string | null => {
		const word = ConditionExtractionLogic.getWordRegex(name);
		const candidates = [ unit, ...scopes.flat() ];

		// An explicit reference, such as "(see Stoned)", in a sentence that mentions the condition
		const references = ConditionExtractionLogic.getAllTexts(unit)
			.flatMap(ConditionExtractionLogic.getSentences)
			.filter(s => word.test(s))
			.flatMap(s => [ ...s.matchAll(/\b[Ss]ee ([A-Z][\w’' ]+?)\)?[.)]/g) ].map(m => m[1].toLowerCase()));
		for (const reference of references) {
			const target = candidates.find(u => (u !== unit) && (u.name.toLowerCase() === reference));
			if (target) {
				if (reference === name) {
					// If the referenced unit applies the condition itself, use the rules it would have
					const applies = ConditionExtractionLogic.getApplications(target).some(a => a.name === name);
					return (applies ? ConditionExtractionLogic.getRules(name, target, []) : null) || target.texts.join('\n\n');
				}
				const shaped = ConditionExtractionLogic.getDefinitions(name, ConditionExtractionLogic.getAllTexts(target));
				return shaped.length > 0 ? shaped.join(' ') : target.texts.join('\n\n');
			}
		}

		// A section that opens by applying the condition, and goes on to explain it
		for (const text of unit.texts) {
			const first = ConditionExtractionLogic.getSentences(text)[0] || '';
			const mentions = text.match(ConditionExtractionLogic.getWordRegex(name, 'gi')) || [];
			if (word.test(first) && /\((?:save ends|EoT)\)|\buntil the end of\b/i.test(first) && (mentions.length >= 3)) {
				return [
					text.trim(),
					...unit.extras.filter(e => word.test(e.text)).map(e => `**${e.name}:** ${e.text}`)
				].join('\n\n');
			}
		}

		// Definitions in the same ability
		const definitions = ConditionExtractionLogic.getDefinitions(name, ConditionExtractionLogic.getAllTexts(unit));
		if (definitions.length > 0) {
			return definitions.join(' ');
		}

		// Definitions elsewhere, nearest scope first
		for (const scope of scopes) {
			const others = scope.filter(u => u !== unit);

			const named = others.find(u => u.name.toLowerCase() === name);
			if (named) {
				return named.texts.join('\n\n');
			}

			for (const other of others) {
				const shaped = ConditionExtractionLogic.getDefinitions(name, ConditionExtractionLogic.getAllTexts(other));
				if (shaped.length > 0) {
					return shaped.join(' ');
				}
			}
		}

		return null;
	};

	// Sentences shaped like a definition: "A hexed target...", "While charmed this way...", and so on
	private static getDefinitions = (name: string, texts: string[]) => {
		const n = ConditionExtractionLogic.escape(name);
		const regex = new RegExp(`^(?:[*-]\\s*)?(?:an? ${n}\\b|while (?:a |the )?(?:creature |target )?(?:is )?${n}\\b|each (?:creature |target )?${n}\\b|${n} (?:creatures|targets)\\b|an? (?:creature|target) ${n}\\b)`, 'i');
		return Collections.distinct(
			texts.flatMap(ConditionExtractionLogic.getSentences).filter(s => regex.test(s)),
			s => s
		);
	};

	private static getSentences = (text: string) => {
		return text
			.split(/(?<=[.!?])\s+|\n+/)
			.map(s => s.trim())
			.filter(s => s.length > 0);
	};

	private static getWordRegex = (name: string, flags = 'i') => {
		return new RegExp(`\\b${ConditionExtractionLogic.escape(name)}\\b`, flags);
	};

	private static escape = (text: string) => {
		return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	};

	private static merge = (conditions: ExtractedCondition[]) => {
		const merged: ExtractedCondition[] = [];

		conditions.forEach(c => {
			const existing = merged.find(m => (m.owner === c.owner) && (m.name === c.name) && (m.rules === c.rules));
			if (existing) {
				c.abilities.filter(a => !existing.abilities.includes(a)).forEach(a => existing.abilities.push(a));
				c.related.filter(a => !existing.related.includes(a)).forEach(a => existing.related.push(a));
			} else {
				merged.push(c);
			}
		});

		return merged;
	};

	// #endregion
}
