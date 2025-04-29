import { Alert, Button, Flex, Input, Segmented, Space } from 'antd';
import { Collections } from '../../../../utils/collections';
import { Empty } from '../../../controls/empty/empty';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { HeroPanel } from '../../../panels/hero/hero-panel';
import { Modal } from '../../modal/modal';
import { Options } from '../../../../models/options';
import { PlusOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { useState } from 'react';

import './hero-select-modal.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
	onSelect: (heroes: Hero[]) => void;
}

export const HeroSelectModal = (props: Props) => {
	const [ mode, setMode ] = useState<string>('folder');
	const [ heroName, setHeroName ] = useState<string>('');

	try {
		const getContent = () => {
			switch (mode) {
				case 'folder': {
					const folders = Collections
						.distinct(props.heroes.map(h => h.folder), f => f)
						.sort()
						.filter(f => !!f);

					if (folders.length === 0) {
						return (
							<Empty text='No folders' />
						);
					}

					return folders.map(f => (
						<SelectablePanel
							key={f}
							onSelect={() => props.onSelect(props.heroes.filter(h => h.folder === f))}
						>
							<HeaderText level={1}>{f}</HeaderText>
							{
								props.heroes
									.filter(h => h.folder === f)
									.sort()
									.map(h => <Field key={h.id} label={h.name} value={HeroLogic.getHeroDescription(h)} />)
							}
						</SelectablePanel>
					));
				}
				case 'hero': {
					const heroes = props.heroes;

					if (heroes.length === 0) {
						return (
							<Empty text='No heroes' />
						);
					}

					return heroes.map(h => (
						<SelectablePanel
							key={h.id}
							onSelect={() => {
								props.onSelect([ h ]);
							}}
						>
							<HeroPanel hero={h} sourcebooks={props.sourcebooks} options={props.options} />
						</SelectablePanel>
					));
				}
				case 'simple': {
					return (
						<Space direction='vertical' style={{ width: '100%' }}>
							<Alert
								type='info'
								showIcon={true}
								message={(
									<>
										<div>
											If you don't have your party in Forge Steel, you can just add their names.
										</div>
										<div>
											You won't be able to track their stamina, but they'll be in the turn order and you'll still be able to track conditions.
										</div>
									</>
								)}
							/>
							<Flex align='center' justify='space-between' gap={10}>
								<Input
									placeholder='Name'
									allowClear={true}
									value={heroName}
									onChange={e => setHeroName(e.target.value)}
								/>
								<Button
									disabled={!heroName}
									type='primary'
									icon={<PlusOutlined />}
									onClick={() => {
										const hero = FactoryLogic.createHero([]);
										hero.name = heroName;
										setHeroName('');
										props.onSelect([ hero ]);
									}}
								/>
							</Flex>
						</Space>
					);
				}
			}

			return null;
		};

		return (
			<Modal
				toolbar={
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Segmented
							options={[
								{ value: 'folder', label: 'Folders' },
								{ value: 'hero', label: 'Heroes' },
								{ value: 'simple', label: 'Simple' }
							]}
							value={mode}
							onChange={setMode}
						/>
					</div>
				}
				content={
					<div className='hero-select-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{getContent()}
						</Space>
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
