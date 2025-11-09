import { Segmented, Space } from 'antd';
import { Ancestry } from '@/models/ancestry';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { useState } from 'react';

import './ancestry-panel.scss';

interface Props {
	ancestry: Ancestry;
	sourcebooks: Sourcebook[];
	options: Options;
	hero?: Hero;
	mode?: PanelMode;
}

export const AncestryPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const isSignatureFeature = (feature: Feature) => {
		return !isPurchasedFeature(feature);
	};

	const isPurchasedFeature = (feature: Feature) => {
		return (feature.type === FeatureType.Choice) && (feature.data.count === 'ancestry');
	};

	const getOverview = () => {
		return (
			<Markdown text={props.ancestry.description} />
		);
	};

	const getSignatureFeatures = () => {
		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					props.ancestry.features.filter(isSignatureFeature).map(f => (
						<SelectablePanel key={f.id}>
							<FeaturePanel feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
						</SelectablePanel>
					))
				}
			</Space>
		);
	};

	const getPurchasedFeatures = () => {
		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Field label='Ancestry Points' value={props.ancestry.ancestryPoints} />
				{
					props.ancestry.features.filter(isPurchasedFeature).map(f => (
						<SelectablePanel key={f.id}>
							<FeaturePanel feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
						</SelectablePanel>
					))
				}
			</Space>
		);
	};

	const getContent = () => {
		let content = null;
		switch (page) {
			case 'overview':
				content = getOverview();
				break;
			case 'signature':
				content = getSignatureFeatures();
				break;
			case 'purchased':
				content = getPurchasedFeatures();
				break;
		}

		return (
			<>
				<Segmented
					style={{ marginBottom: '20px' }}
					block={true}
					options={[
						{ value: 'overview', label: 'Overview' },
						{ value: 'signature', label: 'Signature' },
						{ value: 'purchased', label: 'Purchased' }
					]}
					value={page}
					onChange={setPage}
				/>
				{content}
			</>
		);
	};

	const tags = [];
	if (props.sourcebooks.length > 0) {
		const sourcebookType = SourcebookLogic.getAncestrySourcebook(props.sourcebooks, props.ancestry)?.type || SourcebookType.Homebrew;
		if (sourcebookType !== SourcebookType.Official) {
			tags.push(sourcebookType);
		}
	}

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='ancestry-panel compact'>
				<HeaderText level={1} tags={tags}>
					{props.ancestry.name || 'Unnamed Ancestry'}
				</HeaderText>
				<Markdown text={props.ancestry.description} />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className='ancestry-panel' id={SheetFormatter.getPageId('ancestry', props.ancestry.id)}>
				<HeaderText level={1} tags={tags}>
					{props.ancestry.name || 'Unnamed Ancestry'}
				</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
