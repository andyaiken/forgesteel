import { Ability, AbilitySectionField, AbilitySectionRoll, AbilitySectionText } from '@/models/ability';
import { ConditionEndType, ConditionType } from '@/enums/condition-type';
import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityUsage } from '@/enums/ability-usage';
import { Collections } from '@/utils/collections';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { PowerRoll } from '@/models/power-roll';

export interface EffectData {
	type: 'add-condition' | 'forced-movement' | 'granted-movement' | 'damage-modifier' | 'edge-or-bane' | 'resource-gain' | 'resource-loss' | 'free-strike' | 'spend-recovery' | 'stat-bonus' | 'damage-reduction' | 'other';
	when: 'always' | 'tier-2-3' | 'tier-3';
	potencyGated: boolean;
}

export interface ConditionEffectData extends EffectData {
	condition: ConditionType;
	duration: ConditionEndType;
}

export interface ForcedMovementEffectData extends EffectData {
	moveType: 'pull' | 'push' | 'slide';
	vertical: boolean;
	value: number;
}

export interface GrantedMovementEffectData extends EffectData {
	moveType: 'shift' | 'teleport' | 'move';
	value: number;
}

export interface DamageModifierEffectData extends EffectData {
	modifierType: DamageModifierType;
	value: number;
}

export interface EdgeOrBaneEffectData extends EffectData {
	modifier: 'edge' | 'bane';
	// 1 for a plain edge / bane, 2 for a 'double' edge / bane
	value: number;
}

export interface ResourceEffectData extends EffectData {
	resource: string;
	value: number;
}

// No fields beyond the shared ones - a granted free strike doesn't carry any extra data
export type FreeStrikeEffectData = EffectData;

export interface SpendRecoveryEffectData extends EffectData {
	value: number;
}

export interface StatBonusEffectData extends EffectData {
	stat: string;
	// Signed - negative for a penalty
	value: number;
}

export interface DamageReductionEffectData extends EffectData {
	// Fraction of damage removed - 0.5 for 'half damage', the only fraction seen in practice
	value: number;
}

export interface MiscEffectData extends EffectData {
	text: string;
}

export type AbilityEffect =
	ConditionEffectData |
	ForcedMovementEffectData |
	GrantedMovementEffectData |
	DamageModifierEffectData |
	EdgeOrBaneEffectData |
	ResourceEffectData |
	FreeStrikeEffectData |
	SpendRecoveryEffectData |
	StatBonusEffectData |
	DamageReductionEffectData |
	MiscEffectData;

export interface AbilityData {
	name: string;
	cost: 'signature' | number;
	action: AbilityUsage;
	usage: {
		type: 'melee' | 'ranged' | 'area';
		multipleTargets: boolean;
	};
	damage: number;
	effects: AbilityEffect[];
}

// 'budget' terms (cost / usage type) describe the points an ability of this shape is allotted;
// 'spend' terms (damage / effects) describe the price list those points are spent against
export interface CostModelTerm {
	label: string;
	role: 'budget' | 'spend';
	weight: number;
	support: number;
}

export interface CostModel {
	sampleSize: number;
	rSquared: number;
	intercept: number;
	terms: CostModelTerm[];
}

export interface AbilityBudget {
	cost: number | 'signature';
	// How much of that cost is attributed to the ability's usage type, rather than its content
	usageAdjustment: number;
	// What's left over for damage & effects to spend, once the usage adjustment is accounted for
	budget: number;
	// What the ability's actual damage & effects add up to, at the model's rates
	spend: number;
	// spend - budget - above 0 means the ability looks stronger than its cost & usage type budget
	// for, below 0 weaker. A signature / 0-cost ability has ~0 budget, so this (rather than a
	// spend / budget ratio, which blows up or flips sign as budget crosses zero) is what lets it
	// be compared on the same scale as a paid ability
	surplus: number;
}

