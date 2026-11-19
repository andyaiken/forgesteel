import { Button, Drawer, Segmented } from 'antd';
import { HeroSheetValue } from '@/enums/hero-sheet-value';
import { HeroSheetValueData } from '@/data/hero-sheet-value-data';
import { HeroSheetValueSelectModal } from '@/components/modals/select/hero-sheet-value-select/hero-sheet-value-select-modal';
import { LabelControl } from '@/components/controls/label-control/label-control';
import { useState } from 'react';

interface Props {
	hiddenValues: HeroSheetValue[];
	onChange: (values: HeroSheetValue[]) => void;
}

export const HeroSheetValuesControl = (props: Props) => {
	const [ showSelector, setShowSelector ] = useState(false);
	const allValues = HeroSheetValueData.sections.flatMap(section => section.values.map(option => option.value));
	const getMode = () => {
		if (showSelector) {
			return 'custom';
		}
		if (allValues.every(value => props.hiddenValues.includes(value))) {
			return 'all';
		}
		return props.hiddenValues.length > 0 ? 'custom' : 'none';
	};
	const mode = getMode();

	return (
		<div>
			<LabelControl
				label='Hide values'
				control={
					<Segmented
						block={true}
						options={[
							{ value: 'none', label: 'None' },
							{ value: 'custom', label: 'Custom' },
							{ value: 'all', label: 'All' }
						]}
						value={mode}
						onChange={value => {
							if (value === 'custom') {
								setShowSelector(true);
							} else if (value === 'all') {
								props.onChange(allValues);
							} else {
								props.onChange([]);
							}
						}}
					/>
				}
			/>
			{mode === 'custom' ? <Button block={true} onClick={() => setShowSelector(true)}>Select Values</Button> : null}
			<Drawer open={showSelector} onClose={() => setShowSelector(false)} closeIcon={null} size={500}>
				<HeroSheetValueSelectModal hiddenValues={props.hiddenValues} onSelect={props.onChange} onClose={() => setShowSelector(false)} />
			</Drawer>
		</div>
	);
};
