import { describe, expect, it, test } from 'vitest';
import { Characteristic } from '@/enums/characteristic';
import { ClassicSheetLogic } from '@/logic/classic-sheet/classic-sheet-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureField } from '@/enums/feature-field';
import { FeatureLogic } from '@/logic/feature-logic';
import { Options } from '@/models/options';
import { ResourceGainFrequency } from '@/enums/resource-gain-frequency';
import { TutorialMode } from '@/enums/tutorial-mode';

describe('flattenMultiples', () => {
	const text = (id: string) => FactoryLogic.feature.create({ id: id, name: id, description: `${id} description` });

	const multiple = (id: string, features: Feature[], description?: string) => FactoryLogic.feature.createMultiple({
		id: id,
		name: id,
		description: description,
		features: features
	});

	it('lists a Multiple alongside its children', () => {
		const feature = multiple('m1', [ text('m1a'), text('m1b') ], 'Your body is made to withstand the blows of your enemies.');

		expect(ClassicSheetLogic.flattenMultiples([ feature ]).map(f => f.id)).toEqual([ 'm1', 'm1a', 'm1b' ]);
	});

	it('opens up a Multiple nested inside another', () => {
		const feature = multiple('m2', [ text('m2a'), multiple('m2b', [ text('m2b1') ]) ]);

		expect(ClassicSheetLogic.flattenMultiples([ feature ]).map(f => f.id)).toEqual([ 'm2', 'm2a', 'm2b', 'm2b1' ]);
	});

	it('leaves features that are not Multiples alone', () => {
		expect(ClassicSheetLogic.flattenMultiples([ text('t1'), text('t2') ]).map(f => f.id)).toEqual([ 't1', 't2' ]);
	});

	it('leaves a list simplifyFeatures has already flattened unchanged', () => {
		const feature = multiple('m3', [ text('m3a'), text('m3b') ]);
		const simplified = FeatureLogic
			.simplifyFeatures([ { feature: feature, source: '', level: undefined } ], 1, TutorialMode.Complete)
			.map(f => f.feature);

		// The children are already siblings of their parent, so flattening must not double them up
		expect(simplified.map(f => f.id)).toEqual([ 'm3', 'm3a', 'm3b' ]);
		expect(ClassicSheetLogic.flattenMultiples(simplified).map(f => f.id)).toEqual([ 'm3', 'm3a', 'm3b' ]);
	});
});

describe('includeFeature', () => {
	const surgeGain = FactoryLogic.feature.createSurgeGain({
		id: 's1',
		name: 'Elemental Buffer',
		tag: 'reduce-damage',
		trigger: 'You reduce damage with damage immunity',
		value: '2',
		frequency: ResourceGainFrequency.AtWill
	});

	const potencyResistance = FactoryLogic.feature.createPotencyResistance({ id: 'p1', characteristics: [ Characteristic.Might ] });

	// Both types carry rules text that used to sit in a Text feature's description, so trimming
	// the sheet down must not drop them
	test.each([
		[ 'minimal' ],
		[ 'no-basic' ],
		[ 'all' ]
	])('it should keep the converted feature types under the %s option', option => {
		const options = { featuresInclude: option } as Options;

		expect(ClassicSheetLogic.includeFeature(surgeGain, options)).toBe(true);
		expect(ClassicSheetLogic.includeFeature(potencyResistance, options)).toBe(true);
	});

	test('it should still drop a purely mechanical feature under the minimal option', () => {
		const bonus = FactoryLogic.feature.createBonus({ id: 'b1', field: FeatureField.Stamina, value: 6 });

		expect(ClassicSheetLogic.includeFeature(bonus, { featuresInclude: 'minimal' } as Options)).toBe(false);
	});

	// FeatureComponent renders a Multiple's own prose, and flattenMultiples puts the wrapper in the
	// list, so trimming the sheet down must not be what throws that prose away
	const wrapper = (description?: string) => FactoryLogic.feature.createMultiple({
		id: 'm1',
		name: 'Stand Tough',
		description: description,
		features: [ FactoryLogic.feature.createBonus({ id: 'm1a', field: FeatureField.Stamina, value: 3 }) ]
	});

	test.each([
		[ 'minimal' ],
		[ 'no-basic' ]
	])('it should keep a Multiple that carries prose under the %s option', option => {
		const feature = wrapper('Your body is made to withstand the blows of your enemies.');

		expect(ClassicSheetLogic.includeFeature(feature, { featuresInclude: option } as Options)).toBe(true);
	});

	test.each([
		[ 'minimal' ],
		[ 'no-basic' ]
	])('it should drop a Multiple with nothing of its own to say under the %s option', option => {
		expect(ClassicSheetLogic.includeFeature(wrapper(), { featuresInclude: option } as Options)).toBe(false);
	});
});