type ParsedEffect =
	| { kind: 'condition'; condition: ConditionType; duration: ConditionEndType; potencyGated: boolean }
	| { kind: 'forced-movement'; moveType: 'pull' | 'push' | 'slide'; vertical: boolean; value: number; potencyGated: boolean }
	| { kind: 'granted-movement'; moveType: 'shift' | 'teleport' | 'move'; value: number; potencyGated: boolean }
	| { kind: 'damage-modifier'; modifierType: DamageModifierType; value: number; potencyGated: boolean }
	| { kind: 'edge-or-bane'; modifier: 'edge' | 'bane'; value: number; potencyGated: boolean }
	| { kind: 'resource'; resource: string; direction: 'gain' | 'loss'; value: number; potencyGated: boolean }
	| { kind: 'free-strike'; potencyGated: boolean }
	| { kind: 'spend-recovery'; value: number; potencyGated: boolean }
	| { kind: 'stat-bonus'; stat: string; value: number; potencyGated: boolean }
	| { kind: 'damage-reduction'; value: number; potencyGated: boolean }
	| { kind: 'other'; text: string; potencyGated: boolean };

const areaDistanceTypes = [
	AbilityDistanceType.Aura,
	AbilityDistanceType.Burst,
	AbilityDistanceType.Cube,
	AbilityDistanceType.Line,
	AbilityDistanceType.Wall
];

const conditionTypes = Object.values(ConditionType).filter(c => (c !== ConditionType.Custom) && (c !== ConditionType.Quick));
const conditionRegex = new RegExp(`\\b(${conditionTypes.join('|')})\\b`, 'gi');
// Potency checks are usually written against a placeholder ('[weak]' / '[average]' / '[strong]'),
// but monster / NPC-specific abilities often hard-code the actual threshold number instead (eg 'a<3')
const potencyRegex = /[MARIP]\s*[<>=]\s*(\[?(weak|average|avg|strong)\]?|\d+)/i;
const noEffectRegex = /^no effect\.?$/i;
const damageModifierRegex = /\b(weakness|immunity)\s+(\d+)/i;
const forcedMovementRegex = /(vertical\s+)?(pushed|pushes|push|pulled|pulls|pull|slides|slide|slid)\s+(\d+)/i;
const shiftRegex = /shift(?:s|ed)?\s+(?:up to\s+)?(\d+)/i;
const teleportRegex = /teleport[^.;]*?(\d+)\s*square/i;
// A word directly ahead of a '(save ends)' / '(EoT)' marker, or a bare 'is/are/becomes <word>' at the
// end of a clause, with no known condition name in it - almost always a homebrew / monster-specific
// status condition that isn't one of the core nine, so there's no way to know its name from text alone
const customConditionByDurationRegex = /[a-z]{3,}\s*\((?:save ends|eot|end of turn)\)\s*\.?\s*$/i;
const customConditionBareRegex = /\b(?:is|are|becomes)\s+[a-z]{3,}\s*\.?\s*$/i;
const edgeOrBaneRegex = /\b(?:gains?|takes?|has|have|with)\s+an?\s+(double\s+)?(edge|bane)\b/i;
const resourceRegex = /\b(gains?|loses?|lost)\s+(\d+)(?:d(\d+))?\s*(temporary stamina|surges?|rage|recoveries|recovery|malice)\b/i;
const freeStrikeRegex = /\bmakes?\s+an?\s+(?:melee\s+|ranged\s+)?free strike\b/i;
const spendRecoveryRegex = /\bspends?\s+(?:(\d+)|a|an|any number of)\s+recover(?:y|ies)\b/i;
// A single non-global copy (safe to call .test() on repeatedly) and a global copy (for matchAll
// sweeps over a whole ability's text) - reusing one 'g'-flagged regex across both would leave
// lastIndex in an inconsistent state between calls
const extraDamagePattern = '\\bextra\\s+(\\d+)(?:d(\\d+))?\\s*[a-z]*\\s*damage\\b';
const extraDamageRegex = new RegExp(extraDamagePattern, 'i');
const extraDamageGlobalRegex = new RegExp(extraDamagePattern, 'gi');

const forcedMovementVerbRegex = /(vertical\s+)?(pushed|pushes|push|pulled|pulls|pull|slides|slide|slid)\b/i;
const shiftVerbRegex = /\bshift(?:s|ed)?\b/i;
const teleportVerbRegex = /\bteleport(?:s|ed)?\b/i;
// Only the present tense ('move'/'moves') counts as a movement grant - the past tense almost
// always shows up as 'force moved' or 'is moved', which describes being on the receiving end of
// someone else's forced movement rather than being granted movement of your own
const moveRegex = /\bmoves?\s+(?:up to\s+)?(\d+)/i;
const moveVerbRegex = /\bmoves?\b/i;

const damageHalfRegex = /\b(?:half|halve|halves|halved)\b[^.;]{0,30}\bdamage\b|\bdamage\b[^.;]{0,30}\bhalved\b/i;

