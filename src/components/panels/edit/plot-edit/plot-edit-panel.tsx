import { Button, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Plot, PlotContent, PlotLink } from '../../../../models/plot';
import { Adventure } from '../../../../models/adventure';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { Field } from '../../../controls/field/field';
import { Format } from '../../../../utils/format';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { Playbook } from '../../../../models/playbook';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './plot-edit-panel.scss';

interface Props {
	plot: Plot;
	adventure: Adventure;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	onChange: (plot: Plot) => void;
}

export const PlotEditPanel = (props: Props) => {
	const [ plot, setPlot ] = useState<Plot>(props.plot);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(plot);
			copy.name = value;
			setPlot(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(plot);
			copy.description = value;
			setPlot(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					status={plot.name === '' ? 'warning' : ''}
					placeholder='Name'
					allowClear={true}
					value={plot.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine label='Description' value={plot.description} onChange={setDescription} />
			</Space>
		);
	};

	const getContentSection = () => {
		const addContent = () => {
			const copy = Utils.copy(plot);
			copy.content.push({
				id: Utils.guid(),
				type: 'encounter',
				contentID: null
			});
			setPlot(copy);
			props.onChange(copy);
		};

		const setContentType = (content: PlotContent, value: 'encounter' | 'montage' | 'negotiation' | 'map' | 'item' | 'monster') => {
			const copy = Utils.copy(plot);
			const index = copy.content.findIndex(c => c.id === content.id);
			if (index !== -1) {
				copy.content[index].type = value;
				copy.content[index].contentID = null;
			}
			setPlot(copy);
			props.onChange(copy);
		};

		const setContentID = (content: PlotContent, value: string) => {
			const copy = Utils.copy(plot);
			const index = copy.content.findIndex(c => c.id === content.id);
			if (index !== -1) {
				copy.content[index].contentID = value;
			}
			setPlot(copy);
			props.onChange(copy);
		};

		const moveContent = (content: PlotContent, direction: 'up' | 'down') => {
			const copy = Utils.copy(plot);
			const index = copy.content.findIndex(c => c.id === content.id);
			copy.content = Collections.move(copy.content, index, direction);
			setPlot(copy);
			props.onChange(copy);
		};

		const deleteContent = (content: PlotContent) => {
			const copy = Utils.copy(plot);
			copy.content = copy.content.filter(c => c.id !== content.id);
			setPlot(copy);
			props.onChange(copy);
		};

		const getContentOptions = (type: 'encounter' | 'montage' | 'negotiation' | 'map' | 'item' | 'monster') => {
			switch (type) {
				case 'encounter':
					return props.playbook.encounters;
				case 'montage':
					return props.playbook.montages;
				case 'negotiation':
					return props.playbook.negotiations;
				case 'map':
					return props.playbook.tacticalMaps;
				case 'item':
					return Collections.sort(props.sourcebooks.flatMap(sb => sb.items), i => i.name);
				case 'monster':
					return Collections.sort(props.sourcebooks.flatMap(sb => sb.monsterGroups).flatMap(mg => mg.monsters), m => m.name);
			}
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					plot.content.map(c => (
						<Expander
							key={c.id}
							title={Format.capitalize(c.type)}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveContent(c, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveContent(c, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteContent(c); }} />
							]}
						>
							<HeaderText>Type</HeaderText>
							<Segmented
								name='contenttypes'
								block={true}
								options={[ 'encounter', 'montage', 'negotiation', 'map', 'item', 'monster' ].map(t => ({ value: t, label: Format.capitalize(t) }))}
								value={c.type}
								onChange={type => setContentType(c, type as 'encounter' | 'montage' | 'negotiation' | 'map' | 'item' | 'monster')}
							/>
							<HeaderText>Content</HeaderText>
							<Select
								style={{ width: '100%' }}
								allowClear={true}
								placeholder='Select'
								options={getContentOptions(c.type).map(o => ({ value: o.id, label: o.name || 'Unnamed Content', desc: o.description }))}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								showSearch={true}
								filterOption={(input, option) => {
									const strings = option ?
										[
											option.label,
											option.desc
										]
										: [];
									return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
								}}
								value={c.contentID}
								onChange={id => setContentID(c, id)}
							/>
						</Expander>
					))
				}
				{
					plot.content.length === 0 ?
						<Empty text='No content' />
						: null
				}
				<Button block={true} onClick={addContent}>
					<PlusOutlined />
					Add a new piece of content
				</Button>
			</Space>
		);
	};

	const getLinksSection = () => {
		const addLink = () => {
			const copy = Utils.copy(plot);
			copy.links.push({
				id: Utils.guid(),
				plotID: '',
				label: ''
			});
			setPlot(copy);
			props.onChange(copy);
		};

		const setLinkPlotID = (link: PlotLink, value: string) => {
			const copy = Utils.copy(plot);
			const index = copy.links.findIndex(l => l.id === link.id);
			if (index !== -1) {
				copy.links[index].plotID = value;
			}
			setPlot(copy);
			props.onChange(copy);
		};

		const setLinkLabel = (link: PlotLink, value: string) => {
			const copy = Utils.copy(plot);
			const index = copy.links.findIndex(l => l.id === link.id);
			if (index !== -1) {
				copy.links[index].label = value;
			}
			setPlot(copy);
			props.onChange(copy);
		};

		const moveLink = (link: PlotLink, direction: 'up' | 'down') => {
			const copy = Utils.copy(plot);
			const index = copy.links.findIndex(l => l.id === link.id);
			copy.links = Collections.move(copy.links, index, direction);
			setPlot(copy);
			props.onChange(copy);
		};

		const deleteLink = (link: PlotLink) => {
			const copy = Utils.copy(plot);
			copy.links = copy.links.filter(l => l.id !== link.id);
			setPlot(copy);
			props.onChange(copy);
		};

		const parentPlot = PlaybookLogic.getPlotPointParent(props.adventure.plot, plot.id);

		const getLinkTargets = (link: PlotLink) => {
			if (parentPlot) {
				const upstreamIDs = PlaybookLogic.getUpstreamPlotPoints(parentPlot, plot.id).map(p => p.id);
				return parentPlot.plots.filter(p => (link.plotID === p.id) || !upstreamIDs.includes(p.id));
			}

			return [];
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					plot.links.map(l => (
						<Expander
							key={l.id}
							title={FormatLogic.getPlotLinkTitle(l, parentPlot!)}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveLink(l, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveLink(l, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteLink(l); }} />
							]}
						>
							<HeaderText>Link To</HeaderText>
							<Select
								style={{ width: '100%' }}
								allowClear={true}
								placeholder='Select'
								options={getLinkTargets(l).map(o => ({ value: o.id, label: o.name, desc: o.description }))}
								optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
								showSearch={true}
								filterOption={(input, option) => {
									const strings = option ?
										[
											option.label,
											option.desc
										]
										: [];
									return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
								}}
								value={l.plotID}
								onChange={id => setLinkPlotID(l, id)}
							/>
							<HeaderText>Label</HeaderText>
							<Input
								placeholder='Label'
								allowClear={true}
								value={l.label}
								onChange={e => setLinkLabel(l, e.target.value)}
							/>
						</Expander>
					))
				}
				{
					plot.links.length === 0 ?
						<Empty text='No links' />
						: null
				}
				<Button block={true} onClick={addLink}>
					<PlusOutlined />
					Add a new link
				</Button>
			</Space>
		);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='plot-edit-panel'>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Plot Point',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Content',
								children: getContentSection()
							},
							{
								key: '3',
								label: 'Links',
								children: getLinksSection()
							}
						]}
					/>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
