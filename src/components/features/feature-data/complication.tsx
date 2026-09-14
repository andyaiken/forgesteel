import { Button, Drawer, Space } from 'antd';
import { Feature, FeatureComplicationData } from '@/models/feature';
import { Complication } from '@/models/complication';
import { ComplicationPanel } from '@/components/panels/elements/complication-panel/complication-panel';
import { ComplicationSelectModal } from '@/components/modals/select/complication-select/complication-select-modal';
import { Field } from '@/components/controls/field/field';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { PanelMode } from '@/enums/panel-mode';
import { SelectionBox } from '@/components/panels/feature-config-panel/feature-config-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

interface InfoProps {
	data: FeatureComplicationData;
	feature: Feature;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
}

export const InfoComplication = (props: InfoProps) => {
	if (props.data.selected === null) {
		return (
			<div className='ds-text'>Choose a complication.</div>
		);
	}

	return <ComplicationPanel complication={props.data.selected} sourcebooks={props.sourcebooks || []} />;
};

interface ConfigProps {
	data: FeatureComplicationData;
	feature: Feature;
	hero: Hero;
	sourcebooks: Sourcebook[];
	setData: (data: FeatureComplicationData) => void;
}

export const ConfigComplication = (props: ConfigProps) => {
	const [ complicationSelectorOpen, setComplicationSelectorOpen ] = useState<boolean>(false);
	const [ selectedComplication, setSelectedComplication ] = useState<Complication | null>(null);

	return (
		<Space orientation='vertical' style={{ width: '100%' }}>
			{
				props.data.selected ?
					<SelectionBox
						content={
							<Field
								style={{ flex: '1 1 0' }}
								label={props.data.selected.name}
								value={<Markdown text={props.data.selected.description} useSpan={true} />}
							/>
						}
						onSelect={() => setSelectedComplication(props.data.selected)}
						onRemove={() => {
							const dataCopy = Utils.copy(props.data);
							dataCopy.selected = null;
							props.setData(dataCopy);
						}}
					/>
					:
					<Button block={true} className='status-warning' onClick={() => setComplicationSelectorOpen(true)}>
						Choose a complication
					</Button>
			}
			<Drawer open={complicationSelectorOpen} onClose={() => setComplicationSelectorOpen(false)} closeIcon={null} size={500}>
				<ComplicationSelectModal
					hero={props.hero}
					sourcebooks={props.sourcebooks}
					onSelect={complication => {
						setComplicationSelectorOpen(false);

						const dataCopy = Utils.copy(props.data);
						dataCopy.selected = complication;
						props.setData(dataCopy);
					}}
					onClose={() => setComplicationSelectorOpen(false)}
				/>
			</Drawer>
			<Drawer open={!!selectedComplication} onClose={() => setSelectedComplication(null)} closeIcon={null} size={500}>
				<Modal
					content={
						selectedComplication ?
							<ComplicationPanel
								complication={selectedComplication}
								sourcebooks={props.sourcebooks}
								mode={PanelMode.Full}
							/>
							: null
					}
					onClose={() => setSelectedComplication(null)}
				/>
			</Drawer>
		</Space>
	);
};