// Captures the sign from the 'bonus'/'penalty' word itself, not the +/- glyph in front of the
// number (some sources use a proper minus sign, not a hyphen) - and takes the stat name up to the
// next punctuation or temporal qualifier ('...bonus to speed until the end of their turn' should
// name the stat 'speed', not 'speed until the end of their turn')
const statBonusRegex = /[+−-]?\s*(\d+)\s+(bonus|penalty)\s+to\s+(?:the\s+)?([^.,;]+?)(?=[.,;]|\s+(?:until|for|during|while|and|instead)\b|$)/i;

const cleanStatName = (raw: string): string => {
	return raw
		.trim()
		.toLowerCase()
		.replace(/^(the|their|your|a|an)\s+/, '')
		.replace(/\s+score$/, '')
		.trim();
};

const characteristicNames = [ 'Might', 'Agility', 'Reason', 'Intuition', 'Presence' ];
// Movement phrased relative to a stat ('shifts up to their speed', 'push... equal to your Reason
// score') rather than a literal number can't be read off the text - a characteristic is assumed to
// be 3 (typical for an early-tier hero) and speed 6 (a common baseline), doubled / halved when the
// text itself says so
const variableDistanceRegex = new RegExp(`(twice\\s+|half\\s+)?(?:your|their|his|her)\\s+(?:(${characteristicNames.join('|')})\\s+score|speeds?)\\b`, 'i');

const getVariableDistanceValue = (match: RegExpMatchArray): number => {
	const base = match[2] ? 3 : 6;
	const modifier = match[1]?.trim().toLowerCase();
	if (modifier === 'twice') {
		return base * 2;
	}
	if (modifier === 'half') {
		return Math.max(1, Math.floor(base / 2));
	}
	return base;
};

const getUsageType = (ability: Ability): 'melee' | 'ranged' | 'area' => {
	const types = ability.distance.map(d => d.type);

	if (types.some(t => areaDistanceTypes.includes(t))) {
		return 'area';
	}

	if (types.includes(AbilityDistanceType.Ranged)) {
		return 'ranged';
	}

	return 'melee';
};

const getMultipleTargets = (ability: Ability): boolean => {
	const target = ability.target.trim().toLowerCase();

	if (target.startsWith('one ') || (target === 'self') || target.startsWith('the triggering')) {
		return false;
	}

	if (/^(two|three|four|five|six|each|all)\b/.test(target) || target.includes('per minion')) {
		return true;
	}

	return getUsageType(ability) === 'area';
};

const getClauses = (tier: string): string[] => {
	return tier.split(';').map(s => s.trim()).filter(s => s.length > 0);
};

const isDamageClause = (clause: string) => {
	const lower = clause.toLowerCase();
	return lower.endsWith('damage') || lower.endsWith('dmg');
};

const getDamageValue = (tier1: string): number => {
	const clause = getClauses(tier1).find(isDamageClause);
	if (!clause) {
		return 0;
	}

	const matches = clause.replace(/\d+d\d+/gi, '').match(/\d+/g);
	return matches ? matches.reduce((sum, n) => sum + parseInt(n, 10), 0) : 0;
};

// 'Extra N damage' can appear anywhere in a longer effect sentence ('...and deals an extra 5 fire
// damage'), not just as its own clause, so this scans the whole text rather than going clause by
// clause the way getDamageValue does
const getExtraDamage = (text: string): number => {
	const matches = [ ...text.matchAll(extraDamageGlobalRegex) ];
	return Collections.sum(matches, m => {
		const count = parseInt(m[1], 10);
		const diceSides = m[2] ? parseInt(m[2], 10) : 0;
		return diceSides > 0 ? count * (diceSides + 1) / 2 : count;
	});
};

const getDuration = (clause: string): ConditionEndType => {
	if (/save\s*ends/i.test(clause)) {
		return ConditionEndType.SaveEnds;
	}

	if (/end of turn|\beot\b/i.test(clause)) {
		return ConditionEndType.EndOfTurn;
	}

	return ConditionEndType.UntilRemoved;
};

