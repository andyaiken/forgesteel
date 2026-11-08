import { HeroSheetValue } from '@/enums/hero-sheet-value';

export class HeroSheetValueData {
	static sections = [
		{
			name: 'Character',
			values: [
				{ value: HeroSheetValue.Level, label: 'Level' },
				{ value: HeroSheetValue.Wealth, label: 'Wealth' },
				{ value: HeroSheetValue.Renown, label: 'Renown' },
				{ value: HeroSheetValue.XP, label: 'XP' }
			]
		},
		{
			name: 'Characteristics',
			values: [
				{ value: HeroSheetValue.Might, label: 'Might' },
				{ value: HeroSheetValue.Agility, label: 'Agility' },
				{ value: HeroSheetValue.Reason, label: 'Reason' },
				{ value: HeroSheetValue.Intuition, label: 'Intuition' },
				{ value: HeroSheetValue.Presence, label: 'Presence' }
			]
		},
		{
			name: 'Statistics',
			values: [
				{ value: HeroSheetValue.Size, label: 'Size' },
				{ value: HeroSheetValue.Speed, label: 'Speed' },
				{ value: HeroSheetValue.Disengage, label: 'Disengage' },
				{ value: HeroSheetValue.Stability, label: 'Stability' }
			]
		},
		{
			name: 'Stamina',
			values: [
				{ value: HeroSheetValue.StaminaWinded, label: 'Winded' },
				{ value: HeroSheetValue.StaminaDying, label: 'Dying' },
				{ value: HeroSheetValue.StaminaMax, label: 'Max' }
			]
		},
		{
			name: 'Recoveries',
			values: [
				{ value: HeroSheetValue.RecoveriesStamina, label: 'Stamina' },
				{ value: HeroSheetValue.RecoveriesMax, label: 'Max' }
			]
		},
		{
			name: 'Conditions',
			values: [
				{ value: HeroSheetValue.ConditionsSaveEnds, label: 'Save Ends' }
			]
		}
	];

	static recommended = [
		HeroSheetValue.Wealth,
		HeroSheetValue.Renown,
		HeroSheetValue.XP,
		HeroSheetValue.StaminaDying,
		HeroSheetValue.StaminaMax,
		HeroSheetValue.StaminaWinded,
		HeroSheetValue.RecoveriesStamina
	];
}
