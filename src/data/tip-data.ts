import { FactoryLogic } from '@/logic/factory-logic';
import { Tip } from '@/models/tip';

import heroSheetClassic from '@/assets/screenshots/hero-sheet-classic.png';
import heroSheetCustomize from '@/assets/screenshots/hero-sheet-customize.png';
import heroSheetInteractive from '@/assets/screenshots/hero-sheet-interactive.png';
import heroSheetInventory from '@/assets/screenshots/hero-sheet-inventory.png';
import heroSheetProjects from '@/assets/screenshots/hero-sheet-projects.png';
import heroSheetResourceFrequency from '@/assets/screenshots/hero-resource-frequency.png';
import heroSheetRetinue from '@/assets/screenshots/hero-sheet-retinue.png';
import heroSheetRoll from '@/assets/screenshots/hero-roll.png';
import heroSheetState from '@/assets/screenshots/hero-state.png';
import heroSheetVitals from '@/assets/screenshots/hero-vitals.png';

import heroBuilderEdit from '@/assets/screenshots/hero-edit.png';
import heroBuilderFolder from '@/assets/screenshots/hero-folder.png';
import heroBuilderPregens from '@/assets/screenshots/hero-pregens.png';
import heroBuilderRandom from '@/assets/screenshots/hero-random.png';
import heroBuilderSourcebooks from '@/assets/screenshots/hero-edit-sourcebooks.png';

import libraryAdventure from '@/assets/screenshots/library-adventure.png';
import libraryBeastheart from '@/assets/screenshots/library-beastheart.png';
import libraryEncounter from '@/assets/screenshots/library-encounter.png';
import libraryEncounterBuilder from '@/assets/screenshots/library-encounter-builder.png';
import libraryEncounterClassic from '@/assets/screenshots/library-encounter-classic.png';
import libraryEncounterRandom from '@/assets/screenshots/library-encounter-random.png';
import libraryEncounterTools from '@/assets/screenshots/library-encounter-tools.png';
import libraryMain from '@/assets/screenshots/library.png';
import libraryMap from '@/assets/screenshots/library-map.png';
import libraryMapAutobuild from '@/assets/screenshots/library-map-autobuild.png';
import libraryMontage from '@/assets/screenshots/library-montage.png';
import libraryMontageBuilder from '@/assets/screenshots/library-montage-builder.png';
import libraryMontageClassic from '@/assets/screenshots/library-montage-classic.png';
import libraryNegotiation from '@/assets/screenshots/library-negotiation.png';
import libraryNegotiationBuilder from '@/assets/screenshots/library-negotiation-builder.png';
import libraryNegotiationClassic from '@/assets/screenshots/library-negotiation-classic.png';
import libraryShareCode from '@/assets/screenshots/library-share-code.png';
import librarySourcebooks from '@/assets/screenshots/sourcebooks.png';
import librarySummoner from '@/assets/screenshots/library-summoner.png';
import libraryThirdParty from '@/assets/screenshots/third-party.png';

import homebrewEditor from '@/assets/screenshots/homebrew.png';
import homebrewKitTuning from '@/assets/screenshots/homebrew-kit-tuning.png';
import homebrewMonsterBuilder from '@/assets/screenshots/monster-builder.png';
import homebrewMonsterBuilderGenesplice from '@/assets/screenshots/monster-builder-genesplice.png';

import sessionCounter from '@/assets/screenshots/session-counter.png';
import sessionEncounter from '@/assets/screenshots/session-encounter.png';
import sessionMontage from '@/assets/screenshots/session-montage.png';
import sessionMultiple from '@/assets/screenshots/session-multiple.png';
import sessionNegotiation from '@/assets/screenshots/session-negotiation.png';