// A single clause often describes more than one thing at once ('shifts up to their speed and can
// make a free strike that deals an extra 5 lightning damage' is a movement grant, a free strike
// grant, and a damage bonus all in one sentence), so every pattern below gets a chance to match
// and contribute its own effect, rather than the first match winning and the rest being lost.
const classifyClause = (clause: string): ParsedEffect[] => {
	if (noEffectRegex.test(clause.trim())) {
		return [];
	}

	const potencyGated = potencyRegex.test(clause);
	const effects: ParsedEffect[] = [];
	let handled = false;

	const modifierMatch = clause.match(damageModifierRegex);
	if (modifierMatch) {
		const modifierType = modifierMatch[1].toLowerCase() === 'weakness' ? DamageModifierType.Weakness : DamageModifierType.Immunity;
		effects.push({ kind: 'damage-modifier', modifierType: modifierType, value: parseInt(modifierMatch[2], 10), potencyGated: potencyGated });
		handled = true;
	}

	const conditionMatches = [ ...clause.matchAll(conditionRegex) ];
	if (conditionMatches.length > 0) {
		const duration = getDuration(clause);
		const seen = new Set<ConditionType>();
		conditionMatches.forEach(m => {
			const condition = conditionTypes.find(c => c.toLowerCase() === m[1].toLowerCase());
			if (condition && !seen.has(condition)) {
				seen.add(condition);
				effects.push({ kind: 'condition', condition: condition, duration: duration, potencyGated: potencyGated });
				handled = true;
			}
		});
	}

	const forcedMatch = clause.match(forcedMovementRegex);
	if (forcedMatch) {
		const verb = forcedMatch[2].toLowerCase();
		const moveType = verb.startsWith('push') ? 'push' : verb.startsWith('pull') ? 'pull' : 'slide';
		effects.push({ kind: 'forced-movement', moveType: moveType, vertical: !!forcedMatch[1], value: parseInt(forcedMatch[3], 10), potencyGated: potencyGated });
		handled = true;
	} else {
		const forcedVerbMatch = clause.match(forcedMovementVerbRegex);
		const distanceMatch = clause.match(variableDistanceRegex);
		if (forcedVerbMatch && distanceMatch) {
			const verb = forcedVerbMatch[2].toLowerCase();
			const moveType = verb.startsWith('push') ? 'push' : verb.startsWith('pull') ? 'pull' : 'slide';
			effects.push({ kind: 'forced-movement', moveType: moveType, vertical: !!forcedVerbMatch[1], value: getVariableDistanceValue(distanceMatch), potencyGated: potencyGated });
			handled = true;
		}
	}

	const shiftMatch = clause.match(shiftRegex);
	if (shiftMatch) {
		effects.push({ kind: 'granted-movement', moveType: 'shift', value: parseInt(shiftMatch[1], 10), potencyGated: potencyGated });
		handled = true;
	} else if (shiftVerbRegex.test(clause)) {
		const distanceMatch = clause.match(variableDistanceRegex);
		if (distanceMatch) {
			effects.push({ kind: 'granted-movement', moveType: 'shift', value: getVariableDistanceValue(distanceMatch), potencyGated: potencyGated });
			handled = true;
		}
	}

	const teleportMatch = clause.match(teleportRegex);
	if (teleportMatch) {
		effects.push({ kind: 'granted-movement', moveType: 'teleport', value: parseInt(teleportMatch[1], 10), potencyGated: potencyGated });
		handled = true;
	} else if (teleportVerbRegex.test(clause)) {
		const distanceMatch = clause.match(variableDistanceRegex);
		if (distanceMatch) {
			effects.push({ kind: 'granted-movement', moveType: 'teleport', value: getVariableDistanceValue(distanceMatch), potencyGated: potencyGated });
			handled = true;
		}
	}

	// Plain 'move' is mechanically close enough to 'shift' for pricing purposes, so it's tracked
	// as the same granted-movement effect, just with its own moveType so the distinction isn't lost
	const moveMatch = clause.match(moveRegex);
	if (moveMatch) {
		effects.push({ kind: 'granted-movement', moveType: 'move', value: parseInt(moveMatch[1], 10), potencyGated: potencyGated });
		handled = true;
	} else if (moveVerbRegex.test(clause)) {
		const distanceMatch = clause.match(variableDistanceRegex);
		if (distanceMatch) {
			effects.push({ kind: 'granted-movement', moveType: 'move', value: getVariableDistanceValue(distanceMatch), potencyGated: potencyGated });
			handled = true;
		}
	}

	// Skip anything that's still (or already) talking about damage - an ongoing 'X damage (save
	// ends)' clause is closer to Bleeding than it is to a status condition we can name
	if (!handled && !/\bdamage\b/i.test(clause) && (customConditionByDurationRegex.test(clause) || customConditionBareRegex.test(clause))) {
		effects.push({ kind: 'condition', condition: ConditionType.Custom, duration: getDuration(clause), potencyGated: potencyGated });
		handled = true;
	}

	const edgeOrBaneMatch = clause.match(edgeOrBaneRegex);
	if (edgeOrBaneMatch) {
		const modifier = edgeOrBaneMatch[2].toLowerCase() === 'edge' ? 'edge' : 'bane';
		effects.push({ kind: 'edge-or-bane', modifier: modifier, value: edgeOrBaneMatch[1] ? 2 : 1, potencyGated: potencyGated });
		handled = true;
	}

	const resourceMatch = clause.match(resourceRegex);
	if (resourceMatch) {
		const direction = resourceMatch[1].toLowerCase().startsWith('gain') ? 'gain' : 'loss';
		const count = parseInt(resourceMatch[2], 10);
		const diceSides = resourceMatch[3] ? parseInt(resourceMatch[3], 10) : 0;
		const value = diceSides > 0 ? count * (diceSides + 1) / 2 : count;
		const resource = resourceMatch[4].toLowerCase()
			.replace(/^surges$/, 'surge')
			.replace(/^recoveries$/, 'recovery');
		effects.push({ kind: 'resource', resource: resource, direction: direction, value: value, potencyGated: potencyGated });
		handled = true;
	}

	const spendRecoveryMatch = clause.match(spendRecoveryRegex);
	if (spendRecoveryMatch) {
		const value = spendRecoveryMatch[1] ? parseInt(spendRecoveryMatch[1], 10) : 1;
		effects.push({ kind: 'spend-recovery', value: value, potencyGated: potencyGated });
		handled = true;
	}

	if (freeStrikeRegex.test(clause)) {
		effects.push({ kind: 'free-strike', potencyGated: potencyGated });
		handled = true;
	}

	const statBonusMatch = clause.match(statBonusRegex);
	if (statBonusMatch) {
		const magnitude = parseInt(statBonusMatch[1], 10);
		const value = statBonusMatch[2].toLowerCase() === 'penalty' ? -magnitude : magnitude;
		effects.push({ kind: 'stat-bonus', stat: cleanStatName(statBonusMatch[3]), value: value, potencyGated: potencyGated });
		handled = true;
	}

	if (damageHalfRegex.test(clause)) {
		effects.push({ kind: 'damage-reduction', value: 0.5, potencyGated: potencyGated });
		handled = true;
	}

	if (extraDamageRegex.test(clause)) {
		// Folded into the ability's total damage elsewhere (see getExtraDamage) - not tracked as
		// its own effect, but it still counts as 'handled' so it doesn't fall through to 'other'
		handled = true;
	}

	if (!handled) {
		effects.push({ kind: 'other', text: clause, potencyGated: potencyGated });
	}

	return effects;
};

