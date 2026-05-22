import { Button, Flex } from 'antd';
import { CloseOutlined, InfoCircleOutlined, ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { Feature, FeatureData } from '@/models/feature';
import { ReactNode, useState } from 'react';
import { AbilityLogic } from '@/logic/ability-logic';
import { ConfigFeature } from '@/components/features/feature';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Perk } from '@/models/perk';
import { Sourcebook } from '@/models/sourcebook';

import './feature-config-panel.scss';

interface Props {
	feature: Feature | Perk;
	hero: Hero;
	sourcebooks: Sourcebook[];
	setData: (featureID: string, data: FeatureData) => void;
	onDelete?: () => void;
}

export const FeatureConfigPanel = (props: Props) => {
	const [ autoCalc, setAutoCalc ] = useState<boolean>(true);

	const autoCalcAvailable = () => {
		return (props.feature.type === FeatureType.Text) && (AbilityLogic.getTextEffect(props.feature.description, props.hero) !== props.feature.description);
	};

	const getDescription = () => {
		let desc;

		if (props.feature.type === FeatureType.Ability) {
			desc = props.feature.data.ability.description;
		} else {
			desc = props.feature.description;
		}

		if (!desc) {
			desc = FeatureLogic.getFeatureTypeDescription(props.feature.type);
		}

		if (autoCalc) {
			desc = AbilityLogic.getTextEffect(desc, props.hero);
		}

		return desc;
	};

	return (
		<ErrorBoundary>
			<div className='feature-config-panel'>
				<HeaderText
					extra={
						<>
							{
								autoCalcAvailable() ?
									<Button
										key='autocalc'
										type='text'
										title='Auto-calculate damage, potency, etc'
										icon={autoCalc ? <ThunderboltFilled style={{ color: 'rgb(22, 119, 255)' }} /> : <ThunderboltOutlined />}
										onClick={e => { e.stopPropagation(); setAutoCalc(!autoCalc); }}
									/>
									: null
							}
							{
								props.onDelete ?
									<DangerButton
										key='delete'
										mode='clear'
										onConfirm={() => props.onDelete!()}
									/>
									: null
							}
						</>
					}
				>
					{props.feature.name || 'Unnamed Feature'}
				</HeaderText>
				<Markdown text={getDescription()} />
				<ConfigFeature
					feature={props.feature}
					hero={props.hero}
					sourcebooks={props.sourcebooks}
					setData={data => props.setData(props.feature.id, data)}
				/>
			</div>
		</ErrorBoundary>
	);
};

interface SelectionBoxProps {
	content: ReactNode;
	customizeContent?: ReactNode;
	onSelect?: () => void;
	onRemove?: () => void;
}

export const SelectionBox = (props: SelectionBoxProps) => {
	return (
		<ErrorBoundary>
			<div className='selection-box'>
				<Flex align='center' gap={10}>
					{props.content}
					<Flex vertical={true}>
						{
							props.onSelect ?
								<Button
									type='text'
									title='Show details'
									icon={<InfoCircleOutlined />}
									onClick={props.onSelect}
								/>
								: null
						}
						{
							props.onRemove ?
								<Button
									type='text'
									title='Remove'
									icon={<CloseOutlined />}
									onClick={props.onRemove}
								/>
								: null
						}
					</Flex>
				</Flex>
				{props.customizeContent}
			</div>
		</ErrorBoundary>
	);
};
