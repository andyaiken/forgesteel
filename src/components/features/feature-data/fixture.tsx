import { Feature, FeatureFixtureData } from '@/models/feature';
import { Expander } from '@/components/controls/expander/expander';
import { Fixture } from '@/models/fixture';
import { FixtureEditPanel } from '@/components/panels/edit/fixture-edit/fixture-edit-panel';
import { FixturePanel } from '@/components/panels/elements/fixture-panel/fixture-panel';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureFixtureData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoFixture = (props: InfoProps) => {
	return (
		<SelectablePanel key={props.data.fixture.id}>
			<FixturePanel fixture={props.data.fixture} sourcebooks={props.sourcebooks} hero={props.hero} options={props.options} />
		</SelectablePanel>
	);
};

interface EditProps {
	data: FeatureFixtureData;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureFixtureData) => void;
}

export const EditFixture = (props: EditProps) => {
	const [ data, setData ] = useState<FeatureFixtureData>(Utils.copy(props.data));

	const setFixture = (value: Fixture) => {
		const copy = Utils.copy(data) as FeatureFixtureData;
		copy.fixture = value;
		setData(copy);
		props.setData(copy);
	};

	return (
		<div style={{ margin: '10px 0' }}>
			<Expander title={data.fixture.name || 'Unnamed Ability'}>
				<FixtureEditPanel
					fixture={data.fixture}
					sourcebooks={props.sourcebooks}
					options={props.options}
					onChange={setFixture}
				/>
			</Expander>
		</div>
	);
};