const getEffectSignature = (effect: ParsedEffect): string => {
	switch (effect.kind) {
		case 'condition':
			return `condition:${effect.condition}:${effect.duration}`;
		case 'forced-movement':
			return `forced-movement:${effect.moveType}:${effect.vertical}`;
		case 'granted-movement':
			return `granted-movement:${effect.moveType}`;
		case 'damage-modifier':
			return `damage-modifier:${effect.modifierType}`;
		case 'edge-or-bane':
			return `edge-or-bane:${effect.modifier}`;
		case 'resource':
			return `resource:${effect.resource}:${effect.direction}`;
		case 'free-strike':
			return 'free-strike';
		case 'spend-recovery':
			return 'spend-recovery';
		case 'stat-bonus':
			return `stat-bonus:${effect.stat}`;
		case 'damage-reduction':
			return 'damage-reduction';
		case 'other':
			return `other:${effect.text.toLowerCase()}`;
	}
};

const toEffectData = (effect: ParsedEffect, when: 'always' | 'tier-2-3' | 'tier-3'): AbilityEffect => {
	switch (effect.kind) {
		case 'condition':
			return {
				type: 'add-condition',
				when: when,
				potencyGated: effect.potencyGated,
				condition: effect.condition,
				duration: effect.duration
			};
		case 'forced-movement':
			return {
				type: 'forced-movement',
				when: when,
				potencyGated: effect.potencyGated,
				moveType: effect.moveType,
				vertical: effect.vertical,
				value: effect.value
			};
		case 'granted-movement':
			return {
				type: 'granted-movement',
				when: when,
				potencyGated: effect.potencyGated,
				moveType: effect.moveType,
				value: effect.value
			};
		case 'damage-modifier':
			return {
				type: 'damage-modifier',
				when: when,
				potencyGated: effect.potencyGated,
				modifierType: effect.modifierType,
				value: effect.value
			};
		case 'edge-or-bane':
			return {
				type: 'edge-or-bane',
				when: when,
				potencyGated: effect.potencyGated,
				modifier: effect.modifier,
				value: effect.value
			};
		case 'resource':
			return {
				type: effect.direction === 'gain' ? 'resource-gain' : 'resource-loss',
				when: when,
				potencyGated: effect.potencyGated,
				resource: effect.resource,
				value: effect.value
			};
		case 'free-strike':
			return {
				type: 'free-strike',
				when: when,
				potencyGated: effect.potencyGated
			};
		case 'spend-recovery':
			return {
				type: 'spend-recovery',
				when: when,
				potencyGated: effect.potencyGated,
				value: effect.value
			};
		case 'stat-bonus':
			return {
				type: 'stat-bonus',
				when: when,
				potencyGated: effect.potencyGated,
				stat: effect.stat,
				value: effect.value
			};
		case 'damage-reduction':
			return {
				type: 'damage-reduction',
				when: when,
				potencyGated: effect.potencyGated,
				value: effect.value
			};
		case 'other':
			return {
				type: 'other',
				when: when,
				potencyGated: effect.potencyGated,
				text: effect.text
			};
	}
};

