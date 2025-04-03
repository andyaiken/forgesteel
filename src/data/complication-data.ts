import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { Complication } from '../models/complication';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { DamageType } from '../enums/damage-type';
import { FactoryLogic } from '../logic/factory-logic';
import { FeatureField } from '../enums/feature-field';
import { ItemType } from '../enums/item-type';
import { SkillList } from '../enums/skill-list';

export class ComplicationData {
	static advancedStudies: Complication = {
		id: 'comp-advanced-studies',
		name: 'Advanced Studies',
		description: 'You somehow obtained the notebook of a brilliant but eccentric member of your class. It should help you unlock powerful new abilities - if you can ever figure out what it means.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-advanced-studies-b',
				name: 'Advanced Studies',
				description: 'As a respite activity, you can study the notebook. Make a test using your highest characteristic. On an 11 or lower, you summon a hostile demon of your level or lower who attacks you at the end of the respite. The demon gets to act first in the combat, no matter any other creature’s traits or abilities. On a 16 or less, you learn nothing and your time is wasted. On a 17+, you learn a bonus heroic ability from your class that you qualify for. You only know the ability until you finish a respite.'
			})
		]
	};

	static animalForm: Complication = {
		id: 'comp-animal-form',
		name: 'Animal Form',
		description: 'Due to a magical accident, your being has fused with a small, harmless animal. You turn into this animal when it’s convenient - and sometimes when it’s inconvenient as well.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-animal-form-b',
				name: 'Animal Form Benefit',
				description: 'At the start of your turn, while you are conscious you can take the form of a specific 1T animal. Apart from your size, you keep your other statistics. Based on the animal you can turn into, your movement gains either the Burrow, Climb, Fly, or Swim keyword. Instead of gaining one of these keywords, your speed can increase by 2. Unless you use this benefit again, you regain your true form at the start of your next turn. While in animal form, you can’t talk or use actions, and the only maneuvers you can take are Escape Grab, Hide, and Stand Up.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-animal-form-d',
				name: 'Animal Form Drawback',
				description: 'At the start of your turn while you are winded, the Director can spend 1 Malice to force you to take your animal form. Once the Director has done so, they can’t do so again until you have finished a respite.'
			})
		]
	};

	static amnesia: Complication = {
		id: 'comp-amnesia',
		name: 'Amnesia',
		description: 'You have no memory of your past before the … incident. Hopefully you’ll regain your memory soon and find out what the incident was. In the meantime, you need friends, so you’re not alone when your past catches up to you.',
		features: [
			FactoryLogic.feature.createItemChoice({
				id: 'comp-amnesia-b',
				name: 'Amnesia Benefit',
				description: 'You have a supernatural possession - a 1st echelon trinket. It might have some connection with your former life.',
				types: [ ItemType.Trinket ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-amnesia-d',
				name: 'Amnesia Drawback',
				description: 'You have a bane on tests made to recall lore.'
			})
		]
	};

	static antihero: Complication = {
		id: 'comp-antihero',
		name: 'Antihero',
		description: 'You used to be a villain. You’re (mostly) reformed now, but in desperate moments, you sometimes draw on the rage and hatred that fueled your old life. In these moments, even your friends aren’t sure whose side you’re on. They don’t need to worry, though. Once you leave evil behind, you can’t go back. You’ve made too many enemies on the other side.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-antihero-b',
				name: 'Antihero Benefit',
				description: 'You have three Antihero Tokens. Whenever you use an ability or effect that costs a heroic resource, you can spend an Antihero Token to in place of one heroic resource. While you have fewer than three antihero tokens and you would earn a hero token for the group through your deeds, you instead regain one antihero token.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-antihero-d',
				name: 'Antihero Drawback',
				description: 'While you have fewer than three antihero tokens, you exude a villainous aspect. You and each ally within 5 squares of you takes a bane on all tests made to interact with other creatures.'
			})
		]
	};

	static artifactBonded: Complication = {
		id: 'comp-artifactBonded',
		name: 'Artifact Bonded',
		description: 'A powerful artifact has bonded to you. You might be destined to wield the artifact or to destroy it. You’re not powerful enough to use it at the moment, although you may one day be. For now, the item has no effect beyond getting you in trouble.',
		features: [
			FactoryLogic.feature.createItemChoice({
				id: 'comp-artifactBonded-b1',
				types: [ ItemType.Artifact ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-artifactBonded-b2',
				name: 'Artifact Bonded Benefit',
				description: 'The first time in an encounter that you are reduced to 0 Stamina against your will, the artifact appears on your person and then disappears at the end of your next turn.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-artifactBonded-d',
				name: 'Artifact Bonded Drawback',
				description: 'When the artifact disappears from your grasp, you lose a Recovery. If you have no Recoveries remaining, you take 1d10 damage instead, which can’t be reduced in any way.'
			})
		]
	};

	static bereaved: Complication = {
		id: 'comp-bereaved',
		name: 'Bereaved',
		description: 'The most important person to you - perhaps a family member, mentor, or lover - was killed. The only thing that keeps you going is the faint connection you have with this person’s spirit, and the hope that one day you can tie up their unfinished business and let them rest.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-bereaved-b',
				name: 'Bereaved Benefit',
				description: 'When you don’t know what to do, you can appeal to your loved one’s spirit for help. You spend a hero token to let the Director determine your next combat or out-of- combat action. The Director chooses the best course of action they can think of for you, even if it relies on information you don’t have. If the Director can’t think of a particularly good course of action for you to take, you don’t expend the hero token.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-bereaved-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static betrothed: Complication = {
		id: 'comp-betrothed',
		name: 'Betrothed',
		description: 'Your parents made a deal, and as part of that deal, you’re supposed to marry someone - or something - you didn’t choose. But no one is going to tell you what to do! They’ll be sorry when you run away and become a mighty adventurer.',
		features: [
			FactoryLogic.feature.createItemChoice({
				id: 'comp-betrothed-b',
				name: 'Betrothed Benefit',
				description: 'You escaped with a dowry present: a 1st echelon trinket of your choice.',
				types: [ ItemType.Trinket ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-betrothed-d',
				name: 'Betrothed Drawback',
				description: 'People who learn of you running out on your commitment think less of you and spread nasty rumors about you. Your Renown can’t ever be more than your level – 1.'
			})
		]
	};

	static carefulCurse: Complication = {
		id: 'comp-carefulCurse',
		name: 'Careful Curse',
		description: 'When you were young, you did something reckless and unthinking that endangered a hag or cost them something dear. The hag cursed you, causing you to take your time and be always cautious and thorough, even to your own detriment. If you can’t shake this curse, it could be your downfall or the very thing that saves you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-carefulCurse-b',
				name: 'Careful Curse Benefit',
				description: 'Until you’ve taken your turn in a round, strikes against you take a bane.'
			}),
			FactoryLogic.feature.createBonus({
				id: 'comp-carefulCurse-d',
				field: FeatureField.Speed,
				value: -1
			})
		]
	};

	static chaosTouched: Complication = {
		id: 'comp-chaosTouched',
		name: 'Chaos Touched',
		description: 'You came into contact with a mote of pure chaos energy or were subjected to a spell or object that fused chaos into your very being. Now you can sprout and retract limbs in a way that can horrify unprepared onlookers.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-chaosTouched-b',
				name: 'Chaos Touched Benefit',
				description: 'You gain an edge on power rolls that are part of the Grab, Escape a Grab, or Knockback maneuver. Additionally, you can hold an extra item even when your hands are full.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-chaosTouched-d',
				name: 'Chaos Touched Drawback',
				description: 'While dying, you grow and retract uncoordinated limbs, making all power rolls with a bane.'
			})
		]
	};

	static chosenOne: Complication = {
		id: 'comp-chosenOne',
		name: 'Chosen One',
		description: 'Maybe the stars marked you out at your birth, or maybe your name appears in an ancient prophecy. In any case, a sinister cult has decided that you’re very important to their plan - though you don’t particularly like the fate they have in mind for you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-chosenOne-b',
				name: 'Chosen One Benefit',
				description: 'You have three Destiny Points. You can spend a Destiny Point in place of a heroic resource of your class. Each time you gain a Victory, you regain one Destiny Point.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-chosenOne-d',
				name: 'Chosen One Drawback',
				description: 'When you spend a Destiny Point, you take 1d10 psychic damage and the cult that seeks you becomes aware of your location.'
			})
		]
	};

	static consumingInterest: Complication = {
		id: 'comp-consumingInterest',
		name: 'Consuming Interest',
		description: 'Ever since you were a kid, you’ve been obsessed with a certain topic. During your travels, you spend your free time gleaning all the information you can on it. You might not be the world’s leading expert quite yet, but people should certainly trust your opinion on the topic.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-consumingInterest-skill',
				listOptions: [ SkillList.Lore ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-consumingInterest-b',
				name: 'Consuming Interest Benefit',
				description: `
You can use the following project up to three times for your chosen skill. Each time you use the project, you must use a different project source.

**Study Lore**
**Item Prerequisite**: None
**Project Source**: A significant source of information on the topic, such as a major library or a world-renowned sage
**Project Roll Characteristic**: Reason
**Project Goal**: 120 the first time, 150 the second time, 180 the third time

Your knowledge of your chosen field increases. When you finish this project, the bonus to tests provided by your skill increases from +2 to +3, +3 to +4, or +4 to +5.`
			}),
			FactoryLogic.feature.create({
				id: 'comp-consumingInterest-d',
				name: 'Consuming Interest Drawback',
				description: 'You can’t imagine ever being wrong on the subject. When you make a test to recall lore using your chosen skill, the Director makes the test in secret. Instead of informing you whether you’re right or wrong, they provide you with correct information if you succeeded or false information if you failed.'
			})
		]
	};

	static corruptedMentor: Complication = {
		id: 'comp-corruptedMentor',
		name: 'Corrupted Mentor',
		description: 'Your mentor taught you everything, and you trusted them implicitly - until they went rogue, betraying you or your organization. Their current whereabouts and activities are unknown, although there are disturbing rumors - and you, as their former pupil, are under suspicion as well.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-corruptedMentor-b',
					name: 'Corrupted Spirit',
					description: 'Your mentor taught you the Corrupt Spirit maneuver, which, in retrospect, should have aroused your suspicion.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					effect: 'Until the end of your turn, when you use a heroic ability against a single target, you can weaken the target’s life force, dealing extra corruption damage equal to your highest characteristic score.'
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-corruptedMentor-d',
				name: 'Corrupted Mentor Drawback',
				description: 'You have holy weakness 1. Each time you use Corrupt Spirit, your holy weakness increases by 1, to a maximum of your Recovery value. This weakness is reset to 1 after you take holy damage.'
			})
		]
	};

	static coward: Complication = {
		id: 'comp-coward',
		name: 'Coward',
		description: 'Some call you a coward, just because you shriek and run when you encounter danger. Sure, you might not have the natural bravado of less-imaginative people, and sure, you’re always imagining the many horrible ways you could die, but you’re used to fear. When you run in terror, you run towards the enemy.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-coward-b',
				name: 'Coward Benefit',
				description: 'You can move toward the source of your fear while you are frightened.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-coward-d',
				name: 'Coward Drawback',
				description: 'When you make a saving throw to end the frightened condition, you roll 2d10 and take the lowest result.'
			})
		]
	};

	static crashLanded: Complication = {
		id: 'comp-crashLanded',
		name: 'Crash Landed',
		description: 'You used to flit around the stars in your own ship, but after an ugly run-in with a pirate (or a pirate hunter), you’re marooned on this backwater world. You’re prepared to carve out a life here - at least until you can hitch a ride.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'comp-crashLanded-skill',
				skill: 'Timescape'
			}),
			FactoryLogic.feature.create({
				id: 'comp-crashLanded-b',
				name: 'Crash Landed Benefit',
				description: 'You have a power pack that you can activate or deactivate as a maneuver. When you activate the power pack, choose an energy type from cold, fire, lightning, or sonic. The damage you deal with abilities becomes that damage type until you deactivate the power pack.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-crashLanded-d',
				name: 'Crash Landed Drawback',
				description: 'You have a bane on tests made to know about anything related to the world where you crash landed.'
			})
		]
	};

	static cultVictim: Complication = {
		id: 'comp-cult-victim',
		name: 'Cult Victim',
		description: 'Cultists captured you while raiding your home, then began an unholy ritual to turn your body into an undead spirit. The ritual failed, but your body became infused with corrupted magic, turning you partially incorporeal.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-cult-victim-b',
				name: 'Cult Victim Benefit',
				description: 'Once per turn, you can move through a solid mundane object no more than 1 square thick. If you end your turn inside the object, you take 5 damage and are shunted out into the space where you entered the object.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-cult-victim-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static curseOfImmortality: Complication = {
		id: 'comp-curseOfImmortality',
		name: 'Curse of Immortality',
		description: 'As long as you can remember, you’ve never gotten older - you’ve just adventured through one age after another. Still, your memory of past events, even those you were involved with, is a little hazy - apparently your memory is not as long-lived as you are.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-curseOfImmortality-b',
				name: 'Curse of Immortality Benefit',
				description: 'You don’t age. Also, when your Stamina equals the negative of your winded value, you enter a state of suspended animation indistinguishable from death. If your body is not destroyed while in this state, after 12 hours you regain consciousness and regain Stamina equal to your recovery value.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-curseOfImmortality-d',
				name: 'Curse of Immortality Drawback',
				description: 'You have a bane on tests made to recall lore.'
			})
		]
	};

	static curseOfMisfortune: Complication = {
		id: 'comp-curseOfMisfortune',
		name: 'Curse of Misfortune',
		description: 'You should have never pissed off that mage! Maybe they deserved your ire, or maybe you were just a bully, but whatever the case, the wizard cursed you before skipping town. Now, in moments of pressure that require great skill, you have a tendency to choke, falling and flailing in such a dramatic fashion that you take everyone with you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-curseOfMisfortune-b',
				name: 'Curse of Misfortune',
				description: 'When you make a test in combat and get a consequence, you and every ally within 1 falls prone, causing you to barely miss any further consequence.'
			})
		]
	};

	static curseOfPoverty: Complication = {
		id: 'comp-curseOfPoverty',
		name: 'Curse of Poverty',
		description: 'A soothsayer once told you you’d never be rich, but you’d survive the impossible - but you’re determined to prove ‘em wrong. You’ll get rich or die trying!',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-curseOfPoverty-b',
				name: 'Curse of Poverty',
				description: 'When you take a respite while your personal Wealth is greater than 1, some improbable event occurs that causes most of your money to vanish. Your Wealth is reduced to 1. For each Wealth that you lose, your number of Recoveries increases by 1 until you take a respite with fewer Recoveries than your maximum.'
			})
		]
	};

	static cursedWeapon: Complication = {
		id: 'comp-cursedWeapon',
		name: 'Cursed Weapon',
		description: 'When you were young, you were given, or you found, a magic weapon. Since then, it’s stayed by your side, possibly even inspiring you to lead the life of a hero - but the weapon is cursed.',
		features: [
			FactoryLogic.feature.createItemChoice({
				id: 'comp-cursedWeapon-b',
				types: [ ItemType.LeveledWeapon ]
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-cursedWeapon-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Damage , modifierType: DamageModifierType.Weakness, value: 2 })
				]
			})
		]
	};

	static disgraced: Complication = {
		id: 'comp-disgraced',
		name: 'Disgraced',
		description: 'You’re a disgraced member of a powerful family or guild. You’ve been turned out of the ancestral home, and your relatives won’t give you the time of day, much less a helping hand, until you clear your name or clean up your act.',
		features: [
			FactoryLogic.feature.createBonus({
				id: 'comp-disgraced-bonus',
				field: FeatureField.Renown,
				value: 1
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-disgraced-skill',
				listOptions: [ SkillList.Interpersonal, SkillList.Intrigue ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-disgraced-d',
				name: 'Disgraced Drawback',
				description: 'Anyone who has heard of you and is influenced by your Renown treats you as infamous. When you are part of a negotiation that ends with an NPC who has an influence of 2 or lower, that NPC makes a plan to hurt you personally and carries it out.'
			})
		]
	};

	static dragonDreams: Complication = {
		id: 'comp-dragonDreams',
		name: 'Dragon Dreams',
		description: 'You sometimes have strange dreams of infernos of flame … gleaming piles of treasure … spreading your wings and taking flight. You haven’t told anyone about the dreams, except for your one strange relative who seems to know more than they’re letting on.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-dragonDreams-b',
				name: 'Dragon Dreams Benefit',
				description: 'Choose two ancestry points worth of dragon knight traits. Whenever you have at least 5 Victories, you gain those traits.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-dragonDreams-d',
				name: 'Dragon Dreams Drawback',
				description: 'When you are reduced to 0 Stamina, you explode with heat and fire. You and each creature within 5 squares of you takes fire damage equal to twice your level. You can’t reduce this damage for yourself in any way.'
			})
		]
	};

	static elementalInside: Complication = {
		id: 'comp-elemental-inside',
		name: 'Elemental Inside',
		description: 'When an evil mage threatened someone you loved, you blocked your foe’s summoning of an elemental creature by absorbing their magic with your body. You are now infused with the power of that elemental - and they’re not happy about it.',
		features: [
			FactoryLogic.feature.createBonus({
				id: 'comp-elemental-inside-b',
				name: 'Elemental Inside Benefit',
				field: FeatureField.Stamina,
				valuePerEchelon: 3
			}),
			FactoryLogic.feature.create({
				id: 'comp-elemental-inside-d',
				name: 'Elemental Inside Drawback',
				description: 'When you are dying, your possessing elemental takes control of your body. The elemental yearns for destruction, causing you to attack the closest creature they notice without regard for your desires or your body’s safety. The Director or you can control the hero, but whoever does must do their best to kill any creature they notice until you are no longer dying.'
			})
		]
	};

	static evanesceria: Complication = {
		id: 'comp-evanesceria',
		name: 'Evanesceria',
		description: 'You have contracted a rare magical disease called evanesceria. There are times when you’re not quite yourself - or anyone else either. You simply … vanish. You return later with no memory of your absence.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-evanesceria-b',
				name: 'Evanesceria Benefit',
				description: 'You can sometimes absent yourself from unpleasant situations. At the start of a combat round you can attempt to absent yourself by rolling a d10. On a result of 6 or higher, you disappear from reality, reappearing in the space you left, or the closest unoccupied space of your choice if it’s occupied, when you take your turn. After you absent yourself, you can’t attempt to absent again until you gain a Victory.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-evanesceria-d',
				name: 'Evanesceria Drawback',
				description: 'When you start a respite activity, roll 2d10. If you roll a 1 on either die, you absent for the rest of the respite then reappear. You gain the benefits of taking a respite but don’t perform the respite activity.'
			})
		]
	};

	static exile: Complication = {
		id: 'comp-exile',
		name: 'Exile',
		description: 'Whether you’re a convicted criminal, a noble stripped of their title, or just someone who made one too many enemies, you’ve been cast forth from your homeland, never to return - at least, until you’re strong enough to set things right.',
		features: [
			FactoryLogic.feature.createLanguageChoice({
				id: 'comp-exile-lang'
			}),
			FactoryLogic.feature.create({
				id: 'comp-exile-d',
				name: 'Exile Drawback',
				description: 'If you are caught returning to your homeland, you’ll be put to death.'
			})
		]
	};

	static fallenImmortal: Complication = {
		id: 'comp-fallenImmortal',
		name: 'Fallen Immortal',
		description: 'You used to be an immortal creature, dispensing justice and doing the bidding of the gods. Now, as a punishment or perhaps as a reward, you have put aside your wings and become a mortal. Your remaining years will be short, but living aside your fellow mortals gives your life new meaning.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'comp-fallenImmortal-skill',
				skill: 'Religion'
			}),
			FactoryLogic.feature.create({
				id: 'comp-fallenImmortal-b',
				name: 'Fallen Immortal Benefit',
				description: 'When you deal untyped damage, you can deal holy damage instead.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-fallenImmortal-d',
				name: 'Fallen Immortal Drawback',
				description: 'You will never fully gain a mortal’s comfort with untruth. When you make a test to deceive another creature, you do so with a bane.'
			})
		]
	};

	static famousRelative: Complication = {
		id: 'comp-famousRelative',
		name: 'Famous Relative',
		description: 'Sure, you’re a promising young hero in your own right - but people always ask you about your famous relative. Will you equal or surpass your relative’s accomplishments, or will you always live in their shadow?',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-famousRelative-b',
				name: 'Famous Relative Benefit',
				description: `
You have a piece of magic jewelry, such as a signet ring. As a maneuver, you can use the item to summon your relative to your aid. Your relative does their best to help you out of the current perilous situation, and disappears after 1 hour or after the perilous situation is resolved. Once you summon your relative, you can’t do so again until you gain a level.

Your relative has the same statistics as you do except for Renown, doesn’t gain the benefit of any of your treasures, and makes all power rolls with an edge. Your relative starts with a Renown of 10.`
			}),
			FactoryLogic.feature.create({
				id: 'comp-famousRelative-d',
				name: 'Famous Relative Drawback',
				description: 'After you summon your relative, the next time you gain Renown your relative gains the Renown instead and you gain no Victories from any combat encounters or other Victory-earning challenges for which they were present.'
			})
		]
	};

	static feytouched: Complication = {
		id: 'comp-feytouched',
		name: 'Feytouched',
		description: 'Your birth was attended by faeries. A friendly fairy blessed you, granting you strength so that you could defend yourself. An unfriendly fairy also blessed you, granting you a life full of peril so that you could prove your strength.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-feytouched-b',
				name: 'Feytouched',
				description: 'At the start of a combat encounter, you can gain 1 additional heroic resource. If you do so, the Director gains 3 Malice.'
			})
		]
	};

	static fieryIdeal: Complication = {
		id: 'comp-fieryIdeal',
		name: 'Fiery Ideal',
		description: 'A spirit beyond your comprehension chose you to be the guardian of a place, a cause, or another ideal. A flame burns in your soul, one that can burn your enemies - or yourself, if you fall short of your ideal.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-fieryIdeal-b',
				name: 'Fiery Ideal Benefit',
				description: 'While you are fighting on behalf of your ideal, when you score a tier 3 success with a damage-dealing ability, you deal additional fire damage equal to your highest characteristic score.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-fieryIdeal-d',
				name: 'Fiery Ideal Drawback',
				description: 'When you act against your ideal or fail to live up to the high standards associated with your ideal, you take 5 + your level fire damage. This damage can’t be decreased in any way.'
			})
		]
	};

	static fireAndChaos: Complication = {
		id: 'comp-fire-and-chaos',
		name: 'Fire And Chaos',
		description: 'A great monster who breathed fire burned your home to the ground. While everything around you was consumed, you somehow stood strong amid the inferno, your body adapting to ignore the effects of the flames.',
		features: [
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-fire-and-chaos-b',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Fire , modifierType: DamageModifierType.Immunity, value: 5 }),
					FactoryLogic.damageModifier.create({ damageType: DamageType.Cold , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static followingInTheFootsteps: Complication = {
		id: 'comp-followingInTheFootsteps',
		name: 'Following in the Footsteps',
		description: 'Your personal idol was a mighty hero, and you have modeled yourself on their example. You’ve studied their legends, and someday you hope to learn their most famous battle technique.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-followingInTheFootsteps-b',
				name: 'Following in the Footsteps Benefit',
				description: 'Choose a heroic ability for your class that requires a higher level than your current one. When you learn this ability, it costs 2 heroic resources less than usual (minimum 1).'
			}),
			FactoryLogic.feature.create({
				id: 'comp-followingInTheFootsteps-d',
				name: 'Following in the Footsteps Drawback',
				description: 'In your quest for advanced techniques, you have neglected basics. Choose a heroic ability that you already know. It costs 1 heroic resource more than usual.'
			})
		]
	};

	static forbiddenRomance: Complication = {
		id: 'comp-forbiddenRomance',
		name: 'Forbidden Romance',
		description: 'You are in love with someone, but tragic circumstances keep you apart - perhaps your lover is from a feuding family, betrothed to another, or has some other animosity toward you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-forbiddenRomance-b',
				name: 'Forbidden Romance Benefit',
				description: 'You can secretly call on your betrothed for favors. They may be powerful, but they’re constrained - they can’t openly reveal their connection with you.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-forbiddenRomance-d',
				name: 'Forbidden Romance Drawback',
				description: 'When in trouble, your lover may call on you for help - and if your relationship is discovered, your lover’s family become dangerous enemies.'
			})
		]
	};

	static frostheart: Complication = {
		id: 'comp-frostheart',
		name: 'Frostheart',
		description: 'At the edge of the world, you were lost in a winter storm and presumed dead - but returned with frosty skin and pale eyes.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-frostheart-b',
				name: 'Frostheart Benefit',
				description: 'When you would deal untyped damage with a strike, you can instead deal cold damage.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-frostheart-mods',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Cold , modifierType: DamageModifierType.Immunity, value: 5 }),
					FactoryLogic.damageModifier.create({ damageType: DamageType.Fire , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static gettingTooOldForThis: Complication = {
		id: 'comp-gettingTooOldForThis',
		name: 'Getting Too Old For This',
		description: 'You used to be a renowned hero, but you’ve been living the last few years in blissful peace. Now you’re coming out of retirement for one last hurrah. Your fighting skills have atrophied to the point where you’re no stronger than a wet-behind-the-ears starting adventurer, but you still remember some of your old tricks.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-gettingTooOldForThis-b',
				name: 'Getting Too Old For This Benefit',
				description: 'On your turn, choose a heroic ability that you would be able to learn if you were one level higher. Provided you meet the ability’s other prerequisites and you can spend the required heroic resources, you can use this ability. Once you use this benefit, you can’t do so again until you have gained 2 Victories.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-gettingTooOldForThis-d',
				name: 'Getting Too Old For This Drawback',
				description: 'While you are winded, your speed is reduced by 2.'
			})
		]
	};

	static gnollBit: Complication = {
		id: 'comp-gnollBit',
		name: 'Gnoll-Bit',
		description: `
As a child you survived a gnoll attack - but they left you with a toothy scar and the occasional fit of bloodlust.

You can’t take this complication if you can’t be dazed.`,
		features: [
			FactoryLogic.feature.create({
				id: 'comp-gnollBit-b',
				name: 'Gnoll-Bit Benefit',
				description: 'Whenever an ally within 5 squares of you is reduced to 0 Stamina, as a triggered action you can move up to your speed and make a free strike.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-gnollBit-d',
				name: 'Gnoll-Bit Drawback',
				description: 'If you start your turn next to at least one creature while dazed, you must use your action to make a melee free strike against an adjacent creature.'
			})
		]
	};

	static greening: Complication = {
		id: 'comp-greening',
		name: 'Greening',
		description: 'A great tree in the middle of a forest called upon you to clear its roots of the ichor moss draining its life force. As you removed the moss, you felt as if you were being filled with green elemental energy. Sadly, the great tree withered before you could finish the job, leaving behind a golden sapling which you now carry with you.',
		features: [
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-greening-mods',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption , modifierType: DamageModifierType.Immunity, value: 5 }),
					FactoryLogic.damageModifier.create({ damageType: DamageType.Fire , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static grifter: Complication = {
		id: 'comp-grifter',
		name: 'Grifter',
		description: 'You used to be a con artist. Those days are pretty much behind you. Being a hero is an even better racket. After all, if you’re saving the world, who can be mad at you for stealing a couple of coins along the way?',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-grifter-b',
				listOptions: [ SkillList.Intrigue ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-grifter-d',
				name: 'Grifter Drawback',
				description: 'When you meet an NPC for the first time, the Director can award the party a Hero Token. If they do so, the NPC was a victim of one of your previous cons and remembers you.'
			})
		]
	};

	static grounded: Complication = {
		id: 'comp-grounded',
		name: 'Grounded',
		description: 'As a child, when your settlement was in danger, you called out to the earth for aid. The earth answered with a shower of protecting earthen walls, and since then, you’ve felt its presence as a friend and protector.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-grounded-b',
				name: 'Grounded Benefit',
				description: 'You gain the 1st-level Elementalist Specialization feature Manipulate Earth. If you also gain Manipulate Earth in another way, you can use the ability as a ranged ability with a distance of ranged 5.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-grounded-d',
				name: 'Grounded Drawback',
				description: 'You attract lightning. When any creature within 2 squares of you takes lightning damage, you take 5 lightning damage, which ignores any lightning immunity you have.'
			})
		]
	};

	static guiltyConscience: Complication = {
		id: 'comp-guiltyConscience',
		name: 'Guilty Conscience',
		description: 'The world is in trouble - and it’s partly your fault. Maybe you helped a villain rise to power or inadvertently released a demon from imprisonment. Now it’s your mission to repair the damage you caused.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-guiltyConscience-b',
				name: 'Guilty Conscience Benefit',
				description: 'You’re determined to stay alive so you can set things right. When you are reduced to the negative of your winded value, you can spend a Recovery as a free triggered action.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-guiltyConscience-d',
				name: 'Guilty Conscience Drawback',
				description: 'Many people blame you for the evils you caused. They may be unfriendly or hostile to you - and you can see their point of view. You have a bane on tests made to interact with or strike those who accuse you of the sin you have committed.'
			})
		]
	};

	static hawkRider: Complication = {
		id: 'comp-hawkRider',
		name: 'Hawk Rider',
		description: 'You travel with a giant hawk that you stole from the Hawklords. Perhaps you were once a Hawklord yourself, or perhaps you escaped their captivity. Traveling with a giant hawk comes with its share of inconveniences and dangers, but they’re a small price to pay for the sky.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-hawkRider-b',
				name: 'Hawk Rider Benefit',
				description: 'While outside, you can spend a minute to summon your giant hawk, which acts as your mount. You can dismiss the hawk as a free action. The hawk won’t go inside, and it won’t accept anyone but you as a rider. If the hawk takes damage or dies, you can restore it to full Stamina as a respite activity.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-hawkRider-d',
				name: 'Hawk Rider Drawback',
				description: 'People who know of your crime are afraid to interact with you, since they worry the Hawklords will come after them by association. You have a bane on tests made to influence anyone who knows of the Hawklords and who has seen you with your giant hawk. Such people might report you to the Hawklords, who can come looking for you.'
			})
		]
	};

	static hearsVoices: Complication = {
		id: 'comp-hearsVoices',
		name: 'Hears Voices',
		description: 'You occasionally hear a voice in your head, offering orders or advice. You don’t know who the voice is or why, but when you’ve followed the advice, it’s usually proved to be sound.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-hearsVoices-b',
				name: 'Hears Voices Benefit',
				description: 'The Director tells you when you hear the voice. The voice seems to be aware of your surroundings, and its advice is usually vague but helpful. Someday its motivations might be different from your own, but for now it seems keen on making sure that you survive.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-hearsVoices-d',
				name: 'Hears Voices Drawback',
				description: 'Eventually, the voice may reveal that it wants something from you - something you may or may not want to provide. If the voice is displeased with you, it can prevent you from resting during a respite, causing you to regain 2 fewer Recoveries than normal.'
			})
		]
	};

	static hostBody: Complication = {
		id: 'comp-hostBody',
		name: 'Host Body',
		description: '“Do not be alarmed! We are not the humanoid we appear to be. We are an intelligent fungal collective, using this body as a host. No, we are doing nothing unsavory! This body was dead when we found it; we merely gave it another chance at life. We are friendly. Please put down those torches!”',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-hostBody-b',
				name: 'Host Body Benefit',
				description: 'You are a fungus that inhabits a humanoid body. Your host body follows all the normal rules for a character and is considered to be alive. At any time while your host body is alive, or for 24 hours after it dies, as an action you can move to a dead humanoid within 10 squares of the body and use it as your new host body, provided the body belongs a playable ancestry. When you do so, your original host body dies. Your new host body gains all your statistics except for those related to your former host body’s ancestry such as size and ancestry traits, which you instead gain from your new host body. When you inhabit a new host body, you start with 1 Stamina and can immediately spend a Recovery.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-hostBody-d',
				name: 'Host Body Drawback',
				description: 'You have a bane on tests made to read humanoid creatures’ emotions and body language.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-hostBody-mods',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Fire , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static hunted: Complication = {
		id: 'comp-hunted',
		name: 'Hunted',
		description: 'You’re one step ahead of a pursuer - perhaps a bounty hunter determined to bring you to justice, a revenant, or an assassin intent on your death. Someday, you’ll be strong enough to face your pursuer head to head, but for now you’re living your life on the run.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-hunted-skill',
				listOptions: [ SkillList.Intrigue ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-hunted-b',
				name: 'Hunted Benefit',
				description: 'When other creatures are pursuing you, you can take the lay low respite activity. When you use it, anyone pursuing you loses track of your party’s location and must start their search again.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-hunted-d',
				name: 'Hunted Drawback',
				description: 'Each time you gain Renown, your pursuer learns your location. Unless you lay low or move to a new location, within a 1d10 days you’ll be visited by the pursuer’s minions, or, if you linger, the pursuer.'
			})
		]
	};

	static hunter: Complication = {
		id: 'comp-hunter',
		name: 'Hunter',
		description: 'You’re hunting someone or something - perhaps a wanted criminal or someone who wronged you, or perhaps a dangerous monster or beast. You won’t rest until you meet your quarry face to face!',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: '',
				options: [ 'Alertness', 'Criminal Underworld', 'Eavesdrop', 'Interrogate', 'Rumors', 'Search', 'Track', 'Society' ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-hunter-b',
				name: 'Hunter Benefit',
				description: 'You have an edge on tests made to find or learn clues about your quarry.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-hunter-d',
				name: 'Hunter Drawback',
				description: 'You are so obsessed with finding your quarry that you have a bane on tests made to track other creatures.'
			})
		]
	};

	static indebted: Complication = {
		id: 'comp-indebted',
		name: 'Indebted',
		description: 'A deal went south, or you got involved with the wrong people, and now you owe a debt or a ransom - the kind that would bankrupt a minor noble. In order to pay it off, you’ll need to take some dangerous risks.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-indebted-b',
				name: 'Indebted Benefit',
				description: 'You’re good with money - you’ve had to be. Whenever you would gain Wealth, you gain 1 more than what you’d normally earn.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-indebted-d',
				name: 'Indebted Drawback',
				description: 'Your starting Wealth is -5. While your Wealth is less than 1, you can purchase items as if you had 1 Wealth, but you’re frequently visited by threatening creditors, and shopkeepers tend to lock their doors when they see you coming.'
			})
		]
	};

	static infernalContract: Complication = {
		id: 'comp-infernalContract',
		name: 'Infernal Contract',
		description: 'You made a deal (perhaps unknowingly) with an archdevil that has tied you to that fiend’s service. When you first learned of this deal, you were taken to the Seven Cities of Hell, where some of the timescape’s best minds taught you the ways of battle or magic. The archdevil allows you to use these gifts as you will … until they require a favor from you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-infernalContract-b',
				name: 'Infernal Contract Benefit',
				description: 'Whenever you are present for a battle in which all the creatures on one side are not surprised, your side goes first on a result of 4 or greater on the d10 roll.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-infernalContract-d',
				name: 'Infernal Contract Drawback',
				description: 'The archdevil occasionally asks you to defeat enemies on their behalf. If you refuse, your fiendish patron sends devils after you and those you care about.'
			})
		]
	};

	static infernalContractButLikeBad: Complication = {
		id: 'comp-infernalContractButLikeBad',
		name: 'Infernal Contract … But, Like, Bad',
		description: 'You made a deal with a devil - not a very good deal, but it wasn’t a very good devil. Now it’s too late for regrets. Your soul is forfeit unless you find a loophole or convince the devil to void the deal.',
		features: [
			FactoryLogic.feature.createChoice({
				id: 'comp-infernalContractButLikeBad-b',
				options: [
					{
						feature: FactoryLogic.feature.createBonus({
							id: 'comp-infernalContractButLikeBad-ba',
							field: FeatureField.Renown,
							value: 2
						}),
						value: 1
					},
					{
						feature: FactoryLogic.feature.createBonus({
							id: 'comp-infernalContractButLikeBad-bb',
							field: FeatureField.Wealth,
							value: 2
						}),
						value: 1
					},
					{
						feature: FactoryLogic.feature.createBonus({
							id: 'comp-infernalContractButLikeBad-bc',
							field: FeatureField.Stamina,
							value: 3
						}),
						value: 1
					}
				]
			}),
			FactoryLogic.feature.create({
				id: 'comp-infernalContractButLikeBad-d',
				name: 'Infernal Contract … But, Like, Bad Drawback',
				description: 'Your body bears a fiendish mark. Anyone who understands religion can tell that your soul belongs to Hell, giving you a bane on tests made to interact with them (unless they’re into that). Additionally, when you die, your soul goes to Hell and you can’t be restored to life.'
			})
		]
	};

	static ivoryTower: Complication = {
		id: 'comp-ivoryTower',
		name: 'Ivory Tower',
		description: 'You studied in an academy or other educational institution. Your training was thorough and your reading list was wide-ranging, but when you left school you discovered that there were serious gaps in your education. Maybe some of those books were a little out of date.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-ivoryTower-skills',
				listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ],
				count: 3
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'comp-ivoryTower-lang'
			}),
			FactoryLogic.feature.create({
				id: 'comp-ivoryTower-d',
				name: 'Ivory Tower Drawback',
				description: 'The Director chooses one of the skills you learned from this complication. You lose that skill and can’t ever learn it. When you make a test to which this skill would apply, instead of gaining a +2 bonus you suffer a bane.'
			})
		]
	};

	static lifebonded: Complication = {
		id: 'comp-lifebonded',
		name: 'Lifebonded',
		description: 'In a sinister ritual, your soul has been bound to another’s. When they die, you die - making you the perfect bodyguard. Who is your life bonded to: a companion? A superior officer? An enemy?',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-lifebonded-b',
				name: 'Lifebonded Benefit',
				description: 'Choose another creature that doesn’t have the Lifebonded complication. When you die, your body disappears until that creature completes a respite or gains one Victory. You then appear next to the creature, fully healed.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-lifebonded-d',
				name: 'Lifebonded Drawback',
				description: 'If the creature you’re bound to dies, you die as well, no matter what other traits or features you have.'
			})
		]
	};

	static lightningSoul: Complication = {
		id: 'comp-lightningSoul',
		name: 'Lightning Soul',
		description: 'You were caught in a storm and stuck by lightning - but you survived. Something saved you. Maybe it was a gods-given miracle, a latent psionic gift, or the magic of a helpful elementalist, but you absorbed the lightning into your body. It’s always there, simmering under the surface.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-lightningSoul-b',
				name: 'Lightning Soul Benefit',
				description: 'When you regain Stamina in combat, you gain a surge. Whenever you spend a surge, you can make the extra damage it deals lightning damage.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-lightningSoul-d',
				name: 'Lightning Soul Drawback',
				description: 'When you are wet, you have damage weakness 5.'
			})
		]
	};

	static loner: Complication = {
		id: 'comp-loner',
		name: 'Loner',
		description: 'You’ve always been a lone wolf. With no one else to lean on, you’ve picked up a million survival tricks. Which made it all the more surprising when you joined your current adventuring group, and found the family you never had.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-loner-b',
				name: 'Loner Benefit',
				description: 'When you complete a respite, choose a skill you don’t possess. You gain the benefits of that skill until you next complete a respite.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-loner-d',
				name: 'Loner Drawback',
				description: 'Now that you finally have people who care about you, you won’t let anyone take them away! When a creature reduces one of your allies to 0 Stamina, you are taunted by the creature until your ally’s Stamina is higher than 0, the end of the encounter, or another creature makes you taunted.'
			})
		]
	};

	static lostInTime: Complication = {
		id: 'comp-lostInTime',
		name: 'Lost in Time',
		description: 'In a long-ago age, a cataclysm overtook your city. You weren’t killed, but through some arcane accident you were suspended in time - until now. Alone, you must navigate the modern world with a head full of outdated memories - and a few ancient secrets.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-lostInTime-b',
				name: 'Lost in Time Benefit',
				description: 'Choose a damage type from acid, cold, corruption, fire, holy, lightning, poison, psychic, or sonic. When you use a signature ability, you can use your chosen damage type instead of the ability’s normal damage.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-lostInTime-d',
				name: 'Lost in Time Drawback',
				description: 'You automatically fail any test made to recall information from after you were suspended in time.'
			})
		]
	};

	static lostYourHead: Complication = {
		id: 'comp-lostYourHead',
		name: 'Lost Your Head',
		description: 'A bredbeddle stole your head! Normally, being beheaded by one of these giants is fatal, but due to your latent psionic ability you’re able to survive despite your decapitation.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-lostYourHead-b',
					name: 'Share Head',
					description: 'You don’t have a head but can psionically borrow another.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One willing creature',
					effect: 'You can see, hear, and smell as if you were in the creature’s space. Additionally, you can borrow their mouth to speak when you wish to do so. You speak in a different voice than theirs. This effect ends when you use Share Head on a different target, when the creature moves more than 10 away from you, or when the creature is no longer willing to share their head with you.'
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-lostYourHead-d',
				name: 'Lost Your Head Drawback',
				description: 'Having no head, you can’t see, hear, smell, or taste except by using the Share Head ability. Additionally, you can’t wear gear that requires a head, such as helmets or hats.'
			})
		]
	};

	static lucky: Complication = {
		id: 'comp-lucky',
		name: 'Lucky',
		description: 'You’ve always had a lucky streak: when you leave things in the hands of fate, you tend to succeed more than you fail. But luck is fickle - when you don’t trust it, it deserts you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-lucky-b',
				name: 'Lucky Benefit',
				description: 'When you spend a hero token to turn a failure into a success or to avoid a consequence, roll a d10. On a result of 6 or more, you don’t expend the hero token.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-lucky-d',
				name: 'Lucky Drawback',
				description: 'When you get a tier 1 result on a test and don’t expend a hero token to turn it into a success, you gain a bane on the next test you make.'
			})
		]
	};

	static masterChef: Complication = {
		id: 'comp-masterChef',
		name: 'Master Chef',
		description: 'Before you were a hero, you were a chef - and when you retire, you have big plans for your next restaurant or inn. In the meantime, you’re on the lookout for rare ingredients that only a traveler can find. After all, it’s food that makes the world go round.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'comp-masterChef-skill',
				skill: 'Cooking'
			}),
			FactoryLogic.feature.create({
				id: 'comp-masterChef-b',
				name: 'Master Chef Benefit',
				description: 'When you complete a respite or wake up after a night’s sleep, you can spend 1 uninterrupted hour prepare an excellent meal for up to 10 creatures, provided you have ingredients and cooking tools. Each creature that eats the meal gains 1 bonus Recovery, which expires at the end of the day if not used.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-masterChef-d',
				name: 'Master Chef Drawback',
				description: 'The first time each day that you are forced to eat ordinary or substandard food, you lose 2 Recoveries.'
			})
		]
	};

	static meddlingButler: Complication = {
		id: 'comp-meddlingButler',
		name: 'Meddling Butler',
		description: 'You’re not sure what you did to deserve it, but for some reason your family saddled you with an old and trusted - but irritating - family servant. They’re supremely competent, of course, but they sometimes seem to forget who’s in charge.',
		features: [
			FactoryLogic.feature.createCompanion({
				id: 'comp-meddlingButler-b',
				type: 'retainer'
			}),
			FactoryLogic.feature.create({
				id: 'comp-meddlingButler-d',
				name: 'Meddling Butler Drawback',
				description: 'Outside of combat, your retainer is under the Director’s control. The retainer sometimes acts without orders - always with your best interests at heart, but often in embarrassing or inconvenient ways.'
			})
		]
	};

	static medium: Complication = {
		id: 'comp-medium',
		name: 'Medium',
		description: 'You can see ghosts and spirits that others just don’t sense. They’re constantly whispering unsettling secrets in your ear - when they’re not trying to kill you.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-medium-b',
					name: 'Contact Spirits',
					type: FactoryLogic.type.createAction(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					powerRoll: FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
						tier1: 'You take corruption damage equal to 5 + your level.',
						tier2: 'A spirit speaks to you. You learn how it died, and you can ask it one question, which it can answer truthfully or untruthfully. It knows anything it knew in life, and it is aware of the events that took place in this location since its death. You can’t use this ability again until you have earned 1 Victory.',
						tier3: 'As 12-16, but you can ask 3 questions.'
					})
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-medium-d',
				name: 'Medium Drawback',
				description: 'If any sapient creatures have died nearby within 24 hours, you gain a double bane on the power roll if any of the creatures were hostile to you, or a double edge if they were friendly to you. You can’t use this ability again until have earned at least 1 Victory.'
			})
		]
	};

	static medusaBlood: Complication = {
		id: 'comp-medusaBlood',
		name: 'Medusa Blood',
		description: 'Your mother and father never saw eye to eye - you know that because your father’s still alive. Your mother was a medusa. It made your childhood difficult, and now it’s making your adulthood complicated as well.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-medusaBlood-b',
					name: 'Stone Eyes',
					description: 'These looks don’t kill - they petrify.',
					type: FactoryLogic.type.createAction(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: '1 creature',
					powerRoll: FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Presence ],
						tier1: '2 damage; M < [weak] slowed (save ends)',
						tier2: '4 damage; M < [average] slowed (save ends)',
						tier3: '6 damage; M < [strong] slowed (save ends)'
					}),
					effect: 'This ability has no effect on a creature that can’t see you or purposely avoids looking at your eyes. If a creature is reduced to 0 Stamina by this ability, they turn to inanimate stone.'
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-medusaBlood-d',
				name: 'Medusa Blood Drawback',
				description: 'Out of combat, you use Stone Eyes on anyone who meets your eye, whether you intend to or not. Your companions know not to make eye contact, but strangers are likely to trigger the ability unless you cover your eyes.'
			})
		]
	};

	static misunderstood: Complication = {
		id: 'comp-misunderstood',
		name: 'Misunderstood',
		description: 'Your appearance marks you as part of a group that’s universally feared. You might be a gentle soul, but you’re not often given a first chance, much less a second. It’s no wonder that you usually wear a hood.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-misunderstood-b',
				name: 'Misunderstood',
				description: 'When you reveal your appearance to creatures that don’t know you personally, you gain an edge on tests where the Brag or Intimidate skill could be applied and a bane on tests where the Flirt, Lead, or Persuade skills could be applied.'
			})
		]
	};

	static mundane: Complication = {
		id: 'comp-mundane',
		name: 'Mundane',
		description: 'You’re hopelessly nonmagical. When you try to use magical abilities, or when they’re used on you, they never work right. Even magical devices seem to fizzle in your presence.',
		features: [
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-mundane-b',
				modifiers: [
					FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Corruption , modifierType: DamageModifierType.Immunity, value: 1 }),
					FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Holy , modifierType: DamageModifierType.Immunity, value: 1 }),
					FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Psychic , modifierType: DamageModifierType.Immunity, value: 1 })
				]
			}),
			FactoryLogic.feature.create({
				id: 'comp-mundane-d',
				name: 'Mundane Drawback',
				description: 'While you are carry more than three magic treasures, you have a bane on all power rolls.'
			})
		]
	};

	static outlaw: Complication = {
		id: 'comp-outlaw',
		name: 'Outlaw',
		description: 'You might be a common bandit or an idealistic freedom fighter, but in either case, the local authorities don’t approve of your actions. You’ve managed to stay one step ahead of the law, but until your name is cleared you’ve got to keep a low profile.',
		features: [
			FactoryLogic.feature.createBonus({
				id: 'comp-outlaw-b',
				field: FeatureField.Renown,
				value: 1
			}),
			FactoryLogic.feature.create({
				id: 'comp-outlaw-d',
				name: 'Outlaw Drawback',
				description: 'Law enforcement officials and bounty hunters who recognize you attempt to arrest you.'
			})
		]
	};

	static pirate: Complication = {
		id: 'comp-pirate',
		name: 'Pirate',
		description: 'You have a piratical past (and maybe a piratical present and future as well). While you’re not well known ashore, other pirates have a way of recognizing their own.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-pirate-b',
				name: 'Pirate Benefit',
				description: 'When interacting with pirates or pirate hunters, you treat your Renown as 2 higher than usual. Additionally, you hold a piece of a pirate map. Somewhere in the world, a handful of other pirates hold the other pieces of the map. With all the pieces, you’d know the location of a fabulous pirate treasure.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-pirate-d',
				name: 'Pirate Drawback',
				description: 'The pirate treasure is said to be cursed or haunted. Furthermore, you’re not the only ones looking for it. The pirates holding the other pieces of the map would very much like to get their hands on your piece!'
			})
		]
	};

	static preacher: Complication = {
		id: 'comp-preacher',
		name: 'Preacher',
		description: 'When you were young, you almost died in an accident or attack and had a vision of god or saint that showed you the way to save yourself and others you loved. That drove you into the church and gave you a strong belief in a particular religion or cause, and you just can’t wait to tell other people all about it.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-preacher-b',
				name: 'Preacher Benefit',
				description: 'As a respite activity, you can try to convert members of a community to your cause. Make a Presence test. The Director determines the difficulty based on the community’s receptiveness to your ideas. On a success, you convert one NPC into a follower, in addition to followers you acquire through Renown or other means. The Director determines the type of follower. Once you have converted an NPC into a follower in this way, you can’t try again until you gain a level.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-preacher-d',
				name: 'Preacher Drawback',
				description: 'If you fail in your conversion attempt, one of the followers you have (either through this feature or your Renown) leaves you, their faith in you shaken. If you have no followers, your Renown instead decreases by 1. If you need to reduce your Renown and it is already 0, you instead experience a fitful respite and don’t gain any of the benefits of it.'
			})
		]
	};

	static primordialSickness: Complication = {
		id: 'comp-primordial-sickness',
		name: 'Primordial Sickness',
		description: 'You once contracted a terrible illness for which no one could find a cure. You sought out a primordial swamp said to be either incredibly poisonous or miraculously salubrious. It turned out to be both, keeping your illness at bay while corrupting your body with its unnatural energy.',
		features: [
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-primordial-sickness-b',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Poison , modifierType: DamageModifierType.Immunity, value: 5 }),
					FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption , modifierType: DamageModifierType.Immunity, value: 5 })
				]
			}),
			FactoryLogic.feature.createBonus({
				id: 'comp-primordial-sickness-d',
				name: 'Primordial Sickness Drawback',
				field: FeatureField.Recoveries,
				value: -1
			})
		]
	};

	static prisonerOfTheSynlirii: Complication = {
		id: 'comp-prisonerOfTheSynlirii',
		name: 'Prisoner of the Synlirii',
		description: 'You were captured by the psionic beings known as voiceless talkers. You escaped them, but you can’t escape that feeling in the back of your mind - the feeling of being watched.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-prisonerOfTheSynlirii-b',
				name: 'Prisoner of the Synlirii Benefit',
				description: 'You can telepathically communicate with creatures within 10 of you if they share a language with you and you know of each other. The receiver of your telepathic communications can choose to respond telepathically.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-prisonerOfTheSynlirii-d',
				name: 'Prisoner of the Synlirii Drawback',
				description: 'Voiceless talkers within 1 mile know your location and can overhear and understand your telepathic conversations.'
			})
		]
	};

	static promisingApprentice: Complication = {
		id: 'comp-promisingApprentice',
		name: 'Promising Apprentice',
		description: 'You were apprenticed to a trade. Your mentor said you had a special gift, and you could have become a master of your craft - but before your training was complete, your mentor was killed.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-promisingApprentice-skill',
				listOptions: [ SkillList.Crafting ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-promisingApprentice-b',
				name: 'Promising Apprentice Benefit',
				description: 'Choose one of your skills from the crafting skill group. When you use this skill you gain an edge.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-promisingApprentice-d',
				name: 'Promising Apprentice Drawback',
				description: 'Whoever killed your mentor cursed you. Whenever you make a test that you don’t apply one of your skills to, you have a bane on the test.'
			})
		]
	};

	static psychicEruption: Complication = {
		id: 'comp-psychicEruption',
		name: 'Psychic Eruption',
		description: 'In times of stress, you get headaches. Psionic energy builds up in your mind until you feel like your head is going to explode. If you’re not careful, it actually does explode, radiating psychic waves that harm friends and enemies alike.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-psychicEruption-b',
					name: 'Psychic Blast',
					description: 'Psionic energy bursts from your body in an iridescent shimmer.',
					type: FactoryLogic.type.createAction(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
					target: 'All creatures',
					preEffect: 'Note: this ability costs all your heroic resources to use.',
					powerRoll: FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						tier1: '1 psychic damage for each heroic resources you spend, to a maximum of your level',
						tier2: '1 psychic damage for each heroic resource you spend, to a maximum of your level + your highest characteristic',
						tier3: '1 psychic damage for each heroic resource you spend'
					}),
					effect: 'If you are a talent and you are strained, the ability deals an additional 5 psychic damage to you and all creatures in the area.'
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-psychicEruption-d',
				name: 'Psychic Eruption Drawback',
				description: 'When you gain the bleeding, frightened, or weakened condition, you must use Psychic Blast as a free triggered action.'
			})
		]
	};

	static punishmentCurse: Complication = {
		id: 'comp-punishment-curse',
		name: 'Punishment Curse',
		description: 'Through ignorance, fear, spite, or selfishness, you refused to help someone in need. To teach you a lesson, a deity offered you what seemed to be a blessing - extra power to help you heal yourself in times of need, but harsh consequences should your need become excessive. You took the deal, and now benefit from the blessing but also suffer from a curse.',
		features: [
			FactoryLogic.feature.createBonus({
				id: 'comp-punishment-curse-b',
				name: 'Punishment Curse Benefit',
				field: FeatureField.Recoveries,
				value: 1
			}),
			FactoryLogic.feature.create({
				id: 'comp-punishment-curse-d',
				name: 'Punishment Curse Drawback',
				description: 'When you are out of Recoveries, you are dying, no matter what your current Stamina is.'
			})
		]
	};

	static raisedByBeasts: Complication = {
		id: 'comp-raisedByBeasts',
		name: 'Raised by Beasts',
		description: 'You were orphaned or lost in the wild, and a friendly animal pack (perhaps apes, bears, or wolves) took you in. Returning to so-called civilization was a shock, but you’re determined to learn all you can about your own kind.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'comp-raisedByBeasts-skill',
				skill: 'Animal Handling'
			}),
			FactoryLogic.feature.create({
				id: 'comp-raisedByBeasts-b',
				name: 'Raised by Beasts Benefit',
				description: 'Choose an animal type, such as wolf. You can communicate with this animal as if you shared a language, and animals of this type are not initially hostile to you unless they’re supernaturally compelled to be. You gain an edge when you use Animal Handling to interact with this animal.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-raisedByBeasts-d',
				name: 'Raised by Beasts Drawback',
				description: 'You don’t have a culture, though you can still speak Caelian.'
			})
		]
	};

	static refugee: Complication = {
		id: 'comp-refugee',
		name: 'Refugee',
		description: 'A hostile army - perhaps the forces of Ajax, the Iron Saint - conquered your homeland. Your family escaped, but you can’t return home until your oppressors are defeated once and for all.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-refugee-b',
				name: 'Refugee Benefit',
				description: 'When your family fled your homeland, they left their greatest treasure behind. Work with the Director to determine its nature. It might be a trinket or leveled item, several points of Wealth, a treasure’s project source, or the like. This treasure is now in the hands of the invaders, until you win it back and use it against them.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-refugee-d',
				name: 'Refugee Drawback',
				description: 'The faction that invaded your homeland is hostile to you.'
			})
		]
	};

	static rival: Complication = {
		id: 'comp-rival',
		name: 'Rival',
		description: 'Whatever your accomplishments, you’ll forever measure yourself against a former companion who always seemed to be one step ahead of you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-rival-b',
				name: 'Rival Benefit',
				description: 'Choose one of your skills. This skill grants +3 bonus to tests instead of +2.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-rival-d',
				name: 'Rival Drawback',
				description: 'You occasionally cross paths with your rival, who has similar statistics to yours (but gains a +4 instead of a +3 in the skill you chose).'
			})
		]
	};

	static rogueTalent: Complication = {
		id: 'comp-rogueTalent',
		name: 'Rogue Talent',
		description: 'You are the only survivor of a cataclysmic psionic event - an experiment gone wrong, a voiceless talker attack, or some naturally occurring phenomenon of a far off part of the timescape. It left you with a psionic talent, but also made you vulnerable to telepathic attacks.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-rogueTalent-b',
					name: 'Telekinetic Grasp',
					description: 'You reach out with your mind to move a creature or object.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: '1 creature or object',
					preEffect: 'Note: you can use this ability as a ranged free strike.',
					powerRoll: FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Intuition, Characteristic.Presence ],
						tier1: 'push or pull 1',
						tier2: 'push or pull 2',
						tier3: 'push or pull 3'
					})
				})
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-rogueTalent-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static runaway: Complication = {
		id: 'comp-runaway',
		name: 'Runaway',
		description: 'To your embarrassment, no sinister omens attended your birth and your closet contains no skeletons. You’re just an ordinary person raised in a hardworking family. You’re expected to carry on the family business - but who can settle down to a boring job when adventure calls! That’s why you ran away.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-runaway-b',
				listOptions: [ SkillList.Crafting ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-runaway-d',
				name: 'Runaway Drawback',
				description: 'Your extended family is looking for you to take you home - and you’ve never been able to stand up to them. That’s why you ran away in the first place!'
			})
		]
	};

	static searchingForACure: Complication = {
		id: 'comp-searchingForACure',
		name: 'Searching for a Cure',
		description: 'Your homeland has been corrupted by some terrible monster, and you’re the only one who escaped the plague. The rest of your family still exists, but in changed forms - perhaps as vampires or zombies. People tell you the situation is hopeless, but you’re determined to find a cure.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-searchingForACure-b',
				name: 'Searching for a Cure Benefit',
				description: 'Choose a type of monster, such as medusa or vampire. You gain a +1 bonus on saving throws and to characteristic scores for the purpose of resisting potencies against this monster’s abilities.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-searchingForACure-d',
				name: 'Searching for a Cure Drawback',
				description: 'You have started to turn into one of these creatures yourself. If you don’t find a cure soon … you’ll fall victim to the disease or curse. Work with your Director to determine the timeline of your disease taking effect. It should be something that could happen during the campaign!'
			})
		]
	};

	static secretIdentity: Complication = {
		id: 'comp-secretIdentity',
		name: 'Secret Identity',
		description: 'You’re secretly very important - but it’s not safe for your true identity to be known. Perhaps you’re the witness to a crime or a royal on the run from a usurper. Until the appropriate villains are punished, you’ll maintain the guise of an ordinary adventurer.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-secretIdentity-skill',
				listOptions: [ SkillList.Intrigue ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-secretIdentity-b',
				name: 'Secret Identity Benefit',
				description: 'You can resume your true identity, either temporarily or permanently. While in your true identity, your Renown and Wealth are treated as 2 higher, along with any other benefits you may gain from your identity.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-secretIdentity-d',
				name: 'Secret Identity Drawback',
				description: 'You have powerful and clever enemies. Until they’re defeated, if you resume your true identity, there is a cumulative 20% chance that they find you and confront you each day. This chance resets if you resume your secret identity for a full day. Even if you try to keep your identity hidden, their suspicions may be raised by a careless slip.'
			})
		]
	};

	static secretTwin: Complication = {
		id: 'comp-secretTwin',
		name: 'Secret Twin',
		description: 'You have an identical twin - either a sibling or someone who looks so much like you that none would ever know the difference. They had a life that you coveted, or they had obligations that couldn’t go unfulfilled. So when they went missing, you stepped in and started living their life. Most folks are none the wiser.',
		features: [
			FactoryLogic.feature.createItemChoice({
				id: 'comp-secretTwin-b',
				name: 'Secret Twin Benefit',
				description: 'You claimed something that belonged to your twin as your own - a signature treasure that is now all yours. You gain a 1st echelon trinket of your choice. This treasure has their name or sigil written, sewn, or emblazoned on it somewhere.',
				types: [ ItemType.Trinket ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-secretTwin-d',
				name: 'Secret Twin Drawback',
				description: 'Your twin disappeared for a reason - someone wanted them dead. Whenever you finish a respite, roll a d10. On a result of 1 or 2, the Director can decide that your past catches up with you at any point in the future in the form of an assassin or someone who knows your real identity and threatens to reveal it as part of a blackmail scheme.'
			})
		]
	};

	static selfTaught: Complication = {
		id: 'comp-selfTaught',
		name: 'Self Taught',
		description: 'While your peers were learning their trades in fancy schools, you were practicing your abilities on the mean streets with nothing but your own instinct as a guide. What you lost in polish and tactical acumen you make up for in raw power.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-selfTaught-b',
				name: 'Self Taught',
				description: 'At the start of your turn during combat, you can forgo gaining heroic resources until the start of your next turn. If you do, until the start of your next turn your strikes deal additional damage equal to your highest characteristic score.'
			})
		]
	};

	static sewerFolk: Complication = {
		id: 'comp-sewerFolk',
		name: 'Sewer Folk',
		description: 'Impoverished or on the run, you spent formative years living in the sewers of a major city. There you learned lessons that have stood you well, although the miasma of the sewers did permanent damage to your health.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-sewerFolk-b',
				name: 'Sewer Folk Benefit',
				description: 'Your movement gains either the Climb or Swim keyword (your choice). Additionally, while in a city you and your companions can move from place to place without being detected, and you never get lost while underground.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-sewerFolk-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Poison , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static shadowBorn: Complication = {
		id: 'comp-shadowBorn',
		name: 'Shadow Born',
		description: 'You were born in the dusk land ruled by the Queen of Shadows, and its darkness has seeped into your bones.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-shadowBorn-b',
				name: 'Shadow Born Benefit',
				description: 'When you start your turn in concealment, you gain a surge.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-shadowBorn-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Holy , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static sharedSpirit: Complication = {
		id: 'comp-sharedSpirit',
		name: 'Shared Spirit',
		description: 'A supernatural spirit shares your body; each of you controls your body by turn. You and the spirit share the same short-term goals and work equally well with your companions, although you may have different personalities, mannerisms, and long-term goals.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-sharedSpirit-b',
				name: 'Shared Spirit',
				description: 'At the start of each day, roll 1d6. On a 1-4, you control your body. On a 5-6, the spirit does. Alternatively, if you and the spirit are on good terms, you can choose each day who is in control. Choose three of your skills that you possess only while you are in control, and choose three new skills that you can use only while your spirit is in control.'
			})
		]
	};

	static shatteredLegacy: Complication = {
		id: 'comp-shatteredLegacy',
		name: 'Shattered Legacy',
		description: 'You’re the heir to a powerful magical treasure that has been in your family for generations. The only problem: it’s broken. Some ancestor of yours broke it while saving the world, or maybe they tripped and smashed it on a rock. It’s your job to fix it.',
		features: [
			FactoryLogic.feature.createLanguageChoice({
				id: 'comp-shatteredLegacy-lang'
			}),
			FactoryLogic.feature.createItemChoice({
				id: 'comp-shatteredLegacy-b',
				name: 'Shattered Legacy Benefit',
				description: 'You gain a leveled item of your choice.',
				types: [ ItemType.LeveledArmor, ItemType.LeveledImplement, ItemType.LeveledWeapon, ItemType.Leveled ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-shatteredLegacy-d',
				name: 'Shattered Legacy Drawback',
				description: 'The leveled item you gain from this complication is broken and completely inoperative. Repairing the item requires using the Craft Treasure project, and the goal is half what it would normally be to create such an item. You have the project source you need to fix the item, but not the item prerequisite.'
			})
		]
	};

	static shipwrecked: Complication = {
		id: 'comp-shipwrecked',
		name: 'Shipwrecked',
		description: 'You are the sole survivor of a shipwreck that left you stranded on a remote and inhospitable island for years. Your struggle to survive there granted you insight into the natural world but distanced you from who you once were.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-shipwrecked-b',
				name: 'Shipwrecked Benefit',
				listOptions: [ SkillList.Exploration ],
				count: 2
			}),
			FactoryLogic.feature.create({
				id: 'comp-shipwrecked-d',
				name: 'Shipwrecked Drawback',
				description: 'You have forgotten one language you know.'
			})
		]
	};

	static siblingsShield: Complication = {
		id: 'comp-siblingsShield',
		name: 'Sibling\'s Shield',
		description: 'You were tasked with delivering a ceremonial shield to your older sibling, a celebrated warrior, for their years of service. When you arrived at their homestead, you found them dead on their doorstep with their sword lodged in their back. If you were going to find out who did this to them and why, you needed to step into their shoes. It will take a while to match up to your sibling’s legacy, though.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-siblingsShield-b',
				name: 'Sibling\'s Shield Benefit',
				description: 'You cannot be flanked as long as you wear your sibling’s shield on your back.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-siblingsShield-d',
				name: 'Sibling\'s Shield Drawback',
				description: 'Visions of your dead sibling haunt you at night. Whenever you take a respite, make an Intuition test without applying a skill. On a 17 or lower or lower, you gain 1 fewer Recoveries than your normally would when the respite ends.'
			})
		]
	};

	static silentSentinel: Complication = {
		id: 'comp-silentSentinel',
		name: 'Silent Sentinel',
		description: 'You were trained by a group of spies who psionically infused silence into your every step and enhanced your ability to hear distant whispers. It wasn’t until you got caught by an elementalist who blasted you with thunder that you learned the enhanced hearing had some nasty side effects.',
		features: [
			FactoryLogic.feature.createSkill({
				id: 'comp-silentSentinel-skill1',
				skill: 'Eavesdrop'
			}),
			FactoryLogic.feature.createSkill({
				id: 'comp-silentSentinel-skill2',
				skill: 'Sneak'
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-silentSentinel-skill3',
				listOptions: [ SkillList.Lore ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-silentSentinel-b',
				name: 'Silent Sentinel Benefit',
				description: 'You can silently communicate with any creature, provided you share a language and can see each other.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-silentSentinel-d',
				name: 'Silent Sentinel Drawback',
				description: 'When you take sonic damage, you are dazed until the end of your next turn.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-silentSentinel-mod',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Sonic , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static slightCaseOfLycanthropy: Complication = {
		id: 'comp-slightCaseOfLycanthropy',
		name: 'Slight Case of Lycanthropy',
		description: `
Maybe you were bitten as a child, or maybe it’s a family curse. Either way, you have a malady that is best not discussed in public, lest the torches and pitchforks make their appearance.

Note: Stormwight furies can’t take this complication.`,
		features: [
			FactoryLogic.feature.create({
				id: 'comp-slightCaseOfLycanthropy-b',
				name: 'Slight Case of Lycanthropy Benefit',
				description: 'When you wind or kill a non-minion creature, you gain a surge.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-slightCaseOfLycanthropy-d',
				name: 'Slight Case of Lycanthropy Drawback',
				description: 'If you have five or more surges at the start of your turn, or you have at least one surge at the start of your turn while in moonlight, you lose all your surges and become a woflish hybrid until the end of your turn. While in the form, you either make a melee free strike at the nearest creature or shift up to your speed towards the nearest creature and make a melee free strike against them if you can. If allies and enemies are equally close, you attack an ally.'
			})
		]
	};

	static stolenFace: Complication = {
		id: 'comp-stolenFace',
		name: 'Stolen Face',
		description: 'An evil fairy cursed you, leaving you with a blank expanse instead of a face. Although you’re able to imitate other peoples’ features, you’d like to have your own back.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-stolenFace-b',
				name: 'Stolen Face Benefit',
				description: 'You can spend 5 uninterrupted minutes to rearrange your face into that of another creature of your ancestry who you’ve seen before. You gain a double edge on tests made to impersonate this creature or to disguise your identity. You are unable to change your hair or other non-facial features.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-stolenFace-d',
				name: 'Stolen Face Drawback',
				description: 'When you take damage, your face is blank, with no eyes, nose, mouth, or ears. Your face doesn’t return until you spend 5 uninterrupted minutes rearranging it.'
			})
		]
	};

	static stoneCursed: Complication = {
		id: 'comp-stoneCursed',
		name: 'Stone Cursed',
		description: 'As a child, you met a creature that turns people to stone, such as a medusa. You escaped half-petrified, but others, not so lucky, are statues now, waiting for a cure.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-stoneCursed-b',
				name: 'Stone Cursed Benefit',
				description: 'While unmoving you appear to be an ordinary statue.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-stoneCursed-d',
				name: 'Stone Cursed Drawback',
				description: 'While you are winded you are dazed.'
			}),
			FactoryLogic.feature.createBonus({
				id: 'comp-stoneCursed-mod1',
				field: FeatureField.Stability,
				value: 1
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-stoneCursed-mod2',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Sonic , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static strangeInheritance: Complication = {
		id: 'comp-strangeInheritance',
		name: 'Strange Inheritance',
		description: 'Your siblings each inherited money or land, but you got a strange, seemingly useless trinket, along with the advice that maybe you weren’t cut out for an ordinary, peaceful life.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-strangeInheritance-b',
				name: 'Strange Inheritance Benefit',
				description: 'You gain a somewhat inoperative 2nd echelon trinket of the Director’s choice. It only works while the total of your level plus your Victories is 5 or higher. You don’t learn what the item’s powers are until the first time it becomes operative.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-strangeInheritance-d',
				name: 'Strange Inheritance Drawback',
				description: 'With no other inheritance, you accumulated debts. The first time your Wealth exceeds 1, you lose 1 Wealth.'
			})
		]
	};

	static strippedOfRank: Complication = {
		id: 'comp-strippedOfRank',
		name: 'Stripped of Rank',
		description: 'You were trained as an officer, but you no longer serve. Did you flee a battle? Were you dishonorably discharged? Did you defect from an evil army?',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-strippedOfRank-b',
					name: 'Issue Order',
					description: '“Move or die, folks.”',
					type: FactoryLogic.type.createAction(),
					keywords: [ AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: '1 ally',
					effect: `
The target can use its triggered action to take an action, a move action, or a maneuver.

Note: If you have the Strike Now tactician ability, the target can use a free triggered action instead of a triggered action to use this ability.`
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-strippedOfRank-d',
				name: 'Stripped of Rank Drawback',
				description: 'You need 4 Renown, instead of 3, to attract a follower and can gain additional followers for every 4 Renown, instead of 3, you gain after that.'
			})
		]
	};

	static thrillSeeker: Complication = {
		id: 'comp-thrillSeeker',
		name: 'Thrill Seeker',
		description: 'You live for danger. In battle and peril, you can transcend your usual limits - and once you’ve tasted that excitement, you want more.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-thrillSeeker-b',
				name: 'Thrill Seeker Benefit',
				description: 'When the party reaches two, four, and six victories, you gain a hero token.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-thrillSeeker-d',
				name: 'Thrill Seeker Drawback',
				description: 'At the start of the session, the party doesn’t gain a hero token for your character.'
			})
		]
	};

	static vampireSire: Complication = {
		id: 'comp-vampireSire',
		name: 'Vampire Sire',
		description: 'A vampire has bitten you. You’re not undead - not yet anyway - but you have a connection with your vampire sire, and you feel urges you fight to control.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-vampireSire-b',
				name: 'Vampire Sire Benefit',
				description: 'When you make a melee free strike against an adjacent creature, you can make it a bite. If you do so, you gain temporary Stamina equal to the damage you dealt. This temporary Stamina lasts until the end of your next respite if it doesn’t disappear due to damage.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-vampireSire-d',
				name: 'Vampire Sire Drawback',
				description: 'While you have temporary Stamina from this complication, your vampire sire can sense your location, you grow visible fangs, and you have a bane on Presence tests made to interact with humanoids who aren’t undead.'
			})
		]
	};

	static vowOfDuty: Complication = {
		id: 'comp-vowOfDuty',
		name: 'Vow of Duty',
		description: 'You have sworn an oath to an organization. It is your rock, and as long as your faith in it remains unshaken, you are immovable.',
		features: [
			FactoryLogic.feature.createBonus({
				id: 'comp-vowOfDuty-b',
				field: FeatureField.Stability,
				value: 1
			}),
			FactoryLogic.feature.create({
				id: 'comp-vowOfDuty-d',
				name: 'Vow of Duty Drawback',
				description: 'If you are forced to disobey your organization’s orders, your stability is reduced to 0 until your doubts are resolved or you find a new organization.'
			})
		]
	};

	static vowOfHonesty: Complication = {
		id: 'comp-vowOfHonesty',
		name: 'Vow of Honesty',
		description: 'You were brought up to a strict standard of behavior. You cannot tell a lie.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-vowOfHonesty-b',
				name: 'Vow of Honesty Benefit',
				description: 'As long as you don’t lie, you gain the benefit of the Censor’s A Sense for Truth Order feature. If you also gain the A Sense for Truth feature in another way, you also gain a double edge on tests made to persuade a creature of a specific fact.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-vowOfHonesty-d',
				name: 'Vow of Honesty Drawback',
				description: 'When you lie, your honor is stained, and you gain a bane on any test you make that uses a skill from the interpersonal skill group and lose this complication’s benefit. You can lose the bane and regain this complication’s benefit only by doing penance, such as gaining the forgiveness of the creature you lied to.'
			})
		]
	};

	static wakingDreams: Complication = {
		id: 'comp-waking-dreams',
		name: 'Waking Dreams',
		description: 'You broke a magic amulet that immersed your mind in weird magic. This magic has given you the power of premonition, but you struggle to control this new gift.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-waking-dreams-bd',
				name: 'Waking Dreams',
				description: `
Whenever you take a respite, make a Reason power roll.

| Roll    | Effect                                                                                                                                                           |
|:--------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 11 -    | You receive a painful vision that is fractal and inscrutable. When the respite ends, you immediately lose 1 Recovery.                                            |
| 12 - 16 | You experience a vision of an event currently happening in your world. The vision lasts for just a few seconds, but the information you glean is helpful to you. |
| 17 +    | You receive a full minute or more of the scene.                                                                                                                  |`
			})
		]
	};

	static warDogCollar: Complication = {
		id: 'comp-warDogCollar',
		name: 'War Dog Collar',
		description: 'You wear a loyalty collar from one Ajax’s War Dogs. You’ve managed to rig the collar so it explodes outward while keeping you safe.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-warDogCollar-b',
				name: 'War Dog Collar Benefit',
				description: 'While you wear your loyalty collar, other war dogs can’t use Posthumous Promotion on you.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-warDogCollar-ability',
					name: 'Posthumous Retirement',
					description: 'You make your modified collar explode.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
					target: 'All enemies',
					effect: 'Your loyalty collar detonates, dealing fire damage equal to 5 plus your level to each target. Once you have used this ability, you can’t use it again until you spend 1 minute out of combat resetting the collar.'
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-warDogCollar-d',
				name: 'War Dog Collar Drawback',
				description: 'When you use your Posthumous Retirement ability, the Director can spend 3 Malice to make your collar malfunction and deal damage to you.'
			})
		]
	};

	static warOfAssassins: Complication = {
		id: 'comp-war-of-assassins',
		name: 'War Of Assassins',
		description: 'Being in the wrong place at the wrong time saw you caught in the middle of a conflict between two warring thieves’ guilds. Whether by choice or by accident, you wound up helping one faction at the expense of the other.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-war-of-assassins-b',
				name: 'War Of Assassins Benefit',
				description: 'Having gained the favor of the faction who you helped, you can call on its members three times for favors. If a favor is reasonable and within the faction’s power to grant, they’ll do it, no questions asked.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-war-of-assassins-d',
				name: 'War Of Assassins Drawback',
				description: 'The faction you wronged hates you, and its members would love to see you pay for your transgression.'
			})
		]
	};

	static ward: Complication = {
		id: 'comp-ward',
		name: 'Ward',
		description: 'Your childhood sweetheart was royalty, and the two of you stayed close throughout the years. When your former sweetheart died, you swore an oath to dedicate your life to become a tutor for their child, advising them in the ways of being a benevolent monarch.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-ward-b',
				name: 'Ward Benefit',
				description: 'You know how to talk to monarchs, aristocrats, and other wealthy leaders. When you engage with any such NPC during a negotiation, their patience increases by 1 (to a maximum of 5).'
			}),
			FactoryLogic.feature.create({
				id: 'comp-ward-d',
				name: 'Ward Drawback',
				description: 'Your royal ward can be a burden. When you start a respite, roll a d10. On a roll of 1, your ward contacts you and requires your help during the respite, requiring you to spend your time helping them instead of taking a respite activity.'
			})
		]
	};

	static waterborn: Complication = {
		id: 'comp-waterborn',
		name: 'Waterborn',
		description: 'You nearly lost your life at sea, but then you heard the voice. Someone … something in the sea called out to you - telling you to swim. Suddenly the ocean wasn’t your doom. It was your parent, birthing you into something new. You emerge with a small piece of the ocean’s power. For what purpose - you can’t be sure.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-waterborn-b',
				name: 'Waterborn Benefit',
				description: 'Your movement gains the Swim tag, and you can breathe underwater.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-waterborn-ability',
					name: 'Rogue Wave',
					description: 'You summon a wave of water to batter your foe.',
					type: FactoryLogic.type.createAction(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: '1 creature or object',
					powerRoll: FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
						tier1: '2 damage; push or pull 1',
						tier2: '5 damage; push or pull 2',
						tier3: '7 damage; push or pull 3'
					}),
					effect: 'You can forgo dealing damage with this ability.'
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-waterborn-d',
				name: 'Waterborn Drawback',
				description: 'The sea, or one of its representatives, can assign you a quest. If you don’t do the sea’s bidding, it may temporarily deny you this complication’s benefits - including water breathing - at an inconvenient time.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-waterborn-mod',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Lightning , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static wodewalker: Complication = {
		id: 'comp-wodewalker',
		name: 'Wodewalker',
		description: 'You were dying in the wode - starving and wounded, you collapsed. When you woke, you found a group of green elementalists had saved your life by infusing the regenerative bark of a tree to your body.',
		features: [
			FactoryLogic.feature.createBonus({
				id: 'comp-wodewalker-b',
				field: FeatureField.RecoveryValue,
				valueCharacteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-wodewalker-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Fire , modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static wrathfulSpirit: Complication = {
		id: 'comp-wrathfulSpirit',
		name: 'Wrathful Spirit',
		description: 'You’re quick to anger, and some even say you’re possessed by a literal spirit of wrath. You never let an insult go without slinging one right back. In combat, things are similar: no matter the tactical circumstances, when someone injures you, you feel compelled to answer blood with blood.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-wrathfulSpirit-b',
				name: 'Wrathful Spirit Benefit',
				description: 'While you are taunted by a creature, you gain an edge on attacks against that creature. If you have the Rage heroic resource, you can spend 1 rage to make it a double edge.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-wrathfulSpirit-d',
				name: 'Wrathful Spirit Drawback',
				description: 'In conversation or negotiation, when a creature insults you, you must either spend a Recovery or reply with an insult. Furthermore, in combat, whenever a creature hits you with an strike while you are not taunted, you are taunted (EoT) by that creature.'
			})
		]
	};

	static wronglyImprisoned: Complication = {
		id: 'comp-wronglyImprisoned',
		name: 'Wrongly Imprisoned',
		description: 'You spent many years imprisoned for a crime you didn’t commit. During your long hours of solitary confinement, you honed your skills and you recited the names of those who framed you. Someday you will have your revenge.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-wronglyImprisoned-b',
				listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Intrigue, SkillList.Lore ],
				count: 2
			}),
			FactoryLogic.feature.create({
				id: 'comp-wronglyImprisoned-d',
				name: 'Wrongly Imprisoned Drawback',
				description: 'Your health suffered in prison. While you are winded, you develop a hacking cough, which makes it impossible for you to hide or sneak.'
			})
		]
	};
}
