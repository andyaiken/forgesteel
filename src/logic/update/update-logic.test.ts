import { describe, expect, it } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { LanguageType } from '@/enums/language-type';
import { Options } from '@/models/options';
import { UpdateLogic } from '@/logic/update/update-logic';

describe('updateOptions', () => {
	it('shows tips by default when updating existing options', () => {
		const options = {} as Options;

		UpdateLogic.updateOptions(options);

		expect(options.showTips).toBe(true);
	});
});

describe('updateSourcebook', () => {
	it('adds extensions when updating a sourcebook created before extensions existed', () => {
		const sourcebook = FactoryLogic.createSourcebook();
		Reflect.deleteProperty(sourcebook, 'extensions');

		UpdateLogic.updateSourcebook(sourcebook);

		expect(sourcebook.extensions).toEqual([]);
	});
});

describe('updateFeature', () => {
	const part = (id: string, name: string) => FactoryLogic.feature.create({ id: id, name: name, description: `${name} description` });

	const multiple = (id: string, description?: string) => FactoryLogic.feature.createMultiple({
		id: id,
		name: 'Draining',
		description: description,
		features: [ part(`${id}a`, 'Draining'), part(`${id}b`, 'Draining') ]
	});

	it('clears the name list that createMultiple used to generate', () => {
		const feature = multiple('m1');
		// what a hero saved before the change carries
		feature.description = 'Draining, Draining';

		UpdateLogic.updateFeature(feature);

		expect(feature.description).toBe('');
	});

	it('keeps a description the Multiple was actually given', () => {
		const feature = multiple('m2', 'This weapon drains the life from those it strikes.');

		UpdateLogic.updateFeature(feature);

		expect(feature.description).toBe('This weapon drains the life from those it strikes.');
	});

	it('clears the name list whatever order and spacing it was saved with', () => {
		const feature = multiple('m4');
		feature.data.features[ 0 ].name = 'Alpha';
		feature.data.features[ 1 ].name = 'Beta';
		feature.description = 'Beta,Alpha';

		UpdateLogic.updateFeature(feature);

		expect(feature.description).toBe('');
	});

	it('keeps a description that does not account for every child', () => {
		const feature = multiple('m5');
		// Both children are named 'Draining', so a lone 'Draining' is prose, not the generated list
		feature.description = 'Draining';

		UpdateLogic.updateFeature(feature);

		expect(feature.description).toBe('Draining');
	});

	it('leaves a Multiple built today alone', () => {
		const feature = multiple('m3');

		UpdateLogic.updateFeature(feature);

		expect(feature.description).toBe('');
	});

	it('defaults class ability choices to any ability type', () => {
		const feature = FactoryLogic.feature.createClassAbilityChoice({
			id: 'class-ability',
			cost: 0
		});
		Reflect.deleteProperty(feature.data, 'type');

		UpdateLogic.updateFeature(feature);

		expect(feature.data.type).toBe('Any');
	});

	it('defaults class ability choices to abilities through level 10', () => {
		const feature = FactoryLogic.feature.createClassAbilityChoice({
			id: 'class-ability',
			cost: 0
		});

		expect(feature.data.maxLevel).toBe(10);
	});

	it('adds a maximum level to existing class ability choices', () => {
		const feature = FactoryLogic.feature.createClassAbilityChoice({
			id: 'class-ability',
			cost: 0
		});
		Reflect.deleteProperty(feature.data, 'maxLevel');

		UpdateLogic.updateFeature(feature);

		expect(feature.data.maxLevel).toBe(10);
	});
});

describe('legacy language spelling', () => {
	it('normalizes a granted language and leaves other languages unchanged', () => {
		const legacy = FactoryLogic.feature.createLanguage({ id: 'legacy', language: 'Kalliac' });
		const other = FactoryLogic.feature.createLanguage({ id: 'other', language: 'Caelian' });

		UpdateLogic.updateFeature(legacy);
		UpdateLogic.updateFeature(other);

		expect(legacy.data.language).toBe('Kalliak');
		expect(other.data.language).toBe('Caelian');
	});

	it('normalizes every option and selection while restoring missing allowed types', () => {
		const feature = FactoryLogic.feature.createLanguageChoice({
			id: 'legacy', options: [ 'Kalliac', 'Caelian' ], selected: [ 'Custom', 'Kalliac' ]
		});
		Reflect.deleteProperty(feature.data, 'allowedTypes');

		UpdateLogic.updateFeature(feature);
		UpdateLogic.updateFeature(feature);

		expect(feature.data.options).toEqual([ 'Kalliak', 'Caelian' ]);
		expect(feature.data.selected).toEqual([ 'Custom', 'Kalliak' ]);
		expect(feature.data.allowedTypes).toEqual([ LanguageType.Common, LanguageType.Regional, LanguageType.Cultural, LanguageType.Dead ]);
	});

	it('preserves explicitly restricted allowed types during migration', () => {
		const feature = FactoryLogic.feature.createLanguageChoice({ id: 'restricted', options: [ 'Kalliac' ], allowedTypes: [] });

		UpdateLogic.updateFeature(feature);

		expect(feature.data.options).toEqual([ 'Kalliak' ]);
		expect(feature.data.allowedTypes).toEqual([]);
	});
});