// Ability text outside a power roll (edicts, stances, and other 'text' / 'field' sections) isn't
// split into tiers by ';' the way a roll's tier text is - it's ordinary prose, so clauses are
// split on sentence boundaries instead.
const getClausesFromText = (text: string): string[] => {
	return text.split(/(?<=[.;])\s+/).map(s => s.trim()).filter(s => s.length > 0);
};

const getEffectsFromText = (text: string): AbilityEffect[] => {
	const parsed = getClausesFromText(text).filter(c => !isDamageClause(c)).flatMap(classifyClause);

	const bySignature = new Map<string, ParsedEffect>();
	parsed.forEach(effect => bySignature.set(getEffectSignature(effect), effect));

	return Array.from(bySignature.values()).map(effect => toEffectData(effect, 'always'));
};

const getEffects = (roll: PowerRoll): AbilityEffect[] => {
	const byTier: Record<number, ParsedEffect[]> = {
		1: getClauses(roll.tier1).filter(c => !isDamageClause(c)).flatMap(classifyClause),
		2: getClauses(roll.tier2).filter(c => !isDamageClause(c)).flatMap(classifyClause),
		3: getClauses(roll.tier3).filter(c => !isDamageClause(c)).flatMap(classifyClause)
	};

	const bySignature = new Map<string, { effect: ParsedEffect; tiers: Set<number> }>();
	[ 1, 2, 3 ].forEach(tier => {
		byTier[tier].forEach(effect => {
			const signature = getEffectSignature(effect);
			const existing = bySignature.get(signature);
			if (existing) {
				existing.tiers.add(tier);
				const potencyGated = existing.effect.potencyGated || effect.potencyGated;
				existing.effect = effect;
				existing.effect.potencyGated = potencyGated;
			} else {
				bySignature.set(signature, { effect: effect, tiers: new Set([ tier ]) });
			}
		});
	});

	return Array.from(bySignature.values()).map(({ effect, tiers }) => {
		const when: 'always' | 'tier-2-3' | 'tier-3' = tiers.has(1) ? 'always' : (tiers.has(2) ? 'tier-2-3' : 'tier-3');
		return toEffectData(effect, when);
	});
};

// Action types are one-hot encoded against a 'Main Action' baseline - that baseline's own
// contribution is absorbed into the intercept, rather than needing a feature of its own
const slugifyAction = (action: AbilityUsage): string => action.toLowerCase().replace(/\s+/g, '-');

