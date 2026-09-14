import { Button, Drawer, Space } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { Collections } from '@/utils/collections';
import { CreatureLogic } from '@/logic/creature-logic';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { Expander } from '@/components/controls/expander/expander';
import { FeatureLogic } from '@/logic/feature-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { ImportCodeModal } from '@/components/modals/import-code/import-code-modal';
import { Modal } from '@/components/modals/modal/modal';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';
import { TitleSelectModal } from '@/components/modals/select/title-select/title-select-modal';
import { Utils } from '@/utils/utils';

import './hero-titles-modal.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	onClose: () => void;
	onChange: (hero: Hero) => void;
	onCustomize: () => void;
}

export const HeroTitlesModal = (props: Props) => {
	const [ hero, setHero ] = useState<Hero>(Utils.copy(props.hero));
	const [ titlesVisible, setTitlesVisible ] = useState<boolean>(false);
	const [ importVisible, setImportVisible ] = useState<boolean>(false);

	useEffect(() => {
		setHero(Utils.copy(props.hero));
	}, [ props.hero ]);

	const addTitle = (title: Title) => {
		const copy = Utils.copy(hero);
		copy.state.titles.push(Utils.copy(title));
		setHero(copy);
		setTitlesVisible(false);
		props.onChange(copy);
	};

	const importTitle = (title: Title) => {
		const copy = Utils.copy(title);
		copy.id = Utils.guid();
		copy.features.forEach(FeatureLogic.changeFeatureIDs);
		copy.selectedFeatureID = '';

		addTitle(copy);
		setImportVisible(false);
	};

	const changeTitle = (title: Title) => {
		const copy = Utils.copy(hero);
		const index = copy.state.titles.findIndex(t => t.id === title.id);
		copy.state.titles[index] = title;
		setHero(copy);
		props.onChange(copy);
	};

	const moveTitle = (title: Title, direction: 'up' | 'down') => {
		const copy = Utils.copy(hero);
		const index = copy.state.titles.findIndex(p => p.id === title.id);
		copy.state.titles = Collections.move(copy.state.titles, index, direction);
		setHero(copy);
		props.onChange(copy);
	};

	const deleteTitle = (title: Title) => {
		const copy = Utils.copy(hero);
		copy.state.titles = copy.state.titles.filter(p => p.id !== title.id);
		setHero(copy);
		props.onChange(copy);
	};

	const echelon = CreatureLogic.getEchelon(hero.class?.level || 1);

	return (
		<Modal
			content={
				<div className='hero-titles-modal'>
					<Space orientation='vertical' style={{ width: '100%', paddingBottom: '20px' }}>
						<HeaderText
							extra={
								<ButtonGroup
									buttons={[
										{ type: 'button', icon: <PlusOutlined />, tooltip: 'Add a title', onClick: () => setTitlesVisible(true) },
										{ type: 'button', icon: <DownloadOutlined />, tooltip: 'Import a code', onClick: () => setImportVisible(true) }
									]}
								/>
							}
						>
							Titles
						</HeaderText>
						<Expander title='Checklist'>
							<table>
								<thead>
									<tr>
										<th>Title</th>
										<th>Prerequisites</th>
									</tr>
								</thead>
								<tbody>
									{
										SourcebookLogic.getTitles(props.sourcebooks)
											.filter(title => title.echelon <= echelon)
											.map(title => (
												<tr key={title.id}>
													<td>{title.name}</td>
													<td>{title.prerequisites}</td>
												</tr>
											))
									}
								</tbody>
							</table>
						</Expander>
						{
							(() => {
								const titlesList = HeroLogic.getTitles(hero);
								return (
									<>
										{titlesList.map(title => {
											const inState = hero.state.titles.some(t => t.id === title.id);
											return (
												<Expander
													key={title.id}
													title={title.name}
													tags={[ `Echelon ${title.echelon}` ]}
													extra={
														inState
															? [
																<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveTitle(title, 'up'); }} />,
																<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveTitle(title, 'down'); }} />,
																<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteTitle(title); }} />

															]
															: undefined
													}
												>
													<TitlePanel
														title={title}
														hero={hero}
														sourcebooks={props.sourcebooks}
														mode={PanelMode.Full}
														onChange={inState ? changeTitle : undefined}
													/>
												</Expander>
											);
										})}
										{titlesList.length === 0 ? <Empty text='You have no titles.' /> : null}
									</>
								);
							})()
						}
					</Space>
					<Drawer open={titlesVisible} onClose={() => setTitlesVisible(false)} closeIcon={null} size={500}>
						{
							titlesVisible ?
								<TitleSelectModal
									hero={hero}
									sourcebooks={props.sourcebooks}
									onSelect={addTitle}
									onCustomize={props.onCustomize}
									onClose={() => setTitlesVisible(false)}
								/>
								: null
						}
					</Drawer>
					<Drawer open={importVisible} onClose={() => setImportVisible(false)} closeIcon={null} size={500}>
						{
							importVisible ?
								<ImportCodeModal
									kind='title'
									hero={hero}
									sourcebooks={props.sourcebooks}
									onImport={element => importTitle(element as Title)}
									onClose={() => setImportVisible(false)}
								/>
								: null
						}
					</Drawer>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
