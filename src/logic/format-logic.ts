import { DamageModifier, Modifier } from '../models/damage-modifier';
import { Plot, PlotLink } from '../models/plot';
import { AbilityType } from '../models/ability';
import { AbilityUsage } from '../enums/ability-usage';
import { Size } from '../models/size';
import { Speed } from '../models/speed';

export class FormatLogic {
	static getAbilityType = (type: AbilityType) => {
		if (type.usage === AbilityUsage.Other) {
			return type.time;
		}
		const qualifiers = (type.qualifiers ?? []).map(q => `(${q})`);

		return [ type.free ? 'Free' : undefined, type.usage, type.order, ...qualifiers ]
			.filter(x => x)
			.join(' ');
	};

	static getSize = (size: Size) => {
		if (size.value > 1) {
			return size.value.toString();
		}

		return `1${size.mod}`;
	};

	static getSpeed = (speed: Speed) => {
		if (speed.modes.length === 0) {
			return speed.value.toString();
		}

		if (typeof speed.modes === 'string') {
			return `${speed.value} (${speed.modes})`;
		}

		return `${speed.value} (${speed.modes.join(', ')})`;
	};

	static getDamageModifier = (mod: DamageModifier) => {
		return `${mod.damageType} ${mod.type} ${FormatLogic.getModifier(mod)}`;
	};

	static getModifier = (mod: Modifier) => {
		const sections: string[] = [];
		if (mod.value && mod.valuePerLevel && (mod.value === mod.valuePerLevel)) {
			sections.push(`${mod.value >= 0 ? '+' : ''} ${mod.value} per level`);
		} else {
			if (mod.value) {
				sections.push(`${mod.value >= 0 ? '+' : ''} ${mod.value}`);
			}

			if (mod.valuePerLevel) {
				sections.push(`${mod.valuePerLevel >= 0 ? '+' : ''} ${mod.valuePerLevel} per level after 1st`);
			}
		}

		if (mod.valuePerEchelon) {
			sections.push(`${mod.valuePerEchelon >= 0 ? '+' : ''} ${mod.valuePerEchelon} per echelon`);
		}

		if (mod.valueCharacteristics.length > 0) {
			const ch = (mod.valueCharacteristics.length === 5) ? 'highest characteristic' : mod.valueCharacteristics.join(' or ');
			if (mod.valueCharacteristicMultiplier === 1) {
				sections.push(`+ ${ch}`);
			} else {
				sections.push(`+ ${ch} x ${mod.valueCharacteristicMultiplier}`);
			}
		}

		return sections.join(' ') || '+0';
	};

	static getPlotLinkTitle = (link: PlotLink, parentPlot: Plot) => {
		let plotPointName = 'Link';

		if (parentPlot) {
			const plot = parentPlot.plots.find(p => p.id === link.plotID);
			if (plot && plot.name) {
				plotPointName = plot.name;
			}
		}

		return link.label ? `${link.label}: ${plotPointName}` : plotPointName;
	};

	static getConstant = (text: string) => {
		let constant = 0;

		const constantMatch = text.match(/(?<c>\d+)\s*(\+|plus)/);
		if (constantMatch && constantMatch.groups) {
			constant = parseInt(constantMatch.groups['c']);
		}

		return constant;
	};

	static getMultiplier = (text: string) => {
		let multiplier = 1;
		const x: { n: number, words: string[] }[] = [
			{
				n: 0.5,
				words: [
					'half'
				]
			},
			{
				n: 2,
				words: [
					'twice',
					'two times',
					'2x',
					'2 x',
					'2×',
					'2 ×',
					'2 times'
				]
			},
			{
				n: 3,
				words: [
					'thrice',
					'three times',
					'3x',
					'3 x',
					'3×',
					'3 ×'
				]
			},
			{
				n: 4,
				words: [
					'four times',
					'4x',
					'4 x',
					'4×',
					'4 ×'
				]
			},
			{
				n: 5,
				words: [
					'five times',
					'5x',
					'5 x',
					'5×',
					'5 ×',
					'5 times'
				]
			},
			{
				n: 6,
				words: [
					'six times',
					'6x',
					'6 x',
					'6×',
					'6 ×'
				]
			},
			{
				n: 7,
				words: [
					'seven times',
					'7x',
					'7 x',
					'7×',
					'7 ×'
				]
			},
			{
				n: 8,
				words: [
					'eight times',
					'8x',
					'8 x',
					'8×',
					'8 ×'
				]
			},
			{
				n: 9,
				words: [
					'nine times',
					'9x',
					'9 x',
					'9×',
					'9 ×'
				]
			},
			{
				n: 10,
				words: [
					'ten times',
					'10x',
					'10 x',
					'10×',
					'10 ×'
				]
			}
		];
		x.forEach(set => {
			if (set.words.some(w => text.toLowerCase().includes(w))) {
				multiplier = set.n;
			}
		});

		return multiplier;
	};
}
