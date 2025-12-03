import { FactoryLogic } from '@/logic/factory-logic';
import { Tip } from '@/models/tip';

import heroSheetClassic from '@/assets/screenshots/hero-sheet-classic.png';
import heroSheetCustomize from '@/assets/screenshots/hero-sheet-customize.png';
import heroSheetInteractive from '@/assets/screenshots/hero-sheet-interactive.png';
import heroSheetInventory from '@/assets/screenshots/hero-sheet-inventory.png';
import heroSheetManage from '@/assets/screenshots/hero-sheet-manage.png';
import heroSheetProjects from '@/assets/screenshots/hero-sheet-projects.png';
import heroSheetRetinue from '@/assets/screenshots/hero-sheet-retinue.png';
import heroSheetRoll from '@/assets/screenshots/hero-roll.png';
import heroSheetState from '@/assets/screenshots/hero-state.png';
import heroSheetVitals from '@/assets/screenshots/hero-vitals.png';

import heroBuilderEdit from '@/assets/screenshots/hero-edit.png';
import heroBuilderFolder from '@/assets/screenshots/hero-folder.png';
import heroBuilderPregens from '@/assets/screenshots/hero-pregens.png';
import heroBuilderRandom from '@/assets/screenshots/hero-random.png';
import heroBuilderSourcebooks from '@/assets/screenshots/hero-edit-sourcebooks.png';

import libraryMain from '@/assets/screenshots/library.png';
import librarySourcebooks from '@/assets/screenshots/sourcebooks.png';
import libraryThirdParty from '@/assets/screenshots/third-party.png';

import homebrewEditor from '@/assets/screenshots/homebrew.png';
import homebrewKitTuning from '@/assets/screenshots/homebrew-kit-tuning.png';
import homebrewMonsterBuilder from '@/assets/screenshots/monster-builder.png';
import homebrewMonsterBuilderGenesplice from '@/assets/screenshots/monster-builder-genesplice.png';

import playbookAdventure from '@/assets/screenshots/playbook-adventure.png';
import playbookEncounter from '@/assets/screenshots/playbook-encounter.png';
import playbookEncounterBuilder from '@/assets/screenshots/playbook-encounter-builder.png';
import playbookEncounterClassic from '@/assets/screenshots/playbook-encounter-classic.png';
import playbookEncounterRandom from '@/assets/screenshots/playbook-encounter-random.png';
import playbookEncounterTools from '@/assets/screenshots/playbook-encounter-tools.png';
import playbookMap from '@/assets/screenshots/playbook-map.png';
import playbookMapAutobuild from '@/assets/screenshots/playbook-map-autobuild.png';
import playbookMontage from '@/assets/screenshots/playbook-montage.png';
import playbookMontageBuilder from '@/assets/screenshots/playbook-montage-builder.png';
import playbookMontageClassic from '@/assets/screenshots/playbook-montage-classic.png';
import playbookNegotiation from '@/assets/screenshots/playbook-negotiation.png';
import playbookNegotiationBuilder from '@/assets/screenshots/playbook-negotiation-builder.png';
import playbookNegotiationClassic from '@/assets/screenshots/playbook-negotiation-classic.png';

import sessionCounter from '@/assets/screenshots/session-counter.png';
import sessionEncounter from '@/assets/screenshots/session-encounter.png';
import sessionMontage from '@/assets/screenshots/session-montage.png';
import sessionMultiple from '@/assets/screenshots/session-multiple.png';
import sessionNegotiation from '@/assets/screenshots/session-negotiation.png';

import appAbout from '@/assets/screenshots/footer.png';
import appNavigation from '@/assets/screenshots/navigation.png';
import appReference from '@/assets/screenshots/footer-reference.png';
import appRoll from '@/assets/screenshots/footer-roll.png';
import appSettings from '@/assets/screenshots/footer-settings.png';

