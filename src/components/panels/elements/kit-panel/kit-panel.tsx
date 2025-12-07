import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Kit } from '@/models/kit';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Segmented } from 'antd';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { useState } from 'react';

import './kit-panel.scss';

interface Props {
	kit: Kit;
	sourcebooks: Sourcebook[];
	options: Options;
	hero?: Hero;
	mode?: PanelMode;
}

export const KitPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const getOverview = () => {
		return (
			<>
				<Markdown text={props.kit.description} />
				<Field label='Uses' value={[ ...props.kit.armor, ...props.kit.weapon ].join(', ')} />
				<Field label='Features' value={props.kit.features.map(f => f.name).join(', ')} />
			</>
		);
	};

	const getStats = () => {
		return (
			<>
				{props.kit.armor.length > 0 ? <Field label='Armor' value={props.kit.armor.join(', ')} /> : null}
				{props.kit.weapon.length > 0 ? <Field label='Weapon' value={props.kit.weapon.join(', ')} /> : null}
				{props.kit.stamina > 0 ? <Field label='Stamina' value={`+${props.kit.stamina}`} /> : null}
				{props.kit.speed > 0 ? <Field label='Speed' value={`+${props.kit.speed}`} /> : null}
				{props.kit.stability > 0 ? <Field label='Stability' value={`+${props.kit.stability}`} /> : null}
				{
					props.kit.meleeDamage ?
						<Field label='Melee Damage' value={`+${props.kit.meleeDamage.tier1} / +${props.kit.meleeDamage.tier2} / +${props.kit.meleeDamage.tier3}`} />
						: null
				}
				{
					props.kit.rangedDamage ?
						<Field label='Ranged Damage' value={`+${props.kit.rangedDamage.tier1} / +${props.kit.rangedDamage.tier2} / +${props.kit.rangedDamage.tier3}`} />
						: null
				}
				{props.kit.meleeDistance > 0 ? <Field label='Melee Distance' value={`+${props.kit.meleeDistance}`} /> : null}
				{props.kit.rangedDistance > 0 ? <Field label='Ranged Distance' value={`+${props.kit.rangedDistance}`} /> : null}
				{props.kit.disengage > 0 ? <Field label='Disengage' value={`+${props.kit.disengage}`} /> : null}
			</>
		);
	};

	const getFeatures = () => {
		return (
			<>
				{props.kit.features.map(f => <FeaturePanel key={f.id} feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />)}
			</>
		);
	};

	const getContent = () => {
		let content = null;
		switch (page) {
			case 'overview':
				content = getOverview();
				break;
			case 'stats':
				content = getStats();
				break;
			case 'features':
				content = getFeatures();
				break;
		}

		return (
			<>
				<Segmented
					style={{ marginBottom: '20px' }}
					block={true}
					options={[
						{ value: 'overview', label: 'Overview' },
						{ value: 'stats', label: 'Stats' },
						{ value: 'features', label: 'Features' }
					]}
					value={page}
					onChange={setPage}
				/>
				{content}
			</>
		);
	};

	const tags = [];
	if (props.kit.type) {
		tags.push(props.kit.type);
	}
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getKitSourcebook(props.sourcebooks, props.kit)?.type || SourcebookType.Official;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='kit-panel compact'>
				<HeaderText level={1} tags={tags}>
					{props.kit.name || 'Unnamed Kit'}
				</HeaderText>
				<Markdown text={props.kit.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='kit-panel' id={SheetFormatter.getPageId('kit', props.kit.id)}>
				<HeaderText level={1} tags={tags}>{props.kit.name || 'Unnamed Kit'}</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
