import { Feature, FeatureData } from '@/models/feature';
import { ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { AbilityLogic } from '@/logic/ability-logic';
import { Button } from 'antd';
import { ConfigAncestryChoice } from '@/components/panels/feature-data/ancestry-choice';
import { ConfigAncestryFeatureChoice } from '@/components/panels/feature-data/ancestry-feature-choice';
import { ConfigChoice } from '@/components/panels/feature-data/choice';
import { ConfigClassAbility } from '@/components/panels/feature-data/class-ability';
import { ConfigCompanion } from '@/components/panels/feature-data/companion';
import { ConfigDomain } from '@/components/panels/feature-data/domain';
import { ConfigDomainFeature } from '@/components/panels/feature-data/domain-feature';
import { ConfigItemChoice } from '@/components/panels/feature-data/item-choice';
import { ConfigKit } from '@/components/panels/feature-data/kit';
import { ConfigLanguageChoice } from '@/components/panels/feature-data/language-choice';
import { ConfigPerk } from '@/components/panels/feature-data/perk';
import { ConfigRetainer } from '@/components/panels/feature-data/retainer';
import { ConfigSkillChoice } from '@/components/panels/feature-data/skill-choice';
import { ConfigSummonChoice } from '@/components/panels/feature-data/summon-choice';
import { ConfigTaggedFeatureChoice } from '@/components/panels/feature-data/tagged-feature-choice';
import { ConfigTitleChoice } from '@/components/panels/feature-data/title-choice';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { Perk } from '@/models/perk';
import { Sourcebook } from '@/models/sourcebook';
import { useState } from 'react';

import './feature-config-panel.scss';

interface Props {
	feature: Feature | Perk;
	options: Options;
	hero: Hero;
	sourcebooks: Sourcebook[];
	setData: (featureID: string, data: FeatureData) => void;
	onDelete?: () => void;
}

export const FeatureConfigPanel = (props: Props) => {
	const [ autoCalc, setAutoCalc ] = useState<boolean>(true);

	const getConfig = () => {
		switch (props.feature.type) {
			case FeatureType.AncestryChoice:
				return <ConfigAncestryChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.AncestryFeatureChoice:
				return <ConfigAncestryFeatureChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.Choice:
				return <ConfigChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.ClassAbility:
				return <ConfigClassAbility data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.Companion:
				return <ConfigCompanion data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.Domain:
				return <ConfigDomain data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.DomainFeature:
				return <ConfigDomainFeature data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.ItemChoice:
				return <ConfigItemChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.Kit:
				return <ConfigKit data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.LanguageChoice:
				return <ConfigLanguageChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.Perk:
				return <ConfigPerk data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.Retainer:
				return <ConfigRetainer data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.SkillChoice:
				return <ConfigSkillChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.SummonChoice:
				return <ConfigSummonChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.TaggedFeatureChoice:
				return <ConfigTaggedFeatureChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
			case FeatureType.TitleChoice:
				return <ConfigTitleChoice data={props.feature.data} hero={props.hero} feature={props.feature} sourcebooks={props.sourcebooks} options={props.options} setData={data => props.setData(props.feature.id, data)} />;
		}

		return null;
	};

	const autoCalcAvailable = () => {
		return (props.feature.type === FeatureType.Text) && (AbilityLogic.getTextEffect(props.feature.description, props.hero) !== props.feature.description);
	};

	const getDescription = () => {
		let desc = '';

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
				{getConfig()}
			</div>
		</ErrorBoundary>
	);
};
