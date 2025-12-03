import { Button, Drawer, Flex, Select, Space } from 'antd';
import { Feature, FeatureAncestryChoiceData } from '@/models/feature';
import { Ancestry } from '@/models/ancestry';
import { AncestryPanel } from '@/components/panels/elements/ancestry-panel/ancestry-panel';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { Field } from '@/components/controls/field/field';
import { Hero } from '@/models/hero';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureAncestryChoiceData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	options: Options;
}

export const InfoAncestryChoice = (props: InfoProps) => {
	if (!props.data.selected) {
		return null;
	}

	return (
		<AncestryPanel
			ancestry={props.data.selected}
			sourcebooks={props.sourcebooks || []}
			options={props.options}
		/>
	);
};

interface ConfigProps {
	data: FeatureAncestryChoiceData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	setData: (data: FeatureAncestryChoiceData) => void;
}

export const ConfigAncestryChoice = (props: ConfigProps) => {
	const [ selectedAncestry, setSelectedAncestry ] = useState<Ancestry | null>(null);

	const ancestries = SourcebookLogic.getAncestries(props.sourcebooks);
	const sortedAncestries = Collections.sort(ancestries, a => a.name);

	if (sortedAncestries.length === 0) {
		return (
			<Empty text='There are no options to choose for this feature.' />
		);
	}

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			<Select
				style={{ width: '100%' }}
				status={!props.data.selected ? 'warning' : ''}
				allowClear={true}
				placeholder='Select an ancestry'
				options={sortedAncestries.map(a => ({ label: a.name, value: a.id, desc: a.description }))}
				optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
				value={props.data.selected ? props.data.selected.id : null}
				onChange={value => {
					const dataCopy = Utils.copy(props.data);
					dataCopy.selected = SourcebookLogic.getAncestries(props.sourcebooks).find(a => a.id === value) || null;
					props.setData(dataCopy);
				}}
			/>
			{
				props.data.selected ?
					<Flex className='selection-box' align='center' gap={10}>
						<Field
							style={{ flex: '1 1 0' }}
							label={props.data.selected.name}
							value={<Markdown text={props.data.selected.description} useSpan={true} />}
						/>
						<Button
							style={{ flex: '0 0 auto' }}
							type='text'
							title='Show details'
							icon={<InfoCircleOutlined />}
							onClick={() => setSelectedAncestry(props.data.selected)}
						/>
					</Flex>
					: null
			}
			<Drawer open={!!selectedAncestry} onClose={() => setSelectedAncestry(null)} closeIcon={null} size={500}>
				<Modal
					content={selectedAncestry ? <AncestryPanel ancestry={selectedAncestry} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} /> : null}
					onClose={() => setSelectedAncestry(null)}
				/>
			</Drawer>
		</Space>
	);
};
