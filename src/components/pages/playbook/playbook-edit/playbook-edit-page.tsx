import { Button, Popover } from 'antd';
import { CloseOutlined, DownOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { Adventure } from '../../../../models/adventure';
import { AdventureEditPanel } from '../../../panels/edit/adventure-edit/adventure-edit-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Element } from '../../../../models/element';
import { Encounter } from '../../../../models/encounter';
import { EncounterEditPanel } from '../../../panels/edit/encounter-edit/encounter-edit-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Format } from '../../../../utils/format';
import { Hero } from '../../../../models/hero';
import { Monster } from '../../../../models/monster';
import { MonsterGroup } from '../../../../models/monster-group';
import { Montage } from '../../../../models/montage';
import { MontageEditPanel } from '../../../panels/edit/montage-edit/montage-edit-panel';
import { MontagePanel } from '../../../panels/elements/montage-panel/montage-panel';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationEditPanel } from '../../../panels/edit/negotiation-edit/negotiation-edit-panel';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { TacticalMap } from '../../../../models/tactical-map';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../../../panels/elements/tactical-map-panel/tactical-map-panel';
import { Terrain } from '../../../../models/terrain';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';
import { useState } from 'react';

import './playbook-edit-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	playbook: Playbook;
	options: Options;
	highlightAbout: boolean;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	showMonster: (monster: Monster, monsterGroup: MonsterGroup) => void;
	showTerrain: (terrain: Terrain, upgradeIDs: string[]) => void;
	saveChanges: (kind: PlaybookElementKind, element: Element) => void;
	setOptions: (options: Options) => void;
}

export const PlaybookEditPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID } = useParams<{ kind: PlaybookElementKind, elementID: string }>();
	const [ element, setElement ] = useState<Element>(() => {
		let original: Element;
		switch (kind!) {
			case 'adventure':
				original = props.playbook.adventures.find(e => e.id === elementID)!;
				break;
			case 'encounter':
				original = props.playbook.encounters.find(e => e.id === elementID)!;
				break;
			case 'montage':
				original = props.playbook.montages.find(e => e.id === elementID)!;
				break;
			case 'negotiation':
				original = props.playbook.negotiations.find(e => e.id === elementID)!;
				break;
			case 'tactical-map':
				original = props.playbook.tacticalMaps.find(e => e.id === elementID)!;
				break;
		}
		return Utils.copy(original);
	});
	const [ dirty, setDirty ] = useState<boolean>(false);

	// #region Edit

	const getEditHeaderSection = () => {
		return null;
	};

	const getEditSection = () => {
		switch (kind!) {
			case 'adventure':
				return (
					<div className='adventure-container'>
						<AdventureEditPanel
							adventure={element as Adventure}
							playbook={props.playbook}
							sourcebooks={props.sourcebooks}
							heroes={props.heroes}
							options={props.options}
							onChange={adventure => {
								setElement(adventure);
								setDirty(true);
							}}
						/>
					</div>
				);
			case 'encounter':
				return (
					<EncounterEditPanel
						encounter={element as Encounter}
						heroes={props.heroes}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onChange={encounter => {
							setElement(encounter);
							setDirty(true);
						}}
						showMonster={props.showMonster}
						showTerrain={props.showTerrain}
					/>
				);
			case 'negotiation':
				return (
					<NegotiationEditPanel
						negotiation={element as Negotiation}
						onChange={negotiation => {
							setElement(negotiation);
							setDirty(true);
						}}
					/>
				);
			case 'montage':
				return (
					<MontageEditPanel
						montage={element as Montage}
						onChange={montage => {
							setElement(montage);
							setDirty(true);
						}}
					/>
				);
			case 'tactical-map':
				return (
					<div className='tactical-map-container'>
						<TacticalMapPanel
							map={element as TacticalMap}
							display={TacticalMapDisplayType.DirectorEdit}
							options={props.options}
							mode={PanelMode.Full}
							updateMap={map => {
								setElement(map);
								setDirty(true);
							}}
						/>
					</div>
				);
		}
	};

	// #endregion

	// #region Preview

	const getPreviewHeaderSection = () => {
		return null;
	};

	const getPreview = () => {
		switch (kind!) {
			case 'montage':
				return (
					<SelectablePanel>
						<MontagePanel
							montage={element as Montage}
							mode={PanelMode.Full}
						/>
					</SelectablePanel>
				);
			case 'negotiation':
				return (
					<SelectablePanel>
						<NegotiationPanel
							negotiation={element as Negotiation}
							mode={PanelMode.Full}
						/>
					</SelectablePanel>
				);
		}

		return null;
	};

	// #endregion

	const getSubheader = () => {
		if (kind === 'tactical-map') {
			return 'Tactical Map';
		}

		return Format.capitalize(kind!);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='playbook-edit-page'>
					<AppHeader subheader={`${getSubheader()} Builder`}>
						<Button type='primary' icon={<SaveOutlined />} disabled={!dirty} onClick={() => props.saveChanges(kind!, element)}>
							Save Changes
						</Button>
						<Button icon={<CloseOutlined />} onClick={() => navigation.goToPlaybook(kind!, element.id)}>
							Cancel
						</Button>
						{
							(kind === 'encounter') ?
								<div className='divider' />
								: null
						}
						{
							(kind === 'encounter') ?
								<Popover
									trigger='click'
									content={<OptionsPanel mode='encounter-modern' options={props.options}heroes={props.heroes} setOptions={props.setOptions} />}
								>
									<Button icon={<SettingOutlined />}>
										Options
										<DownOutlined />
									</Button>
								</Popover>
								: null
						}
						{
							(kind === 'tactical-map') ?
								<Popover
									trigger='click'
									content={<OptionsPanel mode={kind} options={props.options} heroes={props.heroes} setOptions={props.setOptions} />}
								>
									<Button icon={<SettingOutlined />}>
										Options
										<DownOutlined />
									</Button>
								</Popover>
								: null
						}
					</AppHeader>
					<div className='playbook-edit-page-content'>
						<div className='edit-column'>
							{getEditHeaderSection()}
							{getEditSection()}
						</div>
						{
							(kind !== 'adventure') && (kind !== 'encounter') && (kind !== 'tactical-map') ?
								<div className='preview-column'>
									{getPreviewHeaderSection()}
									{getPreview()}
								</div>
								: null
						}
					</div>
					<AppFooter page='playbook' highlightAbout={props.highlightAbout} showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
