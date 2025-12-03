import { AbilityCustomization, Hero } from '@/models/hero';
import { CSSProperties, useState } from 'react';
import { Pill, ResourcePill } from '@/components/controls/pill/pill';
import { ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { Button } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { FollowerPanel } from '@/components/panels/elements/follower-panel/follower-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { InfoFeature } from '@/components/features/feature';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';

import './feature-panel.scss';

interface Props {
	feature: Feature | Perk;
	source?: string;
	options: Options;
	cost?: number | 'signature';
	repeatable?: boolean;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	style?: CSSProperties;
}

export const FeaturePanel = (props: Props) => {
	const [ autoCalc, setAutoCalc ] = useState<boolean>(true);

	const getTags = () => {
		const tags = [];

		const list = (props.feature as Perk).list;
		if (list !== undefined) {
			if (props.sourcebooks && (props.sourcebooks.length > 0)) {
				const sourcebookType = SourcebookLogic.getPerkSourcebook(props.sourcebooks, props.feature as Perk)?.type || SourcebookType.Official;
				if (sourcebookType !== SourcebookType.Official) {
					tags.push(sourcebookType);
				}
			}

			tags.push(list);
		}

		if (props.source) {
			tags.push(props.source);
		}

		if (props.feature.type === FeatureType.AddOn) {
			tags.push(props.feature.data.category);
		}

		if (props.feature.type === FeatureType.HeroicResource) {
			switch (props.feature.data.type) {
				case 'heroic':
					tags.push('Heroic Resource');
					break;
				case 'epic':
					tags.push('Epic Resource');
					break;
			}
		}

		if ((props.feature.type === FeatureType.Malice) || (props.feature.type === FeatureType.MaliceAbility)) {
			if (props.feature.data.echelon > 1) {
				tags.push(`Echelon ${props.feature.data.echelon}`);
			}
		}

		if (props.feature.type === FeatureType.TaggedFeature) {
			tags.push(props.feature.data.tag);
		}

		return tags;
	};

	const autoCalcAvailable = () => {
		return props.hero
			&& (props.feature.type === FeatureType.Text)
			&& (AbilityLogic.getTextEffect(props.feature.description, props.hero) !== props.feature.description);
	};

	if ((props.feature.type === FeatureType.Ability) || (props.feature.type === FeatureType.MaliceAbility)) {
		return (
			<AbilityPanel
				ability={props.feature.data.ability}
				hero={props.hero}
				cost={props.cost}
				repeatable={props.repeatable}
				mode={PanelMode.Full}
				tags={getTags()}
			/>
		);
	}

	if (props.feature.type === FeatureType.AncestryFeatureChoice) {
		if (props.feature.data.selected) {
			return (
				<FeaturePanel feature={props.feature.data.selected} options={props.options} style={props.style} />
			);
		}
	}

	if (props.feature.type === FeatureType.Follower) {
		return (
			<FollowerPanel follower={props.feature.data.follower} mode={PanelMode.Full} />
		);
	}

	let customization: AbilityCustomization | null = null;
	if (props.hero) {
		customization = props.hero.abilityCustomizations.find(ac => ac.abilityID === props.feature.id) || null;
	}

	return (
		<ErrorBoundary>
			<div className={props.mode === PanelMode.Full ? 'feature-panel' : 'feature-panel compact'} id={props.mode === PanelMode.Full ? SheetFormatter.getPageId('feaure', props.feature.id) : undefined} style={props.style}>
				<HeaderText
					ribbon={
						props.cost === 'signature' ?
							<Pill>Signature</Pill>
							:
							props.cost ?
								<ResourcePill value={props.cost} repeatable={props.repeatable} />
								: null
					}
					tags={getTags()}
					extra={
						autoCalcAvailable() ?
							<Button
								type='text'
								title='Auto-calculate damage, potency, etc'
								icon={autoCalc ? <ThunderboltFilled style={{ color: 'rgb(22, 119, 255)' }} /> : <ThunderboltOutlined />}
								onClick={e => { e.stopPropagation(); setAutoCalc(!autoCalc); }}
							/>
							: null
					}
				>
					{customization?.name || props.feature.name || 'Unnamed Feature'}
				</HeaderText>
				<Markdown
					text={
						(props.feature.type === FeatureType.Text) && autoCalc && props.hero ?
							AbilityLogic.getTextEffect(customization?.description || props.feature.description, props.hero)
							:
							(customization?.description || props.feature.description)
					}
				/>
				{
					props.mode === PanelMode.Full ?
						<InfoFeature
							feature={props.feature}
							hero={props.hero}
							sourcebooks={props.sourcebooks}
							options={props.options}
						/>
						: null
				}
				{
					customization && customization.notes ?
						<Field
							label='Notes'
							value={<Markdown text={customization.notes} useSpan={true} />}
						/>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