// Builds a sparse set of numeric features from an ability's shape. Features prefixed 'usage:' are
// 'budget' inputs - they come from the ability's cost, action, usage type, and number of targets,
// not from a design choice, so they're kept separate from the 'spend' features (damage & effects)
// that a budget gets spent on. Effects are weighted by their magnitude (squares moved, weakness/
// immunity value, or 1 for effects with no inherent magnitude, like conditions), grouped by the
// tier they start applying at, since an effect that only lands on a tier 3 result is worth less
// than one that's always active.
const buildFeatures = (ability: AbilityData): Record<string, number> => {
	const features: Record<string, number> = {};

	features['usage:multipleTargets'] = ability.usage.multipleTargets ? 1 : 0;
	features['usage:ranged'] = ability.usage.type === 'ranged' ? 1 : 0;
	features['usage:area'] = ability.usage.type === 'area' ? 1 : 0;
	if (ability.action !== AbilityUsage.MainAction) {
		features[`usage:action:${slugifyAction(ability.action)}`] = 1;
	}

	features.damage = ability.damage;

	ability.effects.forEach(effect => {
		const magnitude = 'value' in effect ? effect.value : 1;
		const key = `${effect.type}:${effect.when}`;
		features[key] = (features[key] ?? 0) + magnitude;
	});

	// A separate discount term: how much of this ability's power only lands if the target fails
	// a potency check, independent of what kind of effect it is
	const potencyMagnitude = Collections.sum(
		ability.effects.filter(e => e.potencyGated),
		e => ('value' in e ? e.value : 1)
	);
	if (potencyMagnitude > 0) {
		features.potencyGated = potencyMagnitude;
	}

	return features;
};

// Gauss-Jordan elimination with partial pivoting; solves A x = b for x
const solveLinearSystem = (a: number[][], b: number[]): number[] => {
	const n = b.length;
	const m = a.map((row, i) => [ ...row, b[i] ]);

	for (let col = 0; col < n; col++) {
		let pivot = col;
		for (let row = col + 1; row < n; row++) {
			if (Math.abs(m[row][col]) > Math.abs(m[pivot][col])) {
				pivot = row;
			}
		}
		[ m[col], m[pivot] ] = [ m[pivot], m[col] ];

		const pivotValue = m[col][col];
		if (Math.abs(pivotValue) < 1e-9) {
			continue;
		}

		for (let k = col; k <= n; k++) {
			m[col][k] /= pivotValue;
		}

		for (let row = 0; row < n; row++) {
			if (row !== col) {
				const factor = m[row][col];
				for (let k = col; k <= n; k++) {
					m[row][k] -= factor * m[col][k];
				}
			}
		}
	}

	return m.map(row => row[n]);
};

// Ordinary least squares: fits y = X . coefficients, with a light ridge term added purely to
// keep the normal equations solvable when a couple of features happen to be collinear
const solveOLS = (x: number[][], y: number[]): number[] => {
	const p = x[0].length;

	const xtx: number[][] = Array.from({ length: p }, () => new Array(p).fill(0) as number[]);
	const xty: number[] = new Array(p).fill(0) as number[];

	x.forEach((row, i) => {
		row.forEach((xa, a) => {
			xty[a] += xa * y[i];
			row.forEach((xb, b) => {
				xtx[a][b] += xa * xb;
			});
		});
	});

	const ridge = 1e-3;
	for (let a = 0; a < p; a++) {
		xtx[a][a] += ridge;
	}

	return solveLinearSystem(xtx, xty);
};

export class AnalysisLogic {
	static convertAbility = (ability: Ability): AbilityData => {
		const rollSection = ability.sections.find((s): s is AbilitySectionRoll => s.type === 'roll');
		const nonRollSections = ability.sections
			.filter((s): s is AbilitySectionText | AbilitySectionField => (s.type === 'text') || (s.type === 'field'));

		// An ability with no power roll still has effects - they're just described in its text /
		// field sections rather than gated behind tiers, so every effect they contain applies 'always'.
		const nonRollEffects = nonRollSections.flatMap(s => getEffectsFromText(s.type === 'text' ? s.text : s.effect));

		// 'Extra N damage' (eg 'deals an extra 5 fire damage' inside a longer effect sentence) is
		// folded straight into the ability's total damage rather than kept as a separate effect -
		// it's a bonus on the same strike, not a distinct thing to price on its own
		const extraDamage = rollSection
			? getExtraDamage(rollSection.roll.tier1) + getExtraDamage(rollSection.roll.tier2) + getExtraDamage(rollSection.roll.tier3)
			: Collections.sum(nonRollSections, s => getExtraDamage(s.type === 'text' ? s.text : s.effect));

		return {
			name: ability.name,
			cost: ability.cost,
			action: ability.type.usage,
			usage: {
				type: getUsageType(ability),
				multipleTargets: getMultipleTargets(ability)
			},
			damage: (rollSection ? getDamageValue(rollSection.roll.tier1) : 0) + extraDamage,
			effects: rollSection ? getEffects(rollSection.roll) : nonRollEffects
		};
	};

