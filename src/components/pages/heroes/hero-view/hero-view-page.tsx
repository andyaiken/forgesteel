import { Button, Divider, Popover } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { Complication } from '../../../../models/complication';
import { Culture } from '../../../../models/culture';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Domain } from '../../../../models/domain';
import { DropdownButton } from '../../../controls/dropdown-button/dropdown-button';
import { HeroClass } from '../../../../models/class';
import { HeroPanel } from '../../../panels/elements/hero-panel/hero-panel';
import { Kit } from '../../../../models/kit';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Toggle } from '../../../controls/toggle/toggle';
import { useModals } from '../../../../hooks/use-modals';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { usePersistedHero } from '../../../../hooks/use-persisted-hero';
import { usePersistedHeroes } from '../../../../hooks/use-persisted-heroes';

import './hero-view-page.scss';

interface Props {
	options: Options;
	setOptions: (options: Options) => void;
	goHome: () => void;
	closeHero: () => void;
	editHero: (heroId: string) => void;
	onSelectCulture: (culture: Culture) => void;
	onSelectCareer: (career: Career) => void;
	onSelectClass: (heroClass: HeroClass) => void;
	onSelectComplication: (complication: Complication) => void;
	onSelectDomain: (domain: Domain) => void;
	onSelectKit: (kit: Kit) => void;
}

export const HeroPage = (props: Props) => {
	const modals = useModals();
	const navigation = useNavigation();
	const { heroId } = useParams<{ heroId: string }>();
	const { exportHero, deleteHero } = usePersistedHeroes();
	const hero = usePersistedHero(heroId!);
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
				<AppHeader subtitle='Heroes' goHome={props.goHome}>
					<Button onClick={props.closeHero}>
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
									onClick={key => exportHero(heroId!, key as 'image' | 'pdf' | 'json')}
								/>
								<Button icon={<EditOutlined />} onClick={() => (props).editHero(heroId!)}>Edit</Button>
								<DangerButton onConfirm={async () => { await deleteHero(heroId!); navigation.goToHeroList(); }} />
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
					{
						hero
							? <HeroPanel
								hero={hero}
								options={props.options}
								mode={PanelMode.Full}
								onSelectCulture={props.onSelectCulture}
								onSelectCareer={props.onSelectCareer}
								onSelectClass={props.onSelectClass}
								onSelectComplication={props.onSelectComplication}
								onSelectDomain={props.onSelectDomain}
								onSelectKit={props.onSelectKit}
							/>
							: null
					}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
