import { ColorPicker, Flex, Popover, Segmented, Space, Tabs } from 'antd';
import { DangerButton } from '../../../../controls/danger-button/danger-button';
import { MapItemStyle } from '../tactical-map-panel';
import { MapZone } from '../../../../../models/tactical-map';
import { Markdown } from '../../../../controls/markdown/markdown';
import { MultiLine } from '../../../../controls/multi-line/multi-line';
import { NumberSpin } from '../../../../controls/number-spin/number-spin';
import { TacticalMapDisplayType } from '../../../../../enums/tactical-map-display-type';
import { Utils } from '../../../../../utils/utils';
import { useState } from 'react';

import './map-zone.scss';

interface Props {
	zone: MapZone;
	display: TacticalMapDisplayType;
	selectable: boolean;
	style: MapItemStyle;
	updateZone: (zone: MapZone) => void;
	deleteZone: (zone: MapZone) => void;
}

export const MapZonePanel = (props: Props) => {
	const [ zone, setZone ] = useState<MapZone>(Utils.copy(props.zone));
	const [ selected, setSelected ] = useState<boolean>(false);

	const onOpenChange = (value: boolean) => {
		const displays = [ TacticalMapDisplayType.DirectorView, TacticalMapDisplayType.DirectorEdit ];
		if (displays.includes(props.display)) {
			setSelected(value);
		}
	};

	const getEditor = () => {
		const setNotes = (value: string) => {
			const copy = Utils.copy(zone);
			copy.notes = value;
			setZone(copy);
			props.updateZone(copy);
		};

		const setX = (value: number) => {
			const copy = Utils.copy(zone);
			copy.position.x = value;
			setZone(copy);
			props.updateZone(copy);
		};

		const setY = (value: number) => {
			const copy = Utils.copy(zone);
			copy.position.y = value;
			setZone(copy);
			props.updateZone(copy);
		};

		const setWidth = (value: number) => {
			const copy = Utils.copy(zone);
			copy.dimensions.width = value;
			setZone(copy);
			props.updateZone(copy);
		};

		const setHeight = (value: number) => {
			const copy = Utils.copy(zone);
			copy.dimensions.height = value;
			setZone(copy);
			props.updateZone(copy);
		};

		const setColor = (value: string) => {
			const copy = Utils.copy(zone);
			copy.color = value;
			setZone(copy);
			props.updateZone(copy);
		};

		const setCorners = (value: 'square' | 'rounded' | 'circle') => {
			const copy = Utils.copy(zone);
			copy.corners = value;
			setZone(copy);
			props.updateZone(copy);
		};

		return (
			<Tabs
				style={{ width: '300px' }}
				items={[
					{
						key: '1',
						label: 'Notes',
						children: (
							<MultiLine label='Notes' value={zone.notes} onChange={setNotes} />
						)
					},
					{
						key: '2',
						label: 'Edit',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								<Flex>
									<div style={{ flex: '1 1 0' }}>
										<NumberSpin label='X' value={zone.position.x} onChange={setX} />
										<NumberSpin label='Y' value={zone.position.y} onChange={setY} />
									</div>
									<div style={{ flex: '1 1 0' }}>
										<NumberSpin label='Width' min={1} value={zone.dimensions.width} onChange={setWidth} />
										<NumberSpin label='Height' min={1} value={zone.dimensions.height} onChange={setHeight} />
									</div>
								</Flex>
							</Space>
						)
					},
					{
						key: '3',
						label: 'Appearance',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								<Flex gap={10}>
									<Segmented
										style={{ flex: '1 1 0' }}
										block={true}
										options={[
											{ value: 'square', label: 'Square' },
											{ value: 'rounded', label: 'Rounded' },
											{ value: 'circle', label: 'Circle' }
										]}
										value={zone.corners}
										onChange={setCorners}
									/>
									<ColorPicker
										style={{ flex: '0 0 auto' }}
										format='hex'
										value={zone.color}
										onChange={c => setColor(c.toHex())}
									/>
								</Flex>
							</Space>
						)
					}
				]}
				tabBarExtraContent={
					<DangerButton mode='clear' onConfirm={() => props.deleteZone(zone)} />
				}
			/>
		);
	};

	const getInfo = () => {
		if (!zone.notes) {
			return null;
		}

		return (
			<Markdown text={zone.notes} />
		);
	};

	try {
		let className = 'map-zone-panel ' + props.display;
		if (props.selectable) {
			className += ' selectable';
		}
		if (selected) {
			className += ' selected';
		}

		return (
			<Popover
				content={props.selectable ? getEditor() : getInfo()}
				trigger={props.selectable ? 'click' : 'hover'}
				open={selected}
				onOpenChange={onOpenChange}
			>
				<div
					className={className}
					style={props.style}
				>
					<div className='zone-content' style={{ borderRadius: props.style.borderRadius, backgroundColor: `#${zone.color}` }} />
				</div>
			</Popover>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