	// Assumes abilities at the same cost should be roughly equal in power, and fits a linear model
	// (cost = intercept + sum of feature weights) across all abilities of a known numeric cost, to
	// work out how much each ingredient (a point of damage, a condition, a square of forced
	// movement, ...) is 'worth' in cost terms
	static getCostModel = (abilities: AbilityData[]): CostModel => {
		const samples = abilities.filter((a): a is AbilityData & { cost: number } => typeof a.cost === 'number');

		const rows = samples.map(buildFeatures);

		const support = new Map<string, number>();
		rows.forEach(row => {
			Object.keys(row).forEach(key => {
				if (row[key] !== 0) {
					support.set(key, (support.get(key) ?? 0) + 1);
				}
			});
		});

		// Drop features that barely show up in the data; there isn't enough signal to trust their weight
		const minSupport = 5;
		const featureNames = Array.from(support.keys())
			.filter(key => (support.get(key) ?? 0) >= minSupport)
			.sort();

		if ((samples.length === 0) || (featureNames.length === 0)) {
			return { sampleSize: samples.length, rSquared: 0, intercept: 0, terms: [] };
		}

		const x = rows.map(row => [ 1, ...featureNames.map(name => row[name] ?? 0) ]);
		const y = samples.map(a => a.cost);

		const coefficients = solveOLS(x, y);
		const [ intercept, ...weights ] = coefficients;

		const predictions = x.map(row => row.reduce((sum, value, i) => sum + (value * coefficients[i]), 0));
		const yMean = Collections.mean(y, v => v);
		const ssTot = Collections.sum(y, v => (v - yMean) ** 2);
		const ssRes = Collections.sum(y.map((v, i) => v - predictions[i]), d => d ** 2);
		const rSquared = ssTot > 0 ? (1 - (ssRes / ssTot)) : 0;

		const terms: CostModelTerm[] = featureNames
			.map((name, i) => ({
				label: name,
				role: (name.startsWith('usage:') ? 'budget' : 'spend') as 'budget' | 'spend',
				weight: weights[i],
				support: support.get(name) ?? 0
			}))
			.sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));

		return {
			sampleSize: samples.length,
			rSquared: rSquared,
			intercept: intercept,
			terms: terms
		};
	};

	// Splits an ability's cost into a budget (what its cost, action, usage type, and number of
	// targets entitle it to spend on damage & effects) and a spend (what its actual damage &
	// effects add up to, at the model's rates), so the two can be compared - a surplus above 0
	// means the ability looks stronger than its budget allows, below 0 means it's leaving some of
	// its budget on the table.
	//
	// A signature ability, like any other ability with a 0-cost, has no signature-resource points
	// to spend at all - its budget comes entirely from its action / usage type / target-count
	// adjustment, anchored at a 0 base cost rather than being excluded from the model.
	//
	// The budget-role terms (action, usage type, targets) are usually small adjustments (tenths of
	// a point), so they're subtracted straight from the ability's own cost to get its budget - that
	// keeps budget anchored close to the actual cost (0 / 3 / 5 / 7 / 9 / 11), whatever the fit
	// quality. The intercept, on the other hand, is often a large constant (it's soaking up
	// whatever damage & effects don't explain), so it's folded into spend instead, as the
	// 'baseline' value every ability gets just by existing - subtracting it from budget would push
	// cheap abilities' budgets through zero.
	static getBudget = (ability: AbilityData, model: CostModel): AbilityBudget => {
		const features = buildFeatures(ability);

		const usageAdjustment = Collections.sum(
			model.terms.filter(t => t.role === 'budget'),
			t => t.weight * (features[t.label] ?? 0)
		);

		const spend = model.intercept + Collections.sum(
			model.terms.filter(t => t.role === 'spend'),
			t => t.weight * (features[t.label] ?? 0)
		);

		const costValue = typeof ability.cost === 'number' ? ability.cost : 0;
		const budget = costValue - usageAdjustment;

		return {
			cost: ability.cost,
			usageAdjustment: usageAdjustment,
			budget: budget,
			spend: spend,
			surplus: spend - budget
		};
	};
}
