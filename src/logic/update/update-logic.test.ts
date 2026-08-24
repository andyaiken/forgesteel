import { describe, expect, it } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { UpdateLogic } from '@/logic/update/update-logic';

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
});
