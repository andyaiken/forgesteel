import { DamageModifier, Modifier } from '../models/damage-modifier';
import { Plot, PlotLink } from '../models/plot';
import { AbilityType } from '../models/ability';
import { AbilityUsage } from '../enums/ability-usage';
import { Size } from '../models/size';

export class FormatLogic {
	static getAbilityType = (type: AbilityType) => {
		if (type.usage === AbilityUsage.Other) {
			return type.time;
		}
		const qualifiers = (type.qualifiers ?? []).map(q => `(${q})`);

		return [ type.free ? 'Free' : undefined, type.usage, ...qualifiers ]
			.filter(x => x)
			.join(' ');
	};

	static getSize = (size: Size) => {
		if (size.value > 1) {
			return size.value.toString();
		}

		return `1${size.mod}`;
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
}
