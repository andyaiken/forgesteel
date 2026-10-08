import { Button, Drawer, Space } from 'antd';
import { Extension } from '@/models/extension';
import { ExtensionLogic } from '@/logic/extension-logic';
import { ExtensionPanel } from '@/components/panels/elements/extension-panel/extension-panel';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Info } from '@/components/controls/info/info';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Modal } from '@/components/modals/modal/modal';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Toggle } from '@/components/controls/toggle/toggle';
import { useState } from 'react';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	setExtensionIDs: (extensionIDs: string[]) => void;
}

// Lists the homebrew extensions that are aimed at the hero's build, so the player can choose which ones the hero uses
export const HeroExtensionsPanel = (props: Props) => {
	const [ selected, setSelected ] = useState<Extension | null>(null);

	// The elements in the hero's build that extensions could be aimed at
	const targetIDs = [
		...(props.hero.ancestry ? [ props.hero.ancestry.id ] : []),
		...(props.hero.class ? [ props.hero.class.id, ...props.hero.class.subclasses.filter(sc => sc.selected).map(sc => sc.id) ] : []),
		...HeroLogic.getKits(props.hero).map(k => k.id),
		...HeroLogic.getDomains(props.hero).map(d => d.id)
	];

	const available = ExtensionLogic.getExtensionsFor(targetIDs, props.sourcebooks);
	if (available.length === 0) {
		return null;
	}

	const setApproved = (extensionID: string, value: boolean) => {
		const ids = props.hero.extensionIDs.filter(id => id !== extensionID);
		if (value) {
			ids.push(extensionID);
		}
		props.setExtensionIDs(ids);
	};

	return (
		<SelectablePanel>
			<HeaderText
				extra={<Info>Homebrew extensions add to or change official content. Your hero only uses the ones you switch on here.</Info>}
			>
				Extensions
			</HeaderText>
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					available.map(a => (
						<Toggle
							key={a.extension.id}
							label={
								<div>
									<div className='ds-text'>{a.extension.name || 'Unnamed Extension'}</div>
									<div className='ds-text dimmed-text small-text'>
										{ExtensionLogic.getTarget(a.extension, props.sourcebooks)?.element.name || 'Unknown'} · {a.sourcebook.name || 'Unnamed Sourcebook'}
										<Button
											type='link'
											size='small'
											icon={<InfoCircleOutlined />}
											onClick={e => {
												e.stopPropagation();
												setSelected(a.extension);
											}}
										/>
									</div>
								</div>
							}
							value={props.hero.extensionIDs.includes(a.extension.id)}
							onChange={value => setApproved(a.extension.id, value)}
						/>
					))
				}
			</Space>
			<Drawer open={!!selected} onClose={() => setSelected(null)} closeIcon={null} size={500}>
				<Modal
					content={selected ? <ExtensionPanel extension={selected} sourcebooks={props.sourcebooks} mode={PanelMode.Full} /> : null}
					onClose={() => setSelected(null)}
				/>
			</Drawer>
		</SelectablePanel>
	);
};
