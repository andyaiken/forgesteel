import { Button, Input, Popover, Space, Tabs, Upload } from 'antd';
import { DownloadOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Collections } from '../../../../utils/collections';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Hero } from '../../../../models/hero';
import { HeroPanel } from '../../../panels/hero/hero-panel';
import { Options } from '../../../../models/options';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

import './hero-list-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showRules: () => void;
	addHero: () => void;
	importHero: (hero: Hero) => void;
}

export const HeroListPage = (props: Props) => {
	const navigation = useNavigation();
	const { folder } = useParams<{ folder: string }>();
	const [ previousTab, setPreviousTab ] = useState<string | undefined>(folder);
	const [ currentTab, setCurrentTab ] = useState<string>(folder ?? '');
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	if (folder !== previousTab) {
		setCurrentTab(folder ?? '');
		setPreviousTab(folder);
	}

	const folders = Collections.distinct(props.heroes.map(h => h.folder).sort(), f => f);
	if (folders.length === 0) {
		folders.push('');
	}

	const getHeroes = (folder: string) => {
		return props.heroes
			.filter(h => h.folder === folder)
			.filter(h => Utils.textMatches([
				h.name,
				h.ancestry?.name || '',
				h.culture?.name || '',
				h.career?.name || '',
				h.class?.name || '',
				h.complication?.name || ''
			], searchTerm));
	};

	const getHeroesSection = (list: Hero[]) => {
		if (list.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='hero-section-row'>
				{
					list.map(hero => (
						<SelectablePanel key={hero.id} onSelect={() => navigation.goToHeroView(hero.id)}>
							<HeroPanel hero={hero} sourcebooks={props.sourcebooks} options={props.options} />
						</SelectablePanel>
					))
				}
			</div>
		);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='hero-list-page'>
					<AppHeader subheader='Heroes' showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll} showRules={props.showRules}>
						<Input
							placeholder='Search'
							allowClear={true}
							value={searchTerm}
							suffix={<SearchOutlined />}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<div className='divider' />
						<Popover
							trigger='click'
							content={(
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Space>
										<Button type='primary' block={true} icon={<PlusOutlined />} onClick={props.addHero}>Create</Button>
										<div className='ds-text'>or</div>
										<Upload
											style={{ width: '100%' }}
											accept='.drawsteel-hero'
											showUploadList={false}
											beforeUpload={file => {
												file
													.text()
													.then(json => {
														const hero = (JSON.parse(json) as Hero);
														props.importHero(hero);
													});
												return false;
											}}
										>
											<Button block={true} icon={<DownloadOutlined />}>Import</Button>
										</Upload>
									</Space>
								</div>
							)}
						>
							<Button type='primary' icon={<PlusOutlined />}>
								Add
							</Button>
						</Popover>
					</AppHeader>
					<div className='hero-list-page-content'>
						<Tabs
							activeKey={currentTab}
							items={folders.map(f => ({
								key: f,
								label: (
									<div className='section-header'>
										<div className='section-title'>{f || 'Heroes'}</div>
										<div className='section-count'>{getHeroes(f).length}</div>
									</div>
								),
								children: getHeroesSection(getHeroes(f))
							}))}
							onChange={folder => navigation.goToHeroList(folder)}
						/>
					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
