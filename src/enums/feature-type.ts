export enum FeatureType {
	Text = 'Text',
	Ability = 'Ability',
	AbilityCost = 'Ability Cost',
	AncestryTraits = 'Ancestry Traits',
	Bonus = 'Bonus',
	Choice = 'Choice',
	ClassAbility = 'Class Ability',
	DamageModifier = 'Damage Modifier',
	Domain = 'Domain',
	DomainFeature = 'Domain Feature',
	InheritedAncestry = 'Inherited Ancestry',
	Kit = 'Kit',
	KitType = 'Kit Type',
	Language = 'Language',
	LanguageChoice = 'Language Choice',
	Malice = 'Malice',
	Multiple = 'Multiple Features',
	Perk = 'Perk',
	Size = 'Size',
	Skill = 'Skill',
	SkillChoice = 'Skill Choice',
	Speed = 'Speed',
	Title = 'Title'
}

export type InheritableFeature =
	| FeatureType.AncestryTraits
	| FeatureType.Size
	| FeatureType.Speed;