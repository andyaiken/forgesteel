import { Button, Divider, Popover } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { AppHeader } from '../../../panels/app-header/app-header';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { DropdownButton } from '../../../controls/dropdown-button/dropdown-button';
import { Hero } from '../../../../models/hero';
import { HeroPanel } from '../../../panels/elements/hero-panel/hero-panel';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { Toggle } from '../../../controls/toggle/toggle';
import { useMemo } from 'react';
import { useModals } from '../../../../hooks/use-modals';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './hero-view-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	setOptions: (options: Options) => void;
	exportHero: (heroId: string, format: 'image' | 'pdf' | 'json') => void;
	deleteHero: (heroId: string) => Promise<void>;
}

const getHero = (heroId: string, heroes: Hero[]) => heroes.find(h => h.id === heroId)!;

export const HeroPage = (props: Props) => {
	const modals = useModals();
	const navigation = useNavigation();
	const { heroId } = useParams<{ heroId: string }>();
	const hero = useMemo(() => getHero(heroId!, props.heroes), [ heroId, props.heroes ]);

	try {
		const setShowSkillsInGroups = (value: boolean) => {
			const copy = JSON.parse(JSON.stringify(props.options)) as Options;
			copy.showSkillsInGroups = value;
			props.setOptions(copy);
		};

		const setShowFreeStrikes = (value: boolean) => {
			const copy = JSON.parse(JSON.stringify(props.options)) as Options;
			copy.showFreeStrikes = value;
			props.setOptions(copy);
		};

		const setShowStandardAbilities = (value: boolean) => {
			const copy = JSON.parse(JSON.stringify(props.options)) as Options;
			copy.showStandardAbilities = value;
			props.setOptions(copy);
		};

		const setDimUnavailableAbilities = (value: boolean) => {
			const copy = JSON.parse(JSON.stringify(props.options)) as Options;
			copy.dimUnavailableAbilities = value;
			props.setOptions(copy);
		};

		return (
			<div className='hero-view-page'>
				<AppHeader breadcrumbs={[ { label: 'Heroes' } ]}>
					<Button onClick={navigation.goToHeroList}>
						Close
					</Button>
					<Button onClick={() => modals.showHeroState(heroId!, 'hero')}>
						State
					</Button>
					<Button onClick={() => modals.showHeroRules(heroId!)}>
						Rules
					</Button>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Toggle label='Show skills in groups' value={props.options.showSkillsInGroups} onChange={setShowSkillsInGroups} />
								<Toggle label='Show free strikes' value={props.options.showFreeStrikes} onChange={setShowFreeStrikes} />
								<Toggle label='Show standard abilities' value={props.options.showStandardAbilities} onChange={setShowStandardAbilities} />
								<Toggle label='Dim unavailable abilities' value={props.options.dimUnavailableAbilities} onChange={setDimUnavailableAbilities} />
								<Divider />
								<DropdownButton
									label='Export'
									items={[
										{
											key: 'image',
											label: <div className='ds-text centered-text'>Export As Image</div>
										},
										{
											key: 'pdf',
											label: <div className='ds-text centered-text'>Export As PDF</div>
										},
										{
											key: 'json',
											label: <div className='ds-text centered-text'>Export As Data</div>
										}
									]}
									onClick={key => props.exportHero(heroId!, key as 'image' | 'pdf' | 'json')}
								/>
								<Button icon={<EditOutlined />} onClick={() => navigation.goToHeroEdit(heroId!)}>Edit</Button>
								<DangerButton onConfirm={async () => { await props.deleteHero(heroId!); navigation.goToHeroList(); }} />
							</div>
						)}
					>
						<Button>
							Options
							<DownOutlined />
						</Button>
					</Popover>
				</AppHeader>
				<div className='hero-view-page-content'>
					<HeroPanel
						hero={hero}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
