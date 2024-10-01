import { CampaignSetting } from '../models/campaign-setting';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from '../logic/feature-logic';
import { SkillList } from '../enums/skill-list';

export class CampaignSettingData {
	static orden: CampaignSetting = {
		id: 'orden',
		name: 'Orden',
		description: 'The default setting for Draw Steel.',
		languages: [
			{
				name: 'Anjal',
				description: 'Spoken in the Hells and used in legal documents.'
			},
			{
				name: 'Caelian',
				description: 'The language of the ancient Caelian Empire.'
			},
			{
				name: 'Higaran',
				description: 'Spoken in Higara.'
			},
			{
				name: 'Hyrallic',
				description: 'The primary language of the high elves in Orden.'
			},
			{
				name: 'Kalliak',
				description: 'Spoken by orcs; an offshoot of Zaliac.'
			},
			{
				name: 'Khemharic',
				description: 'Spoken in Khemhara.'
			},
			{
				name: 'Khoursirian',
				description: 'Spoken in Koursir.'
			},
			{
				name: 'Oaxuatl',
				description: 'Spoken in Ix.'
			},
			{
				name: 'Phaedran',
				description: 'Spoken in Phaedros.'
			},
			{
				name: 'Riojan',
				description: 'Spoken in Rioja.'
			},
			{
				name: 'Uvalic',
				description: 'Spoken by the Gol.'
			},
			{
				name: 'Vaniric',
				description: 'Spoken in Vanigar.'
			},
			{
				name: 'Vaslorian',
				description: 'Spoken in Vasloria.'
			},
			{
				name: 'Yllyric',
				description: 'The cultural language of wode elves, and also the common language among those who defend and protect the natural forests of Orden.'
			},
			{
				name: 'Zaliac',
				description: 'Spoken by dwarves and used in engineering.'
			}
		],
		defaultLanguages: [
			'Caelian'
		],
		skills: [
			{
				name: 'Timescape',
				description: 'Knowing about the various planets of the timescape',
				list: SkillList.Lore
			}
		],
		ancestries: [
			{
				id: 'ancestry-memonek',
				name: 'Memonek',
				description: 'The native denizens of Axiom, the Plane of Uttermost Law, memonek dwell in a land with lakes and trees and birds and flowers. But on this alien world, the lakes are seas of mercury, the birds glitter with wings of glass stretched gossamer thin, and the flowers’ petals are iridescent metal as flexible and fragile as any earthly rose.',
				features: [
					FeatureLogic.createSizeFeature({
						id: 'memonek-size',
						sizeValue: 1,
						sizeMod: 'M'
					}),
					FeatureLogic.createBonusFeature({
						id: 'memonek-speed',
						field: FeatureField.Speed,
						value: 7
					}),
					FeatureLogic.createFeature({
						id: 'memonek-feature-1a',
						name: 'Lightweight',
						description: 'Your silicone body is aerodynamic and low in density. Whenever you fall, you reduce the distance of the fall by 2 squares. When you are force moved, you are force moved an additional 2 squares.'
					}),
					FeatureLogic.createBonusFeature({
						id: 'memonek-feature-1b',
						field: FeatureField.Stability,
						value: -2
					}),
					FeatureLogic.createFeature({
						id: 'memonek-feature-2',
						name: 'Keeper of Order',
						description: 'When you or a creature adjacent to you makes a power roll, you can remove an edge or a bane on the roll as a free triggered action. You can only use this benefit once per round.'
					})
				]
			},
			{
				id: 'ancestry-time-raider',
				name: 'Time Raider',
				description: 'The original servitor species of the synliiroi—evil psions with near god-like power—the kuran’zoi liberated themselves during the First Psychic War. In the centuries since, they built their own culture and civilization as nomads of the timescape. The exonym “time raiders” was given to them by denizens of the lower worlds who, seeing the advanced technology they wield, concluded they must be from the future.',
				features: [
					FeatureLogic.createSizeFeature({
						id: 'time-raider-size',
						sizeValue: 1,
						sizeMod: 'M'
					}),
					FeatureLogic.createBonusFeature({
						id: 'time-raider-speed',
						field: FeatureField.Speed,
						value: 5
					}),
					FeatureLogic.createFeature({
						id: 'time-raider-feature-1',
						name: 'Foresight',
						description: 'Your senses extend past mundane obscuration and the veil of the future alike. You instinctively know the location of any concealed creatures who aren’t hidden from you, negating the usual bane on attacks against them. Additionally, whenever you are attacked, you can use a triggered action to impose a bane on the power roll.'
					}),
					FeatureLogic.createFeature({
						id: 'time-raider-feature-2',
						name: 'Four Arms',
						description: 'Your multiple arms let you take on multiple tasks at the same time. Whenever you use the Grab or Knockback maneuver against an adjacent creature, you can target an additional adjacent creature, using the same power roll for both targets. You can grab up to two creatures at a time.'
					}),
					FeatureLogic.createDamageModifierFeature({
						id: 'time-raider-feature-3',
						name: 'Psionic Gift',
						modifiers: [
							{
								damageType: 'Psionic',
								type: DamageModifierType.Immunity,
								value: 5,
								valuePerLevel: 0
							}
						]
					})
				]
			}
		],
		cultures: [],
		classes: [],
		careers: [],
		complications: [],
		kits: []
	};

	static getCampaignSettings = () => {
		return [
			this.orden
		];
	};
}
