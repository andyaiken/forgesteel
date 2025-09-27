import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';

export class IntriguePerkData {
	static criminalContacts: Perk = {
		id: 'perk-criminal-contacts',
		name: 'Criminal Contacts',
		description: 'You have access to a network of criminal contacts. As a respite activity while you take a respite in a settlement, you can ask a question of your contacts by making a Presence test. On a tier 2 outcome, you learn one piece of information that would be common among criminals—the secret entrances into a building, the location of a local criminal in hiding, the name of a local thieves’ guild leader, and so forth. On a tier 3 outcome, you can instead gain knowledge that would be uncommon among criminals as long as such information exists—the location of a local treasure cache, the location of a murder weapon used in a noble’s assassination, the name of an NPC secretly bankrolling a local assassin’s guild, and so forth.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static forgettableFace: Perk = {
		id: 'perk-forgettable-face',
		name: 'Forgettable Face',
		description: 'If you spend 10 minutes or less interacting with a creature who hasn’t met you before, you can cause them to forget your face when you part. If asked to describe you, the creature gives only a vague, blank, and unhelpful description. Additionally, if you spend 1 hour or more assembling a disguise, you automatically obtain a tier 2 outcome on any test that could make use of the Disguise skill. If you have the Disguise skill, you automatically obtain a tier 3 outcome on the test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static gumUpTheWorks: Perk = {
		id: 'perk-gum-up-the-works',
		name: 'Gum Up The Works',
		description: 'You prevent a trap from activating.',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-gum-up-the-works-1',
				name: 'Gum Up The Works',
				description: 'You prevent a trap from activating.',
				type: FactoryLogic.type.createTrigger('A mundane trap activates within 3 squares of you.'),
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				sections: [
					FactoryLogic.createAbilitySectionText('You can move up to 3 squares toward the trap. If this movement brings you adjacent to any of the trap’s mechanisms, you can jam the trap, preventing it from activating. As long as you stay adjacent to the mechanism, the trap can’t go off unless an attempt to disarm it fails.')
				]
			})
		},
		list: PerkList.Intrigue
	};

	static luckyDog: Perk = {
		id: 'perk-lucky-dog',
		name: 'Lucky Dog',
		description: 'Whenever you fail a test using any skill from the intrigue skill group, you can lose Stamina equal to 1d6 + your level to improve the outcome of the test by one tier. You can use this perk only once per test.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static masterOfDisguise: Perk = {
		id: 'perk-master-of-disguise',
		name: 'Master of Disguise',
		description: 'You can don or remove a disguise as part of any test you make using the Hide skill, or while using the Hide maneuver.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};

	static slippedLead: Perk = {
		id: 'perk-slipped-lead',
		name: 'Slipped Lead',
		description: 'You gain an edge on tests made to escape bonds. Given 1 uninterrupted minute, you can escape any mundane bonds without making a test. Additionally, it’s not immediately obvious when you’ve escaped bonds until you do something that makes it clear you have done so (cast them off, use an ability that harms one or more creatures, and so forth).',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Intrigue
	};
}