export class TipData {
	static getTips = (): Tip[] => {
		return [
			// #region Hero Sheet
			FactoryLogic.createTip({
				image: heroSheetInteractive,
				content: 'If you\'re using your device to play, use the Interactive View.'
			}),
			FactoryLogic.createTip({
				image: heroSheetClassic,
				content: 'If you want to print out your hero, switch to the Classic view.'
			}),
			FactoryLogic.createTip({
				image: heroSheetRoll,
				content: 'Forge Steel can make your ability rolls for you, if you\'re playing online.'
			}),
			FactoryLogic.createTip({
				image: heroSheetManage,
				content: 'You can access your hero\'s resources, inventory, projects, and more through the **Manage** button.'
			}),
			FactoryLogic.createTip({
				image: heroSheetState,
				content: 'Click on your hero\'s resources to manage them.'
			}),
			FactoryLogic.createTip({
				image: heroSheetVitals,
				content: 'Click on your hero\'s vitals to manage your stamina, resources, and conditions.'
			}),
			FactoryLogic.createTip({
				image: heroSheetInventory,
				content: 'You can manage your hero\'s equipment in the **Inventory** tab. If you have an imbued item, this is where to set it up.'
			}),
			FactoryLogic.createTip({
				image: heroSheetProjects,
				content: 'On the **Projects** tab you can track the progress of your hero\'s downtime projects.'
			}),
			FactoryLogic.createTip({
				image: heroSheetCustomize,
				content: 'You can add almost anything to your hero in the **Customize** tab.'
			}),
			FactoryLogic.createTip({
				image: heroSheetRetinue,
				content: 'If your hero has a mount, a retainer, or can summon monsters, you\'ll see them in your **Retinue** tab.',
				isNew: true
			}),
			// #endregion

			// #region Hero Builder
			FactoryLogic.createTip({
				image: heroBuilderEdit,
				content: 'Forge Steel lets you build heroes, taking you through the process step-by-step.'
			}),
			FactoryLogic.createTip({
				image: heroBuilderSourcebooks,
				content: 'If you want to use a custom sourcebook when you\'re building your hero, you\'ll need to select it on the **Start** page.'
			}),
			FactoryLogic.createTip({
				image: heroBuilderPregens,
				content: 'If you don\'t want to build a hero, you can start with a pregen.'
			}),
			FactoryLogic.createTip({
				image: heroBuilderRandom,
				content: 'If you don\'t want to build a hero, you can create an entirely random one.'
			}),
			FactoryLogic.createTip({
				image: heroBuilderFolder,
				content: 'If you have built a lot of heroes, you organize them by adding them to folders.'
			}),
			// #endregion

			// #region Library
			FactoryLogic.createTip({
				image: libraryMain,
				content: 'The Library screen shows all the content in the game.'
			}),
			FactoryLogic.createTip({
				image: librarySourcebooks,
				content: 'Everything in the Library comes from a sourcebook - you can create your own sourcebooks for homebrew content.'
			}),
			FactoryLogic.createTip({
				image: libraryThirdParty,
				content: 'Forge Steel now includes third-party content from the Blacksmith\'s Guild, Ratcatcher magazine, Triglav Games, and the Draw Steel homebrew community.',
				isNew: true
			}),
			// #endregion

			// #region Homebrew
			FactoryLogic.createTip({
				image: homebrewEditor,
				content: 'You can create homebrew versions of anything in the **Library**.'
			}),
			FactoryLogic.createTip({
				image: homebrewMonsterBuilder,
				content: 'When you\'re creating a homebrew monster, Forge Steel shows you similar monsters to help you choose your new monster\'s stat values.'
			}),
			FactoryLogic.createTip({
				image: homebrewKitTuning,
				content: 'When you\'re creating a homebrew kit, Forge Steel helps you to make sure your kit isn\'t overpowered.',
				isNew: true
			}),
			FactoryLogic.createTip({
				image: homebrewMonsterBuilderGenesplice,
				content: 'When you\'re creating a homebrew monster, you can use the **Genesplice** tool to quickly jumble existing creatures together to create something new.',
				isNew: true
			}),
			// #endregion

			// #region Adventures
			FactoryLogic.createTip({
				image: playbookAdventure,
				content: 'You can design adventures in the **Library**.'
			}),
			// #endregion

			// #region Encounters
			FactoryLogic.createTip({
				image: playbookEncounter,
				content: 'You can design encounters in the **Library**.'
			}),
			FactoryLogic.createTip({
				image: playbookEncounterTools,
				content: 'If you tap the Information icon in the encounter header, you\'ll see information that\'ll help you pick minis for this encounter.',
				isNew: true
			}),
			FactoryLogic.createTip({
				image: playbookEncounterClassic,
				content: 'If you want to print out your encounter, switch to the Classic view.'
			}),
			FactoryLogic.createTip({
				image: playbookEncounterBuilder,
				content: 'Forge Steel makes it easy to build encounters by adding monsters and terrain elements.'
			}),
			FactoryLogic.createTip({
				image: playbookEncounterRandom,
				content: 'If you need an encounter in a hurry, Forge Steel can generate one - you just specify the difficulty and, optionally, the sort of monsters you want it to showcase.',
				isNew: true
			}),
			// #endregion

			// #region Montages
			FactoryLogic.createTip({
				image: playbookMontage,
				content: 'You can design montages in the **Library**.'
			}),
			FactoryLogic.createTip({
				image: playbookMontageClassic,
				content: 'If you want to print out your montage, switch to the Classic view.'
			}),
			FactoryLogic.createTip({
				image: playbookMontageBuilder,
				content: 'Forge Steel makes it easy to build montages by adding challenges and twists.'
			}),
			// #endregion

			// #region Negotiations
			FactoryLogic.createTip({
				image: playbookNegotiation,
				content: 'You can design negotiations in the **Library**.'
			}),
			FactoryLogic.createTip({
				image: playbookNegotiationClassic,
				content: 'If you want to print out your negotiation, switch to the Classic view.'
			}),
			FactoryLogic.createTip({
				image: playbookNegotiationBuilder,
				content: 'Forge Steel makes it easy to build negotiations by adding motivatons and pitfalls.'
			}),
			// #endregion

			// #region Maps
			FactoryLogic.createTip({
				image: playbookMap,
				content: 'You can design tactical maps in the **Library**.'
			}),
			FactoryLogic.createTip({
				image: playbookMapAutobuild,
				content: 'If you\'re in a hurry, you can get Forge Steel to generate a random tactical map for your encounters.'
			}),
			// #endregion

			// #region Session
			FactoryLogic.createTip({
				image: sessionCounter,
				content: 'In the **Session** screen you can set counters, counting down (or up) to track whatever needs to be tracked in your adventure.'
			}),
			FactoryLogic.createTip({
				image: sessionEncounter,
				content: 'In the **Session** screen you can run encounters, easily handling stamina and conditions for each of the combatants.'
			}),
			FactoryLogic.createTip({
				image: sessionMontage,
				content: 'In the **Session** screen you can run montages, tracking each of the heroes\' successes and failures.'
			}),
			FactoryLogic.createTip({
				image: sessionNegotiation,
				content: 'In the **Session** screen you can run negotiations, tracking the NPC\'s interest and patience.'
			}),
			FactoryLogic.createTip({
				image: sessionMultiple,
				content: 'If you\'re running more than one encounter (or montage, or negotiation) you can switch between them at the top of the **Session** screen.'
			}),
			// #endregion

			// #region App
			FactoryLogic.createTip({
				image: appNavigation,
				content: 'Use the navigation bar, at the bottom left of the screen, to switch between Forge Steel\'s sections.'
			}),
			FactoryLogic.createTip({
				image: appReference,
				content: 'Press the Reference button, at the bottom right of the screen, to access the reference section.'
			}),
			FactoryLogic.createTip({
				image: appRoll,
				content: 'Press the Roll button, at the bottom right of the screen, to make a power roll or saving throw.'
			}),
			FactoryLogic.createTip({
				image: appSettings,
				content: 'Press the Settings button, at the bottom right of the screen, to modify app preferences and settings.'
			}),
			FactoryLogic.createTip({
				image: appAbout,
				content: 'Spotted a bug? Have an idea for a new feature? Press the About button to find links to the issue tracker, or post on the MCDM Draw Steel Discord.'
			})
			// #endregion
		];
	};
};
