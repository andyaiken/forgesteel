import { AbilityKeyword } from '../../enums/ability-keyword';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureType } from '../../enums/feature-type';
import { Perk } from '../../models/perk';
import { PerkList } from '../../enums/perk-list';

export class SupernaturalPerkData {
	static arcaneTrick: Perk = {
		id: 'perk-arcane-trick',
		name: 'Arcane Trick',
		description: 'You cast an entertaining spell that creates a minor but impressive magical effect.',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-arcane-trick-1',
				name: 'Arcane Trick',
				description: 'You cast an entertaining spell that creates a minor but impressive magical effect.',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Magic ],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				sections: [
					FactoryLogic.createAbilitySectionText(`
Choose one of the following effects:

* You teleport an unattended size 1T or 1S object within 1 square of you to an unoccupied space within 1 square of you.
* Until the start of your next turn, a part of your body shoots a shower of harmless noisy sparks that give off light within 1 square of you.
* You ignite or snuff out (your choice) every mundane light source within 1 square of you.
* You make up to 1 pound of edible food you can touch taste delicious or disgusting.
* Until the start of your next turn, you make your body exude a particular odor you’ve smelled before. This smell can be sensed by creatures within 5 squares of you, but can’t impose any condition or other drawback on creatures.
* You place a small magical inscription on the surface of a mundane object you can touch, or remove an inscription that was made by you or by another creature using Arcane Trick.
* You cover a size 1T object that you touch with an illusion that makes it look like another object. A creature who handles the object can see through the illusion. The illusion ends when you stop touching the object.`)
				]
			})
		},
		list: PerkList.Supernatural
	};

	static creatureSense: Perk = {
		id: 'perk-creature-sense',
		name: 'Creature Sense',
		description: 'You intuit a creature\'s keywords.',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-creature-sense-1',
				name: 'Creature Sense',
				description: 'You intuit a creature\'s keywords.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				sections: [
					FactoryLogic.createAbilitySectionText('You magically learn the keywords a creature of lower level within 10 squares of you has in their stat block (e.g. “Demon,” “Humanoid,” or “Undead”).')
				]
			})
		},
		list: PerkList.Supernatural
	};

	static familiar: Perk = {
		id: 'perk-familiar',
		name: 'Familiar',
		description: `
A magic spirit, which has taken the form of a specific small animal or animate object, has chosen to be your familiar - or to adopt you as its familiar. The familiar can’t perform activities that require hands, and it can’t harm other creatures or objects. It can provide flanking benefits only to you. The familiar uses the familiar stat block.

If the familiar is destroyed, you can restore them as a respite activity or by spending a Recovery as an action to bring them back into existence into an unoccupied space adjacent to you.

### Familiar
**Stamina**: 2 × your level, **Speed**: 5, **Size**: 1T, **Stability**: 0
**Might**: -3, **Agility**: +2, **Reason**: +0, **Intuition**: +0, **Presence**: +1
**Telepathic**: You and the spirit can communication telepathically with with each other and share senses over while you are within 10 squares of each other.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Supernatural
	};

	static invisibleForce: Perk = {
		id: 'perk-invisible-force',
		name: 'Invisible Force',
		description: 'You manipulate a tiny object with your mind.',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-invisible-force-1',
				name: 'Invisible Force',
				description: 'You manipulate a tiny object with your mind.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Psionic ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: '1 size 1T unattended object',
				sections: [
					FactoryLogic.createAbilitySectionText('You can grab or manipulate the target with your mind. You can move the object up to a number of squares equal to your Reason, Intuition, or Presence score (your choice). You can use this ability to turn doorknobs, pull levers, and manipulate other smaller, movable pieces of a larger object as long as the piece you\'re manipulating is unattended and size 1T (though you can’t use this ability to break smaller piece off of a larger object).')
				]
			})
		},
		list: PerkList.Supernatural
	};

	static psychicWhisper: Perk = {
		id: 'perk-psychic-whisper',
		name: 'Psychic Whisper',
		description: 'You send a one-way telepathic message to a friend.',
		type: FeatureType.Ability,
		data: {
			ability: FactoryLogic.createAbility({
				id: 'perk-psychic-whisper-1',
				name: 'Psychic Whisper',
				description: 'You send a one-way telepathic message to a friend.',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Psionic ],
				distance: [ FactoryLogic.distance.createRanged(10) ],
				target: '1 ally who understands at least one language',
				sections: [
					FactoryLogic.createAbilitySectionText('You send a telepathic message to the target that takes 10 seconds or less to speak.')
				]
			})
		},
		list: PerkList.Supernatural
	};

	static thingspeaker: Perk = {
		id: 'perk-thingspeaker',
		name: 'Thingspeaker',
		description: `
When you hold an object in your hand, you can ask the Director if it bears emotional importance. Objects with emotional resonance could include treasured gifts, murder weapons, or personal keepsakes. If the answer is yes, the Director tells you the most dominant emotion associated with the object, and you can spend 1 uninterrupted minute focusing on the object, at the end of which you receive a vision which answers one of the following questions:

* What was the name of the person whose emotions are imprinted on this object?
* Why does this emotion linger on the object?
* How long has it been since this was held by the person whose emotions linger on it?

After asking one question, you can choose to delve deeper. You ask one additional question from the list, after which you are overcome with emotions that do not belong to you. You take a bane on Presence and Intuition tests until you finish a respite. While you suffer this bane, you can’t use this feature.`,
		type: FeatureType.Text,
		data: null,
		list: PerkList.Supernatural
	};

	static ritualist: Perk = {
		id: 'perk-ritualist',
		name: 'Ritualist',
		description: 'You can spend 1 minute performing a magic ritual of blessing. At the end of the ritual, touch one willing creature, including yourself. The creature gains a double edge on the next test they make within the next minute. A creature can’t use this benefit on an activity that takes longer than a minute.',
		type: FeatureType.Text,
		data: null,
		list: PerkList.Supernatural
	};
}