import appAbout from '@/assets/screenshots/footer.png';
import appNavigation from '@/assets/screenshots/navigation.png';
import appReference from '@/assets/screenshots/footer-reference.png';
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
				image: heroSheetState,
				content: 'Click on your hero\'s resources to manage them.'
			}),
			FactoryLogic.createTip({
				image: heroSheetResourceFrequency,
				content: 'Each way of gaining a heroic resource shows how often you can claim it, and dims once you\'ve used it, until it refreshes.',
				isNew: true
			}),
			FactoryLogic.createTip({
				image: heroSheetVitals,
				content: 'Click on your hero\'s vitals to manage your stamina, resources, and conditions.'
			}),
			FactoryLogic.createTip({
				image: heroSheetInventory,
				content: 'You can manage your hero\'s equipment with the **Inventory** button. If you have an imbued item, this is where to set it up.'
			}),
			FactoryLogic.createTip({
				image: heroSheetProjects,
				content: 'The **Projects** button lets you track the progress of your hero\'s downtime projects.'
			}),
			FactoryLogic.createTip({
				image: heroSheetCustomize,
				content: 'You can add almost anything to your hero with **Customize**, in the overflow menu beside your hero\'s name.'
			}),
			FactoryLogic.createTip({
				image: heroSheetRetinue,
				content: 'If your hero has a mount, a retainer, or can summon monsters, you\'ll see them in your **Retinue** tab.'
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
				content: 'If you have built a lot of heroes, you can organize them by adding them to folders.'
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
				content: 'Forge Steel now includes third-party content from the Blacksmith\'s Guild, Look Out Behind You Studios, Ratcatcher Magazine, Steel Echoes, Triglav Games, Weapons of Legend, and the Draw Steel homebrew community.'
			}),
			FactoryLogic.createTip({
				image: libraryBeastheart,
				content: 'Forge Steel now includes the Beastheart class.',
				isNew: true
			}),
			FactoryLogic.createTip({
				image: librarySummoner,
				content: 'Forge Steel now includes the Summoner class.',
				isNew: true
			}),
			FactoryLogic.createTip({
				image: libraryShareCode,
				content: 'You can share an item, a title or a retainer as a short code - use **Copy Share Code**, and paste it into your chat. Whoever you send it to can bring it into their hero with the **Import Code** button.',
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
				content: 'When you\'re creating a homebrew kit, Forge Steel helps you to make sure your kit isn\'t overpowered.'
			}),
			FactoryLogic.createTip({
				image: homebrewMonsterBuilderGenesplice,
				content: 'When you\'re creating a homebrew monster, you can use the **Genesplice** tool to quickly jumble existing creatures together to create something new.'
			}),
			// #endregion

			// #region Adventures
			FactoryLogic.createTip({
				image: libraryAdventure,
				content: 'You can design adventures in the **Library**.'
			}),
			// #endregion

			// #region Encounters
			FactoryLogic.createTip({
				image: libraryEncounter,
				content: 'You can design encounters in the **Library**.'
			}),
			FactoryLogic.createTip({
				image: libraryEncounterTools,
				content: 'If you tap the Minis button in the encounter header, you\'ll see information that\'ll help you pick minis for this encounter.'
			}),
			FactoryLogic.createTip({
				image: libraryEncounterClassic,
				content: 'If you want to print out your encounter, switch to the Classic view.'
			}),
			FactoryLogic.createTip({
				image: libraryEncounterBuilder,
				content: 'Forge Steel makes it easy to build encounters by adding monsters and terrain elements.'
			}),
			FactoryLogic.createTip({
				image: libraryEncounterRandom,
				content: 'If you need an encounter in a hurry, Forge Steel can generate one - you just specify the difficulty and, optionally, the sort of monsters you want it to showcase.'
			}),
			// #endregion

			// #region Montages
			FactoryLogic.createTip({
				image: libraryMontage,
				content: 'You can design montages in the **Library**.'
			}),
			FactoryLogic.createTip({
				image: libraryMontageClassic,
				content: 'If you want to print out your montage, switch to the Classic view.'
			}),
			FactoryLogic.createTip({
				image: libraryMontageBuilder,
				content: 'Forge Steel makes it easy to build montages by adding challenges and twists.'
			}),
			// #endregion

			// #region Negotiations
			FactoryLogic.createTip({
				image: libraryNegotiation,
				content: 'You can design negotiations in the **Library**.'
			}),
			FactoryLogic.createTip({
				image: libraryNegotiationClassic,
				content: 'If you want to print out your negotiation, switch to the Classic view.'
			}),
			FactoryLogic.createTip({
				image: libraryNegotiationBuilder,
				content: 'Forge Steel makes it easy to build negotiations by adding motivations and pitfalls.'
			}),
			// #endregion

			// #region Maps
			FactoryLogic.createTip({
				image: libraryMap,
				content: 'You can design tactical maps in the **Library**.'
			}),
			FactoryLogic.createTip({
				image: libraryMapAutobuild,
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
