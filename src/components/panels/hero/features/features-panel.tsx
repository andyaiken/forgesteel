import { Select, Space, Tag } from 'antd';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { Collections } from '@/utils/collections';
import { EllipsisOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { FeaturePanel } from '../../elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { LabelControl } from '@/components/controls/label-control/label-control';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './features-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	onSelectFeature: (feature: Feature) => void;
}

export const FeaturesPanel = (props: Props) => {
	const [ featureSearch, setFeatureSearch ] = useState<string>('');
	const [ featureSort, setFeatureSort ] = useState<string>('az');
	const [ featureAll, setFeatureAll ] = useState<boolean>(false);

	const features = HeroLogic.getFeatures(props.hero)
		.filter(f => {
			if (featureAll) {
				const featureTypes = [ FeatureType.Ability, FeatureType.ClassAbility, FeatureType.Companion, FeatureType.Follower, FeatureType.Retainer ];
				return !featureTypes.includes(f.feature.type);
			}

			const featureTypes = [ FeatureType.Text, FeatureType.HeroicResource, FeatureType.Package ];
			return featureTypes.includes(f.feature.type);
		})
		.filter(f => Utils.textMatches([ f.feature.name, f.feature.description ], featureSearch))
		.sort((a, b) => {
			switch (featureSort) {
				case 'az':
					return a.feature.name.localeCompare(b.feature.name);
				case 'lvl':
					return (a.level || 0) - (b.level || 0) || a.feature.name.localeCompare(b.feature.name);
				case 'src':
					return a.source.localeCompare(b.source) || a.feature.name.localeCompare(b.feature.name);
			}

			return 0;
		});

	const getBucketName = (feature: { feature: Feature, source: string, level: number | undefined }) => {
		switch (featureSort) {
			case 'az':
				return 'Features';
			case 'lvl':
				return `Level ${feature.level || 1}`;
			case 'src':
				return feature.source || 'Features';
		}

		return '';
	};

	let buckets: { name: string, features: { feature: Feature, source: string, level: number | undefined }[] }[] = [];
	features.forEach(f => {
		const bucketName = getBucketName(f);
		let bucket = buckets.find(b => b.name === bucketName);
		if (!bucket) {
			bucket = { name: bucketName, features: [] };
			buckets.push(bucket);
		}
		bucket.features.push(f);
	});
	if (featureSort !== 'lvl') {
		buckets = Collections.sort(buckets, b => b.name);
	}
	if (buckets.length === 0) {
		buckets.push({ name: 'Features', features: [] });
	}

	const getRow = (data: { feature: Feature, source: string, level: number | undefined }) => {
		return (
			<div key={data.feature.id} className='selectable-row clickable' onClick={() => props.onSelectFeature(data.feature)}>
				<div><b>{data.feature.name}</b></div>
				{props.options.showSources ? <Tag variant='outlined'>{data.source}</Tag> : null}
			</div>
		);
	};

	const useRows = props.options.compactView;

	const controls = (
		<ButtonGroup
			buttons={[
				{
					type: 'control',
					control: (
						<SearchBox searchTerm={featureSearch} setSearchTerm={setFeatureSearch} />
					)
				},
				{
					type: 'dropdown',
					tooltip: 'Feature Options',
					icon: <EllipsisOutlined />,
					popover: (
						<Space orientation='vertical' style={{ width: '300px' }}>
							<LabelControl
								label='Organize'
								control={
									<Select
										style={{ width: '100%' }}
										options={[
											{ label: 'Alphabetical', value: 'az' },
											{ label: 'Group by level', value: 'lvl' },
											{ label: 'Group by source', value: 'src' }
										]}
										optionRender={o => <div className='ds-text'>{o.label}</div>}
										value={featureSort}
										onChange={setFeatureSort}
									/>
								}
							/>
							<Toggle label='All Features' value={featureAll} onChange={setFeatureAll} />
						</Space>
					)
				}
			]}
		/>
	);

	return (
		<ErrorBoundary>
			<div className='features-section'>
				{
					buckets.map((bucket, n) =>
						<div key={n}>
							<HeaderText extra={n === 0 ? controls : null}>
								{bucket.name}
							</HeaderText>
							<Space orientation='vertical' style={{ width: '100%' }}>
								{
									bucket.features.map(f =>
										useRows ?
											getRow(f)
											:
											<SelectablePanel key={f.feature.id} onSelect={() => props.onSelectFeature(f.feature)}>
												<FeaturePanel
													feature={f.feature}
													source={props.options.showSources ? (f.level ? `${f.source} (level ${f.level})` : f.source) : undefined}
													options={props.options}
													hero={props.hero}
													sourcebooks={props.sourcebooks}
													mode={PanelMode.Full}
												/>
											</SelectablePanel>
									)
								}
							</Space>
						</div>
					)
				}
			</div>
		</ErrorBoundary>
	);
};
