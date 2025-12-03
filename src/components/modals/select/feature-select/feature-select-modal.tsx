import { Input, Space } from 'antd';
import { Empty } from '@/components/controls/empty/empty';
import { Feature } from '@/models/feature';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Hero } from '@/models/hero';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './feature-select-modal.scss';

interface Props {
	features: { feature: Feature, value: number }[];
	hero?: Hero;
	options: Options;
	onClose: () => void;
	onSelect: (feature: Feature) => void;
}

export const FeatureSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const features = props.features
		.filter(f => Utils.textMatches([
			f.feature.name,
			f.feature.description
		], searchTerm));

	const showCosts = props.features.some(f => f.value > 1);

	return (
		<Modal
			toolbar={
				<>
					<Input
						name='search'
						placeholder='Search'
						allowClear={true}
						value={searchTerm}
						suffix={<SearchOutlined />}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</>
			}
			content={
				<div className='feature-select-modal'>
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							features.map(f => (
								<SelectablePanel
									key={f.feature.id}
									onSelect={() => props.onSelect(f.feature)}
								>
									<FeaturePanel
										feature={f.feature}
										hero={props.hero}
										cost={showCosts ? f.value : undefined}
										mode={PanelMode.Full}
										options={props.options}
									/>
								</SelectablePanel>
							))
						}
						{
							features.length === 0 ?
								<Empty />
								: null
						}
					</Space>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
