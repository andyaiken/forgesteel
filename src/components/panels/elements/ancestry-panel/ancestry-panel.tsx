import { Segmented, Space } from 'antd';
import { Ancestry } from '@/models/ancestry';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeatureFlags } from '@/utils/feature-flags';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { useState } from 'react';

import './ancestry-panel.scss';

interface Props {
	ancestry: Ancestry;
	options: Options;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
}

export const AncestryPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('overview');

	const isInteractive = FeatureFlags.hasFlag(FeatureFlags.interactiveContent.code) && props.options.showInteractivePanels;

	const getOverview = () => {
		return (
			<Markdown text={props.ancestry.description} />
		);
	};

	const getSignatureFeatures = () => {
		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					props.ancestry.features.filter(f => f.type !== FeatureType.Choice).map(f => (
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
					props.ancestry.features.filter(f => f.type === FeatureType.Choice).map(f => (
						<SelectablePanel key={f.id}>
							<FeaturePanel feature={f} options={props.options} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
						</SelectablePanel>
					))
				}
			</Space>
		);
	};

	const getContent = () => {
		if (isInteractive) {
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
		}

		return (
			<>
				{getOverview()}
				{getSignatureFeatures()}
				{getPurchasedFeatures()}
			</>
		);
	};

	if (props.mode !== PanelMode.Full) {
		return (
			<div className='ancestry-panel compact'>
				<HeaderText level={1}>
					{props.ancestry.name || 'Unnamed Ancestry'}
				</HeaderText>
				<Markdown text={props.ancestry.description} />
			</div>
		);
	}

	let className = 'ancestry-panel';
	if (isInteractive) {
		className += ' interactive';
	}

	return (
		<ErrorBoundary>
			<div className={className} id={props.ancestry.id}>
				<HeaderText level={1}>
					{props.ancestry.name || 'Unnamed Ancestry'}
				</HeaderText>
				{getContent()}
			</div>
		</ErrorBoundary>
	);
};
