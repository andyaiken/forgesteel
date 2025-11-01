import { Tip } from '@/models/tip';

import heroSheetClassic from '@/assets/screenshots/hero-sheet-classic.png';
import heroSheetInteractive from '@/assets/screenshots/hero-sheet-interactive.png';
import heroSheetRoll from '@/assets/screenshots/hero-roll.png';
import heroSheetState from '@/assets/screenshots/hero-state.png';
import heroSheetVitals from '@/assets/screenshots/hero-vitals.png';

import heroBuilderEdit from '@/assets/screenshots/hero-edit.png';
import heroBuilderPregens from '@/assets/screenshots/pregens.png';
import heroBuilderSourcebooks from '@/assets/screenshots/hero-edit-sourcebooks.png';

import libraryMain from '@/assets/screenshots/library.png';
import librarySourcebooks from '@/assets/screenshots/sourcebooks.png';

import homebrewEditor from '@/assets/screenshots/homebrew.png';

import appNavigation from '@/assets/screenshots/navigation.png';

export class TipData {
	static getTips = (): Tip[] => {
		return [
			// #region Heroes
			{
				image: heroSheetInteractive,
				content: 'If you\'re using your device to play, use the Interactive View.'
			},
			{
				image: heroSheetClassic,
				content: 'If you want to print out your hero, switch to the Classic view.'
			},
			{
				image: heroSheetRoll,
				content: 'Forge Steel can make your ability rolls for you, if you\'re playing online.'
			},
			{
				image: heroSheetState,
				content: 'Click on your hero\'s resources to manage them.'
			},
			{
				image: heroSheetVitals,
				content: 'Click on your hero\'s vitals to manage your stamina, resources, and conditions.'
			},
			// #endregion

			// #region Hero Builder
			{
				image: heroBuilderEdit,
				content: 'Forge Steel lets you build heroes.'
			},
			{
				image: heroBuilderSourcebooks,
				content: 'If you want to use a custom sourcebook when you\'re building your hero, you\'ll need to select it on the **Start** page.'
			},
			{
				image: heroBuilderPregens,
				content: 'If you don\'t want to build a hero, you can start with a pregen.'
			},
			{
				image: heroBuilderPregens,
				content: 'If you don\'t want to build a hero, you can create an entirely random one.'
			},
			// #endregion

			// #region Library
			{
				image: libraryMain,
				content: 'The Library screen shows all the content in the game.'
			},
			{
				image: librarySourcebooks,
				content: 'Everything in the Library comes from a sourcebook - you can create your own sourcebooks for homebrew content.'
			},
			// #endregion

			// #region Homebrew
			{
				image: homebrewEditor,
				content: 'You can create homebrew versions of anything in the Library.'
			},
			// TODO: Monster builder - similar monsters, genesplice
			// #endregion

			// #region Playbook
			// TODO: Encounter / classic view / builder / tools
			// TODO: Montage / classic view / builder
			// TODO: Negotiation / classic view / builder
			// TODO: Map / autobuild
			// #endregion

			// #region Session
			// TODO: Encounter / predefined
			// TODO: Montage / predefined
			// TODO: Negotiation / predefined
			// TODO: Counter
			// TODO: Multiple things
			// #endregion

			// #region App
			{
				image: appNavigation,
				content: 'Use the navigation bar, at the bottom left of the screen, to switch between Forge Steel\'s sections.'
			}
			// TODO: Reference
			// TODO: Roll
			// TODO: Settings
			// TODO: Bug or feature? Discord or issues
			// #endregion
		];
	};
};
