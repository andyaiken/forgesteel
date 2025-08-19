import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { Complication } from '../models/complication';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { DamageType } from '../enums/damage-type';
import { FactoryLogic } from '../logic/factory-logic';
import { FeatureField } from '../enums/feature-field';
import { ItemType } from '../enums/item-type';
import { LanguageType } from '../enums/language-type';
import { SkillList } from '../enums/skill-list';

export class ComplicationData {
	static advancedStudies: Complication = {
		id: 'comp-advanced-studies',
		name: 'Advanced Studies',
		description: 'You somehow obtained the notebook of a brilliant but eccentric member of your class. The knowledge held within those notes should help you unlock powerful new abilities — if you can ever figure out what the notes mean.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-advanced-studies-1',
					name: 'Advanced Study Benefit and Drawback',
					description: 'As a respite activity, you can study the notebook.',
					type: FactoryLogic.type.createNoAction(),
					keywords: [ ],
					distance: [ ],
					target: 'None',
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence, Characteristic.Agility, Characteristic.Might ],
								tier1: 'You summon a hostile demon of your level or lower who attacks you at the end of the respite. The demon gets to act first in the combat, no matter any other creature’s traits or abilities.',
								tier2: 'You learn nothing and your time is wasted.',
								tier3: 'You learn one bonus heroic ability from your class that you qualify for. You only know the ability until you finish your next respite.'
							})
						)
					]
				})
			})
		]
	};

	static amnesia: Complication = {
		id: 'comp-amnesia',
		name: 'Amnesia',
		description: 'You have no memory of your past before the … incident. Hopefully you’ll regain your memory soon and find out what the incident was. In the meantime, you need friends so you’re not alone when your past catches up to you.',
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

	static animalForm: Complication = {
		id: 'comp-animal-form',
		name: 'Animal Form',
		description: 'Due to a magical accident, your being has fused with a small, harmless animal. You turn into this animal when it’s convenient - and sometimes when it’s inconvenient as well.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-animal-form-b',
				name: 'Animal Form Benefit',
				description: 'As a manuever, you take the form of a specific 1T animal. You retain all your other statistics aside from your size, but you can’t talk or use actions, and the only maneuvers you can use are Escape Grab, Hide, and Stand Up. Based on the animal you can turn into, you might be able to burrow or fly, or to automatically climb or swim at full speed while moving. If your animal form doesn’t provide such additional movement, you have a +2 bonus to speed. Unless you use this benefit again, you return to your true form at the start of your next turn.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-animal-form-d',
				name: 'Animal Form Drawback',
				description: 'At the start of your turn while you are winded, the Director can spend 1 Malice to force you to take your animal form. Once the Director has done so, they can’t do so again until you have finished a respite.'
			})
		]
	};

	static antihero: Complication = {
		id: 'comp-antihero',
		name: 'Antihero',
		description: 'You used to be a villain. You’re (mostly) reformed now, but in desperate moments, you sometimes draw on the rage and hatred that fueled your old life. In those moments, even your friends aren’t sure whose side you’re on. They don’t need to worry, though. Once you leave evil behind, you can’t go back. You’ve made too many enemies on the other side.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-antihero-b',
				name: 'Antihero Benefit',
				description: 'You have 3 antihero tokens. Whenever you use an ability or effect that costs your Heroic Resource, you can spend 1 antihero token to in place of 1 Heroic Resource. While you have fewer than 3 antihero tokens and you would earn a hero token for your party through your deeds, you instead regain 1 antihero token.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-antihero-d',
				name: 'Antihero Drawback',
				description: 'While you have fewer than 3 antihero tokens, you exude a villainous aspect. You and each ally within 5 squares of you takes a bane on all tests made to interact with other creatures.'
			})
		]
	};

	static artifactBonded: Complication = {
		id: 'comp-artifactBonded',
		name: 'Artifact Bonded',
		description: 'A powerful artifact has bonded to you. You might be destined to wield the artifact or to destroy it. You’re not powerful enough to use it at the moment, although you might be some day. For now, though, the artifact has no effect beyond getting you in trouble.',
		features: [
			FactoryLogic.feature.createItemChoice({
				id: 'comp-artifactBonded-b1',
				types: [ ItemType.Artifact ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-artifactBonded-b2',
				name: 'Artifact Bonded Benefit',
				description: 'The first time in an encounter that you are reduced to 0 Stamina against your will, the artifact appears on your person. It disappears at the end of your next turn, when you benefit from one of its properties, or when you have more than 0 Stamina, whichever comes first.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-artifactBonded-d',
				name: 'Artifact Bonded Drawback',
				description: 'Each time the artifact appears, you lose a Recovery. If you have no Recoveries remaining, you take 1d10 damage instead, which can’t be reduced in any way.'
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
				description: 'Whenever you don’t know what to do, you can appeal to your loved one’s spirit for help. You spend a hero token to let the Director determine the next thing you do, whether in or out of combat. The Director chooses the best course of action they can think of for you, even if it relies on information you don’t have. If the Director can’t think of a particularly good course of action for you to take, you don’t spend the hero token.'
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
		description: 'Your parents made a deal, and as part of that deal, you’re supposed to marry someone - or something - you didn’t choose. But no one is going to tell you what to do! They’ll all be sorry to find that you’ve run away to become a mighty adventurer.',
		features: [
			FactoryLogic.feature.createItemChoice({
				id: 'comp-betrothed-b',
				name: 'Betrothed Benefit',
				description: 'You escaped with a dowry present — a 1st echelon trinket of your choice.',
				types: [ ItemType.Trinket ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-betrothed-d',
				name: 'Betrothed Drawback',
				description: 'All those who learn of you running out on your commitment think less of you and spread nasty rumors about you. Your Renown can’t ever be more than your level – 1.'
			})
		]
	};

	static chaosTouched: Complication = {
		id: 'comp-chaosTouched',
		name: 'Chaos Touched',
		description: 'You came into contact with a mote of pure chaos energy, or were subjected to a supernatural effect or object that fused chaos into your very being. Now you can sprout and retract limbs in a way that horifies unprepared onlookers.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-chaosTouched-b',
				name: 'Chaos Touched Benefit',
				description: 'You gain an edge on the Escape Grab, Grab, and Knockback maneuvers. Additionally, you can hold an additional item even when your hands are full.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-chaosTouched-d',
				name: 'Chaos Touched Drawback',
				description: 'While dying, you grow and retract uncoordinated limbs, imposing a bane on your power rolls.'
			})
		]
	};

	static chosenOne: Complication = {
		id: 'comp-chosenOne',
		name: 'Chosen One',
		description: 'Perhaps the stars marked you out at birth, or maybe your name appears in an ancient prophecy. In any case, a sinister cult has decided that you’re important to their plans — though you don’t particularly like the fate those plans have in store for you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-chosenOne-b',
				name: 'Chosen One Benefit',
				description: 'You have 3 destiny points. Whenever you spend your Heroic Resource for your class, you can spend 1 or more destiny points instead. Each time you earn a Victory, you regain 1 destiny point.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-chosenOne-d',
				name: 'Chosen One Drawback',
				description: 'Whenever you spend 1 or more destiny points, you take 1d10 psychic damage that can’t be reduced in any way, and the cult that seeks you becomes aware of your location.'
			})
		]
	};

	static consumingInterest: Complication = {
		id: 'comp-consumingInterest',
		name: 'Consuming Interest',
		description: 'Ever since you were a kid, you’ve been obsessed with a certain topic. During your travels, you spend your free time gleaning all the information you can on that obsession. You might not be the world’s leading expert quite yet, but people should certainly trust your opinion on the topic.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-consumingInterest-skill',
				listOptions: [ SkillList.Lore ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-consumingInterest-b',
				name: 'Consuming Interest Benefit',
				description: `
You can use the following project up to three times for your chosen skill. Each time you use the project, you must use a different project source, and the project goal increases.

**Study Lore**
**Item Prerequisite**: None
**Project Source**: A significant source of information on the topic, such as a major library or a world-renowned sage
**Project Roll Characteristic**: Reason
**Project Goal**: 120, 150, 180

Each time you complete this project, your knowledge of your chosen field expands, and the bonus to tests provided by your chosen skill increases by 1.`
			}),
			FactoryLogic.feature.create({
				id: 'comp-consumingInterest-d',
				name: 'Consuming Interest Drawback',
				description: 'You can’t imagine ever being wrong on the topic of your obsession. Whenever you make a test to recall lore using your chosen skill, the Director makes the test in secret. Instead of informing you whether you’re right or wrong, they provide you with correct information if you succeeded and false information if you failed.'
			})
		]
	};

	static corruptedMentor: Complication = {
		id: 'comp-corruptedMentor',
		name: 'Corrupted Mentor',
		description: 'Your mentor taught you everything and you trusted them completely - until they went rogue, betraying you or the organization you both belonged to. Their current whereabouts and activities are unknown, though disturbing rumors are heard from time to time. Even worse, as their former pupil, you’re now under suspicion as well',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-corruptedMentor-b-text',
				name: 'Corrupted Mentor Benefit',
				description: 'You know the Corrupt Spirit maneuver, taught to you by your mentor. (In retrospect, that probably should have aroused your suspicion.)'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-corruptedMentor-b-ability',
					name: 'Corrupted Spirit',
					description: 'You unlock the sinister secrets of pain',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					sections: [
						FactoryLogic.createAbilitySectionText('Until the end of your turn, whenever you use a damage-dealing heroic ability against a single target, you can weaken that target’s life force. The ability deals extra corruption damage equal to your highest characteristic score.')
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-corruptedMentor-d',
				name: 'Corrupted Mentor Drawback',
				description: 'You have holy weakness 1. Each time you use Corrupt Spirit, your holy weakness increases by 1, to a maximum equal to your recovery value. Whenever you take holy damage, this weakness resets to 1.'
			})
		]
	};

	static coward: Complication = {
		id: 'comp-coward',
		name: 'Coward',
		description: 'Some call you a coward, just because you shriek and run when you encounter danger. Sure, you might not have the natural bravado of less-imaginative people, and sure, you’re always imagining the many horrible ways you could die, but you’re used to fear. When you run in terror, you run toward the enemy.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-coward-b',
				name: 'Coward Benefit',
				description: 'While your are frightened, you can move toward the source of your fear.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-coward-d',
				name: 'Coward Drawback',
				description: 'Whenever you make a saving throw to end the frightened condition, you roll 2d10 and take the lower roll.'
			})
		]
	};

	static crashLanded: Complication = {
		id: 'comp-crashLanded',
		name: 'Crash Landed',
		description: 'You used to flit around the stars in your own ship. But an ugly run-in with a pirate (or a pirate hunter) has left you marooned on this backwater world. You’re prepared to carve out a life here — at least until you can hitch a ride somewhere else',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-crashLanded-skill',
				listOptions: [ SkillList.Lore ],
				selected: [ 'Timescape' ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-crashLanded-b',
				name: 'Crash Landed Benefit',
				description: 'You have a power pack that you can activate or deactivate as a maneuver. When you activate the power pack, choose an energy type from cold, fire, lightning, or sonic.  Until you deactivate the power pack, your damage-dealing abilities deal that damage type'
			}),
			FactoryLogic.feature.create({
				id: 'comp-crashLanded-d',
				name: 'Crash Landed Drawback',
				description: 'You take a bane on tests made to know about anything related to the world where you crash landed.'
			})
		]
	};

	static cultVictim: Complication = {
		id: 'comp-cult-victim',
		name: 'Cult Victim',
		description: 'Cultists captured you while raiding your home, then began an unholy ritual to turn your body into an undead spirit. Though the ritual failed, your body became infused with corrupted magic, turning you partially incorporeal.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-cult-victim-b',
				name: 'Cult Victim Benefit',
				description: 'Once per turn, you can move through solid matter 1 square thick or less. If you end your turn inside solid matter, you are forced out into the space from which you entered it and you take 5 damage that can’t be reduced in any way.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-cult-victim-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static curseOfCaution: Complication = {
		id: 'comp-carefulCurse',
		name: 'Curse of Caution',
		description: 'When you were young, you did something reckless and unthinking that endangered a hag or cost them something dear. The hag cursed you to always take your time, forcing you to be cautious and thorough — even to your detriment. The curse has saved you from trouble a few times, but not being able to get away from trouble might be your downfall if you can’t shake it.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-carefulCurse-b',
				name: 'Careful Curse Benefit',
				description: 'Until you’ve taken your turn in a combat round, any strike made against you takes a bane.'
			}),
			FactoryLogic.feature.createBonus({
				id: 'comp-carefulCurse-d',
				field: FeatureField.Speed,
				value: -1
			})
		]
	};

	static curseOfImmortality: Complication = {
		id: 'comp-curseOfImmortality',
		name: 'Curse of Immortality',
		description: 'For as long as you can remember, you’ve never gotten older. You’ve simply adventured through one age after another. Still, your memory of past events — even those you were involved with — is a little hazy. Apparently, your memory isn’t as long-lived as you are.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-curseOfImmortality-b',
				name: 'Curse of Immortality Benefit',
				description: 'You don’t age. Additionally, whenever you would die, you instead enter a state of suspended animation indistinguishable from death. If your body isn’t destroyed by dying or while you remain in this state, you come back to life after 12 hours and regain Stamina equal to your recovery value.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-curseOfImmortality-d',
				name: 'Curse of Immortality Drawback',
				description: 'You take a bane on any test made to recall lore.'
			})
		]
	};

	static curseOfMisfortune: Complication = {
		id: 'comp-curseOfMisfortune',
		name: 'Curse of Misfortune',
		description: 'You should have never pissed off that mage! Maybe they deserved your ire, or maybe you were just a bully. But whatever the case, they cursed you before skipping town. Now, in moments of pressure that require great skill, you have a tendency to choke, falling and flailing in such a dramatic fashion that you take everyone with you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-curseOfMisfortune-b',
				name: 'Curse of Misfortune Benefit and Drawback',
				description: 'Whenever you make a test in combat and incur a consequence, you ignore that consequence. Instead, you and each ally adjacent to you fall prone.'
			})
		]
	};

	static curseOfPoverty: Complication = {
		id: 'comp-curseOfPoverty',
		name: 'Curse of Poverty',
		description: 'A soothsayer once predicted you would have a long life, even as they told you you’d never be rich. But you’re determined to prove them wrong. You’ll get rich or die trying!',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-curseOfPoverty-b',
				name: 'Curse of Poverty Benefit and Drawback',
				description: 'Whenever you take a respite while your Wealth is higher than 1, some improbable event occurs that causes most of your money to vanish—including money you’ve hidden, loaned to others, or given away. Your Wealth is reduced to 1. For each point of Wealth you lose this way, your number of Recoveries increases by 1. Your Recoveries reset to their usual value the first time you take a respite with fewer Recoveries than your maximum'
			})
		]
	};

	static curseOfPunishment: Complication = {
		id: 'comp-punishment-curse',
		name: 'Curse of Punishment',
		description: 'Through ignorance, fear, spite, or selfishness, you refused to help someone in need. To teach you a lesson, a deity offered you what seemed to be a blessing — extra power to help you heal yourself in times of need, but harsh consequences should your need become excessive. You took the deal, and now benefit from the blessing but also suffer from a curse. ',
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

	static curseOfStone: Complication = {
		id: 'comp-stoneCursed',
		name: 'Curse of Stone',
		description: 'As a child, you met a creature that turns people to stone, such as a medusa. You escaped half-petrified, avoiding the fate of others who stand as statues now.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-stoneCursed-b',
				name: 'Stone Cursed Benefit',
				description: 'You can use a free maneuver to cause your body, gear, and any items you hold to take on the appearance of stone, making you appear to be a mundane statue while you remain unmoving.'
			}),
			FactoryLogic.feature.createBonus({
				id: 'comp-stoneCursed-mod1',
				field: FeatureField.Stability,
				value: 1
			}),
			FactoryLogic.feature.create({
				id: 'comp-stoneCursed-d',
				name: 'Stone Cursed Drawback',
				description: 'While you are winded you are dazed.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-stoneCursed-mod2',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Sonic, modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static cursedWeapon: Complication = {
		id: 'comp-cursedWeapon',
		name: 'Cursed Weapon',
		description: 'When you were young, you found or were given a magic weapon. Since then, you’ve carried it always at your side, letting it inspire you to lead the life of a hero — even though the weapon is cursed.',
		features: [
			FactoryLogic.feature.createItemChoice({
				id: 'comp-cursedWeapon-b',
				types: [ ItemType.LeveledWeapon ]
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-cursedWeapon-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Damage, modifierType: DamageModifierType.Weakness, value: 2 })
				]
			})
		]
	};

	static disgraced: Complication = {
		id: 'comp-disgraced',
		name: 'Disgraced',
		description: 'You’re a disgraced member of a powerful family or guild, having been turned out by your relatives or peers. Those you were once close to won’t give you the time of day anymore, much less lend a helping hand, until you clear your name or clean up your act.',
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
				description: 'Anyone who has heard of you and is influenced by your Renown treats you as infamous. Whenever you are part of a negotiation with an NPC who has an interest of 2 or lower, that NPC makes a plan to hurt you personally after the negotiation ends—and carries that plan out.'
			})
		]
	};

	static dragonDreams: Complication = {
		id: 'comp-dragonDreams',
		name: 'Dragon Dreams',
		description: 'You sometimes have strange dreams of a raging inferno … a gleaming pile of treasure … spreading your wings and taking flight. You haven’t told anyone about the dreams, except for your one strange relative who seems to know more than they’re letting on.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-dragonDreams-b',
				name: 'Dragon Dreams Benefit',
				description: 'Choose two ancestry points worth of purchased dragon knight traits. You can use these traits whenever you have 5 or more Victories.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-dragonDreams-d',
				name: 'Dragon Dreams Drawback',
				description: 'Whenever you are reduced to 0 Stamina, you explode with heat and fire. You and each creature within 5 squares of you takes fire damage equal to twice your level. You can’t reduce this damage for yourself in any way.'
			})
		]
	};

	static elementalInside: Complication = {
		id: 'comp-elemental-inside',
		name: 'Elemental Inside',
		description: 'When an evil mage threatened someone you loved, you blocked that foe’s summoning of an elemental creature by absorbing their magic with your body. You are now infused with the power of that elemental - who isn’t at all happy about it.',
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
				description: 'While you are dying, your possessing elemental takes control of your body. The elemental yearns for destruction, causing you to attack the closest creature you notice without regard for your desires or your body’s safety. If you don’t do your best to fulfill the elemental’s rage, the Director can take temporary control of your hero.'
			})
		]
	};

	static evanesceria: Complication = {
		id: 'comp-evanesceria',
		name: 'Evanesceria',
		description: 'You have contracted a rare magical disease called evanesceria. From time to time, you’re not quite yourself—or anyone else either. You simply … vanish, then return later with no memory of your absence.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-evanesceria-b',
				name: 'Evanesceria Benefit',
				description: 'At the start of any combat round, you can attempt to absent yourself from reality by rolling a d10. On a 6 or higher, you disappear, then reappear in the space you left or the nearest unoccupied space of your choice when you take your turn. You can’t attempt to absent yourself again until you earn 1 or more Victories'
			}),
			FactoryLogic.feature.create({
				id: 'comp-evanesceria-d',
				name: 'Evanesceria Drawback',
				description: 'Whenever you start a respite activity, roll 2d10. If you roll a 1 on either die, you inadvertently absent yourself from reality, reappearing at the end of the respite. You gain the benefits of taking a respite but don’t perform the respite activity.'
			})
		]
	};

	static exile: Complication = {
		id: 'comp-exile',
		name: 'Exile',
		description: 'Whether you’re a convicted criminal, a noble stripped of their title, or a peron who made one too many enemies, you’ve been cast forth from your homeland, never to return. At least not until you’re strong enough to set things right.',
		features: [
			FactoryLogic.feature.createLanguageChoice({
				id: 'comp-exile-lang',
				description: 'You know one extant language of your choice.',
				options: [ LanguageType.Common ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-exile-d',
				name: 'Exile Drawback',
				description: 'If any NPC from your homeland recognizes you, whether in your homeland or elsewhere, they attempt to harm you at the Director’s discretion.'
			})
		]
	};

	static fallenImmortal: Complication = {
		id: 'comp-fallenImmortal',
		name: 'Fallen Immortal',
		description: 'You used to be an immortal creature, dispensing justice and doing the bidding of the gods. Now, as a punishment or reward, you have been ordered to set yor true nature aside and become a mortal. Your remaining years will be short, but living aside your fellow mortals gives your life new meaning.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-fallenImmortal-skill',
				listOptions: [ SkillList.Lore ],
				selected: [ 'Religion' ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-fallenImmortal-b',
				name: 'Fallen Immortal Benefit',
				description: 'Whenever you use an ability that deals untyped damage, that ability can deal holy damage instead.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-fallenImmortal-d',
				name: 'Fallen Immortal Drawback',
				description: 'You will never fully gain a mortal’s comfort with untruth. Any test you make to deceive another creature takes a bane.'
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
You have a piece of magic jewelry, such as a signet ring. As a maneuver, you can use the item to summon your relative to your aid. Your relative starts with a Renown of 10 but otherwise has the same statistics you do. They make power rolls with an edge but don’t gain the benefits of any of your treasures. Your relative does their best to help you out of the current perilous situation, disappearing when the situation is resolved or after 1 hour. Once you summon your relative, you can’t do so again until you gain a level.`
			}),
			FactoryLogic.feature.create({
				id: 'comp-famousRelative-d',
				name: 'Famous Relative Drawback',
				description: 'You earn no Victories from combat encounters or other challenges for which your relative was present. Additionally, each time you summon your relative, the next time you gain Renown, your relative gains that Renown instead.'
			})
		]
	};

	static feytouched: Complication = {
		id: 'comp-feytouched',
		name: 'Feytouched',
		description: 'Your birth was attended by faeries. A friendly fairy blessed you, granting you strength so that you could defend yourself. In response, an unfriendly fairy granted you a life full of peril so that you might prove your strength.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-feytouched-b',
				name: 'Feytouched',
				description: 'At the start of a combat encounter, you can gain 1 additional Heroic Resource. If you do so, the Director gains 3 Malice.'
			})
		]
	};

	static fieryIdeal: Complication = {
		id: 'comp-fieryIdeal',
		name: 'Fiery Ideal',
		description: 'A spirit beyond your comprehension instilled in you a special purpose, choosing you to be the guardian of a place, a cause, or a philosophy. The flame that now burns in your soul can sear your enemies — or you if you fall short of expectations',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-fieryIdeal-b',
				name: 'Fiery Ideal Benefit',
				description: 'While you are fighting on behalf of your special purpose, whenever you obtain a tier 3 outcome with a damage-dealing ability, you deal extra fire damage equal to your highest characteristic score.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-fieryIdeal-d',
				name: 'Fiery Ideal Drawback',
				description: 'Whenever the Director determines that you act against your purpose or fail to live up to the high standards associated with it, you take fire damage equal to 5 + your level. This damage can’t be reduced in any way.'
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
					FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 5 }),
					FactoryLogic.damageModifier.create({ damageType: DamageType.Cold, modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static followingInTheFootsteps: Complication = {
		id: 'comp-followingInTheFootsteps',
		name: 'Following in the Footsteps',
		description: 'Your personal idol was a mighty hero, and you have modeled yourself after them. YFrom studying the many heroic tales told of them, you hope to someday learn their most famous battle technique.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-followingInTheFootsteps-b',
				name: 'Following in the Footsteps Benefit',
				description: 'Choose a heroic ability for your class of a higher level than you currently are. When you take this ability in future, its Heroic Resource cost is permanently reduced by 2 (to a minimum of 1)'
			}),
			FactoryLogic.feature.create({
				id: 'comp-followingInTheFootsteps-d',
				name: 'Following in the Footsteps Drawback',
				description: 'In your quest for advanced techniques, you have neglected the basics. Choose a heroic ability you already know. That ability’s Heroic Resource cost is permanently increased by 1.'
			})
		]
	};

	static forbiddenRomance: Complication = {
		id: 'comp-forbiddenRomance',
		name: 'Forbidden Romance',
		description: 'You are in love with someone powerful, but tragic circumstances mean you cannot be with them. Whether your lover is from a feuding family, betrothed to another, or has been driven from your side, you are fated to always be apart.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-forbiddenRomance-b',
				name: 'Forbidden Romance Benefit',
				description: 'You can secretly call on your betrothed for favors. Though they support you from afar, they might be constrained in how much aid they provide - and they can’t openly reveal their connection with you.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-forbiddenRomance-d',
				name: 'Forbidden Romance Drawback',
				description: 'When your lover is in trouble, they might call on you for help. But if your relationship is discovered, the circumstances that keep you apart will be made worse.'
			})
		]
	};

	static frostheart: Complication = {
		id: 'comp-frostheart',
		name: 'Frostheart',
		description: 'At the edge of the world, you were lost in a winter storm and presumed dead. But an unknown fate or power kept you alive, bringing you back with frosty skin and pale eyes.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-frostheart-b',
				name: 'Frostheart Benefit',
				description: 'Whwhenever you make a strike that deals untyped damage, that strike can deal cold damage instead.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-frostheart-mods',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, value: 5 }),
					FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Weakness, value: 5 })
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
				description: 'On your turn, you can choose a heroic ability that you would be able to learn if you were one level higher. Provided you meet the ability’s other prerequisites and can spend the required Heroic Resources, you can use this ability. Once you use this benefit, you can’t do so again until you have gained 2 Victories.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-gettingTooOldForThis-d',
				name: 'Getting Too Old For This Drawback',
				description: 'While you are winded, your speed is reduced by 2.'
			})
		]
	};

	static gnollMauled: Complication = {
		id: 'comp-gnollMauled',
		name: 'Gnoll-Mauled',
		description: `
As a child, you survived a gnoll attack. But that attack left you with a toothy scar and the occasional fit of bloodlust.

You can’t take this complication if you can’t be made dazed.`,
		features: [
			FactoryLogic.feature.create({
				id: 'comp-gnollBit-b',
				name: 'Gnoll-Mauled Benefit',
				description: 'Whenever an ally within 5 squares of you is reduced to 0 Stamina, you can use a triggered action to move up to your speed and make a free strike.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-gnollBit-d',
				name: 'Gnoll-Mauled Drawback',
				description: 'While you are dazed, if you start your turn adjacent to one or more creatures, you must use your action to make a melee free strike against an adjacent creature.'
			})
		]
	};

	static greening: Complication = {
		id: 'comp-greening',
		name: 'Greening',
		description: 'You once felt the call of a great tree in the middle of a forest, whose life force was being drained by a parasitic supernatural moss clinging to its roots. As you removed the moss, you felt as if you were being filled with green elemental energy. Sadly, the great tree withered before you could finish the job, but left behind a golden sapling you now carry with you, seeking the perfect place to plant it.',
		features: [
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-greening-mods',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 5 }),
					FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static grifter: Complication = {
		id: 'comp-grifter',
		name: 'Grifter',
		description: 'You used to be a con artist, but those days are pretty much behind you. Being a hero is an even better racket. After all, if you’re saving the world, who can be mad at you for stealing a couple of coins along the way?',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-grifter-b',
				listOptions: [ SkillList.Intrigue ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-grifter-d',
				name: 'Grifter Drawback',
				description: 'Whenever you meet an NPC for the first time, the Director can decide that NPC was a victim of one of your previous cons and remembers you. If they do so, the party gains a hero token.'
			})
		]
	};

	static grounded: Complication = {
		id: 'comp-grounded',
		name: 'Grounded',
		description: 'Once when you were a child, your settlement was in danger and you called out to the earth for aid. That call was answered by a summoning of protective dirt-and-stone walls, and ever since then, you’ve felt the earth’s presence as a friend and protector.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-grounded-b',
				name: 'Grounded Benefit',
				description: 'You gain the 1st-level Elementalist Specialization feature Motivate Earth. If you also gain this feature in any other way, the Motivate Earth ability becomes a ranged ability for you with a distance of ranged 5.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-grounded-d',
				name: 'Grounded Drawback',
				description: 'You attract lightning. When any creature within 2 squares of you takes lightning damage, you take 5 lightning damage that can’t be reduced in any way.'
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
				description: 'You’re determined to stay alive so you can set things right. When your Stamina reaches the negative of your winded value, you can use a free triggered action to spend a Recovery.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-guiltyConscience-d',
				name: 'Guilty Conscience Drawback',
				description: 'Many people blame you for the evils you caused. They may be unfriendly or hostile to you - and you can understand their point of view. You take a bane on any test made to interact with those who know what you did, and on strikes made against such creaturess.'
			})
		]
	};

	static hawkRider: Complication = {
		id: 'comp-hawkRider',
		name: 'Hawk Rider',
		description: 'You travel with a giant hawk that you stole from the Hawklords. Perhaps you might once have been a Hawklord yourself, or perhaps you escaped their captivity.  Having a giant hawk companion comes with its share of inconveniences and dangers, but those are a small price to pay for the freedom of the open sky.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-hawkRider-b',
				name: 'Hawk Rider Benefit',
				description: 'As long as you are not in a building or other structure, you can spend 1 uninterrupted minute to summon your giant hawk, which acts as your mount. You can dismiss the hawk at any time (no action required). The hawk won’t go inside buildings, dungeons, or other structures, and it won’t accept anyone but you as a rider. If the hawk takes damage or dies, you can restore them to full Stamina as a respite activity.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-hawkRider-d',
				name: 'Hawk Rider Drawback',
				description: 'People aware of the origin of your mount are afraid to interact with you, since they worry the Hawklords will come after them by association. You have a bane on tests made to influence anyone who knows of the Hawklords and who has observed you with your giant hawk. Such people might report you to the Hawklords, who can come looking for you at the Director’s discretion.'
			})
		]
	};

	static hostBody: Complication = {
		id: 'comp-hostBody',
		name: 'Host Body',
		description: '“Do not be alarmed! We are not the humanoid we appear to be. We are an intelligent fungal collective, using this body as a host. No, we are doing nothing unsavory! This body was dead when we found it, and we merely gave it another chance at life. We are friendly. Please put down those torches!”',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-hostBody-b',
				name: 'Host Body Benefit',
				description: 'You are a fungus that inhabits a humanoid body. Your host body follows all the usual rules for a character and is considered to be alive. At any time while your host body is alive, or for 24 hours after it dies, you can use a main action to move to a dead humanoid within 10 squares of the body and use it as your new host body, provided the body belongs a playable ancestry. When you do so, your original host body dies if it was alive. Your new host body gains all your statistics except f size, ancestry traits, and other statistics related to your former host body’s ancestry, which you instead gain from your new host body. When you inhabit a new host body, you start with 1 Stamina and can immediately spend a Recovery.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-hostBody-d',
				name: 'Host Body Drawback',
				description: 'You have a bane on tests made to read a humanoid creature’s emotions or body language.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-hostBody-mods',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static hunted: Complication = {
		id: 'comp-hunted',
		name: 'Hunted',
		description: 'You’re one step ahead of a pursuer - perhaps a bounty hunter determined to bring you to justice, a revenant, or an assassin intent on your death. Someday, you’ll be strong enough to face your pursuer head to head. Bbut for now, you live your life on the run.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-hunted-skill',
				listOptions: [ SkillList.Intrigue ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-hunted-b',
				name: 'Hunted Benefit',
				description: 'When one or more creatures are pursuing you, you can lay low as a respite activity. When you do so, anyone pursuing you loses track of your party’s location and must start their search again.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-hunted-d',
				name: 'Hunted Drawback',
				description: 'Each time you gain Renown, your pursuer learns your location.  Unless you lay low or move to a new location, you’ll be visited by agents of the pursuer within 1d10 days. If you linger after that, your pursuer finds you.'
			})
		]
	};

	static hunter: Complication = {
		id: 'comp-hunter',
		name: 'Hunter',
		description: 'You’re hunting someone or something - perhaps a wanted criminal or someone who wronged you, or perhaps a dangerous monster or beast. You won’t rest until you face off against your quarry!',
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
		description: 'A deal you made went south, or you got involved with the wrong people. Now you owe a debt or a ransom that would bankrupt a minor noble. To pay it off, you’ll need to take some dangerous risks.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-indebted-b',
				name: 'Indebted Benefit',
				description: 'You’re good with money - because you’ve had to be. Whenever you earn Wealth, you gain 1 more than usual.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-indebted-d',
				name: 'Indebted Drawback',
				description: 'Your starting Wealth is -5. While your Wealth is lower than 1, you can purchase items as if you had 1 Wealth, but you’re frequently visited by threatening creditors, and shopkeepers often lock their doors when they see you coming.'
			})
		]
	};

	static infernalContract: Complication = {
		id: 'comp-infernalContract',
		name: 'Infernal Contract',
		description: 'You made a deal (perhaps unknowingly) with an archdevil that has tied you to that fiend’s service. When you first learned of this deal, you were taken to the Seven Cities of Hell, where some of the timescape’s best minds taught you the ways of battle. The archdevil allows you to use these gifts as you will … until they require a favor from you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-infernalContract-b',
				name: 'Infernal Contract Benefit',
				description: 'Whenever you are present for a battle in which both sides have creatures who aren’t surprised, your side determines who goes first if the d10 roll is a 4 or higher.'
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
		description: 'You made a deal with a devil. Not a very good deal, because it wasn’t a very good devil. It’s too late for regrets, thought, because your soul is forfeit unless you find a loophole or convince the devil to void the deal.',
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
				description: 'Your body bears a fiendish mark. Anyone who understands religion notes the mark can tell that your soul belongs to Hell, imposing a bane on tests made to interact with those creatures (unless they’re into that). Additionally, when you die, your soul goes to Hell and you can’t be restored to life.'
			})
		]
	};

	static ivoryTower: Complication = {
		id: 'comp-ivoryTower',
		name: 'Ivory Tower',
		description: 'You studied in an academy or other educational institution. Your training was thorough and your reading list was wide-ranging.  But when you left school, you discovered that there were serious gaps in your education. Maybe some of those books were a little out of date.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-ivoryTower-skills',
				listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ],
				count: 3
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'comp-ivoryTower-lang',
				options: [ LanguageType.Dead ],
				description: 'You know one dead language of your choice.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-ivoryTower-d',
				name: 'Ivory Tower Drawback',
				description: 'The Director chooses one of the skills you learned from this complication. You lose that skill and can’t ever learn it again. Additionall, you take a bane on any test to which that skill would apply.'
			})
		]
	};

	static lifebonded: Complication = {
		id: 'comp-lifebonded',
		name: 'Lifebonded',
		description: 'In a sinister ritual, your soul has been bound to that of another creature. This might be a companion, a creature you are beholden to, or an enemy. When they die, you die — making you the perfect bodyguard.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-lifebonded-b',
				name: 'Lifebonded Benefit',
				description: 'Choose another creature who doesn’t have the Lifebonded complication. When you die, your body disappears until that creature finishes a respite or earns 2 or more Victories. You then appear next to the creature, fully healed.'
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
		description: 'You were caught in a storm and stuck by lightning - but somthing saved you from death. Perhaps it was a gods-given miracle, a latent psionic gift, or the magic of a helpful elementalist, but you absorbed the lightning into your body. It’s always there now, simmering under the surface.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-lightningSoul-b',
				name: 'Lightning Soul Benefit',
				description: 'When you regain Stamina in combat, you gain 1 surge. Whenever you spend a surge to deal extra damage, you can make that extra damage into lightning damage.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-lightningSoul-d',
				name: 'Lightning Soul Drawback',
				description: 'Whenever you are wet, you have damage weakness 5.'
			})
		]
	};

	static loner: Complication = {
		id: 'comp-loner',
		name: 'Loner',
		description: 'You’ve always been a lone wolf. With no one else to lean on, you’ve picked up a million survival tricks. Which made it all the more surprising when you joined your current adventuring group and found the family you’d never known you needed.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-loner-b',
				name: 'Loner Benefit',
				description: 'When you finish a respite, choose a skill you don’t have. You have that skill until the end of your next respite.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-loner-d',
				name: 'Loner Drawback',
				description: 'Now that you finally have people who care about you, you won’t let anyone take them away! Whenever a creature reduces one of your allies to 0 Stamina, you are taunted by the creature until your ally’s Stamina is higher than 0, another creature makes you taunted, or the end of the encounter.'
			})
		]
	};

	static lostInTime: Complication = {
		id: 'comp-lostInTime',
		name: 'Lost in Time',
		description: 'In a long-ago age, a cataclysm overtook your city. You weren’t killed, but some arcane accident caused you to be suspended in time until now. Alone, you must navigate the world around you with a head full of outdated memories - and a few ancient secrets — and a few ancient secrets.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-lostInTime-b',
				name: 'Lost in Time Benefit',
				description: 'Choose a damage type from acid, cold, corruption, fire, holy, lightning, poison, psychic, or sonic. Whenever you use a signature ability, you can have it deal your chosen damage type instead of it’s normal damage.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-lostInTime-d',
				name: 'Lost in Time Drawback',
				description: 'You automatically fail any test made to recall information from the period during which you were suspended in time.'
			})
		]
	};

	static lostYourHead: Complication = {
		id: 'comp-lostYourHead',
		name: 'Lost Your Head',
		description: 'A bredbeddle stole your head! Usually, being beheaded by one of those magical giants is fatal, but your latent psionic ability allows you to survive despite your decapitation.',
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
					sections: [
						FactoryLogic.createAbilitySectionText('You can see, hear, and smell as if you were in the target’s space. Additionally, you can borrow their mouth to speak when you wish to do so, speaking in your own voice. This effect ends when you use Share Head on a different target, when the target moves more than 10 squares away from you, or when the creature is no longer willing to share their head with you.')
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-lostYourHead-d',
				name: 'Lost Your Head Drawback',
				description: 'Having no head, you can’t see, hear, smell, taste, or verbalize except by using the Share Head ability. Additionally, you can’t wear gear that requires a head, such as a helmet or hat.'
			})
		]
	};

	static lucky: Complication = {
		id: 'comp-lucky',
		name: 'Lucky',
		description: 'You’ve always had a lucky streak. When you leave things in the hands of fate, you succeed more than you fail. But luck is fickle - when you don’t trust it, it deserts you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-lucky-b',
				name: 'Lucky Benefit',
				description: 'When you spend a hero token to succeed on a saving throw or reroll a test, roll a d10. On a 6 or higher, you gain the benefit but don’t spend the hero token.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-lucky-d',
				name: 'Lucky Drawback',
				description: 'Whenever you obtain a tier 1 result on a test and don’t spend a hero token to reroll, you take a bane on the next test you make.'
			})
		]
	};

	static masterChef: Complication = {
		id: 'comp-masterChef',
		name: 'Master Chef',
		description: 'Before you were a hero, you were a chef - and when you retire, you have big plans for your next restaurant or inn. In the meantime, you’re on the lookout for rare ingredients that only a wandering adventurer can find. After all, it’s food that makes the world go round.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-masterChef-skill',
				listOptions: [ SkillList.Crafting ],
				selected: [ 'Cooking' ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-masterChef-b',
				name: 'Master Chef Benefit',
				description: 'When you finish a respite or wake up after a night’s sleep, you can spend 1 uninterrupted hour to prepare an excellent meal for up to 10 creatures, provided you have ingredients and cooking tools. Once over the next 24 hours, each creature who eats the meal can gain the benefit of spending a Recovery without spending a Recovery.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-masterChef-d',
				name: 'Master Chef Drawback',
				description: 'The first time each day that you are forced to eat food you didn’t prepare, you lose 2 Recoveries.'
			})
		]
	};

	static meddlingButler: Complication = {
		id: 'comp-meddlingButler',
		name: 'Meddling Butler',
		description: 'You’re not sure what you did to deserve it, but for some reason your family saddled you with an old, trusted, and extremely irritating family servant. They’re supremely competent, of course, but they sometimes seem to forget who’s in charge.',
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
		description: 'You can perceive ghosts and spirits that others sense. These supernatural entities constantly whisper unsettling secrets in your mind - when they’re not trying to kill you.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-medium-b',
				name: 'Medium Benefit and Drawback',
				description: 'Incorporeal undead within 10 squares of you can communicate telepathically with you.  Additionally, you have the Contact Spirits ability.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-medium-b-ability',
					name: 'Contact Spirits',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Intuition, Characteristic.Presence ],
								tier1: 'You take corruption damage equal to 5 + your level.',
								tier2: 'The spirit of anyone you know of who has died speaks to you, provided they are on the same world as you. You learn how they died and can ask them one question, which they can answer truthfully or untruthfully. The spirit knows everything they knew in life, and is aware of events that took place in their immediate surroundings since their death',
								tier3: 'As tier 2, but you can ask 3 questions.'
							})
						),
						FactoryLogic.createAbilitySectionText('If any sapient creatures have died nearby within the last 24 hours, you have a double bane on the power roll for this ability if any of those creatures were hostile to you, or a double edge if any of them were friendly to you. When you use this ability, you can’t do so again until you earn 1 or more Victories.')
					]
				})
			})
		]
	};

	static medusaBlood: Complication = {
		id: 'comp-medusaBlood',
		name: 'Medusa Blood',
		description: 'Your mother and father never saw eye to eye. You know this because your father is still alive and your mother is a medusa. This made your childhood difficult, and now it’s making your adulthood complicated as well.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-medusaBlood-b',
					name: 'Stone Eyes',
					description: 'These looks don’t kill - they petrify.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Presence ],
								tier1: '2 damage; M < [weak] slowed (save ends)',
								tier2: '4 damage; M < [average] slowed (save ends)',
								tier3: '6 damage; M < [strong] slowed (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('This ability has no effect on a creature who can’t see you or who purposely avoids looking at your eyes. A creature reduced to 0 Stamina by this ability is turned to inanimate stone.')
					]
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
		description: 'Your appearance marks you as part of a group that is universally feared. You might be a gentle soul, but you’re not often given a chance to prove it. It’s no wonder that you usually wear a hood.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-misunderstood-b',
				name: 'Misunderstood',
				description: 'When you reveal your appearance to creatures who don’t know you personally, you gain an edge on tests where the Brag or Intimidate skill could be applied, but you take a bane on tests where the Flirt, Lead, or Persuade skills could be applied.'
			})
		]
	};

	static mundane: Complication = {
		id: 'comp-mundane',
		name: 'Mundane',
		description: 'You’re hopelessly nonmagical. When you try to use magical abilities, or even when they’re used on you, they never work right. Even magical devices seem to fizzle in your presence.',
		features: [
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-mundane-b',
				modifiers: [
					FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 1 }),
					FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Holy, modifierType: DamageModifierType.Immunity, value: 1 }),
					FactoryLogic.damageModifier.createPerLevel({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 1 })
				]
			}),
			FactoryLogic.feature.create({
				id: 'comp-mundane-d',
				name: 'Mundane Drawback',
				description: 'While you are carry more than three magic treasures, you take a bane on power rolls.'
			})
		]
	};

	static outlaw: Complication = {
		id: 'comp-outlaw',
		name: 'Outlaw',
		description: 'You might be a common bandit or an idealistic freedom fighter, but in either case, the authorities don’t approve of your actions. You’ve managed to stay one step ahead of the law so far, but until your name is cleared, you’ve got to keep a low profile.',
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
		description: 'You have a piratical past (and maybe a piratical present and future as well). Though you’re not well-known ashore, other pirates have a way of recognizing their own.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-pirate-b',
				name: 'Pirate Benefit',
				description: 'When interacting with pirates or pirate hunters, you treat your Renown as 2 higher than usual. Additionally, you hold a piece of a pirate map, with a handful of other pirates in different locations holding the other pieces. With all the pieces, you’d know the location of a fabulous pirate treasure.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-pirate-d',
				name: 'Pirate Drawback',
				description: 'The pirates holding the other pieces of the map would very much like to get their hands on your piece, and have no qualms about killing you to get it. Furthermore, the pirate treasure is said to be cursed or haunted.'
			})
		]
	};

	static preacher: Complication = {
		id: 'comp-preacher',
		name: 'Preacher',
		description: 'When you were young, you almost died in an accident or attack, but a vision of a god or saint showed you the way to save yourself and others you loved. That event drove you into the church and gave you a strong belief in a particular religion or cause — and you can’t wait to tell other people all about it.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-preacher-b',
				name: 'Preacher Benefit',
				description: 'As a respite activity, you can attempt to convert members of a community to your cause. Make a Presence test with a difficulty determined by the Director based on the community’s receptiveness to your ideas. On a success, you convert one NPC into a follower, which you gain in addition to any followers you acquire through Renown or other means. The Director determines the type of follower. Once you have converted an NPC into a follower in this way, you can’t try again until you gain a level.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-preacher-d',
				name: 'Preacher Drawback',
				description: 'If you fail in your conversion attempt, one of your existing followers of the Director’s choice (whether gained through this feature or your Renown or other means) leaves you, their faith in you shaken. If you have no followers, your Renown is decreased by 1. If you need to reduce your Renown and it’s already 0, you gain no benefits from the respite during which you make the conversion attempt.'
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
					FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 5 }),
					FactoryLogic.damageModifier.create({ damageType: DamageType.Corruption, modifierType: DamageModifierType.Immunity, value: 5 })
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
		description: 'You were captured by the psionic beings known as voiceless talkers. You escaped them, but you can’t escape a feeling that’s lingered since then in the back of your mind - the feeling of being watched.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-prisonerOfTheSynlirii-b',
				name: 'Prisoner of the Synlirii Benefit',
				description: 'You can telepathically communicate with creatures within 10 squares of you if they share a language with you and you know of each other. TA creature you communicate with this way can respond telepathically if they choose.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-prisonerOfTheSynlirii-d',
				name: 'Prisoner of the Synlirii Drawback',
				description: 'Any voiceless talkers within 1 mile know your location, and can overhear and understand your telepathic conversations.'
			})
		]
	};

	static promisingApprentice: Complication = {
		id: 'comp-promisingApprentice',
		name: 'Promising Apprentice',
		description: 'You were apprenticed to learn a crafting trade. Your mentor said you had a special gift and might well become a master of your craft someday. But before your training was complete, your mentor was killed.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-promisingApprentice-skill',
				listOptions: [ SkillList.Crafting ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-promisingApprentice-b',
				name: 'Promising Apprentice Benefit',
				description: 'Choose one of your skills from the crafting skill group. You gain an edge on any test that uses that skill.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-promisingApprentice-d',
				name: 'Promising Apprentice Drawback',
				description: 'Whoever killed your mentor cursed you. You take a bane on any test that doesn’t use one of your skills.'
			})
		]
	};

	static psychicEruption: Complication = {
		id: 'comp-psychicEruption',
		name: 'Psychic Eruption',
		description: 'In times of stress, you get headaches. Psionic energy builds up in your mind until you feel as though your head might explode. And if you’re not careful, it actually does explode, radiating psychic waves that harm friends and enemies alike.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-psychicEruption-b',
					name: 'Psychic Blast',
					description: 'Psionic energy bursts from your body in an iridescent shimmer.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
					target: 'Each creature in the area',
					sections: [
						FactoryLogic.createAbilitySectionText('Using this ability costs all your Heroic Resources.'),
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '1 psychic damage for each heroic resources you spend, to a maximum equal your level',
								tier2: '1 psychic damage for each heroic resource you spend, to a maximum equal to your level + your highest characteristic',
								tier3: '1 psychic damage for each heroic resource you spend'
							})
						)
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-psychicEruption-d',
				name: 'Psychic Eruption Drawback',
				description: 'Whenever you become bleeding, frightened, or weakened condition, you must use Psychic Blast as a free triggered action.'
			})
		]
	};

	static raisedByBeasts: Complication = {
		id: 'comp-raisedByBeasts',
		name: 'Raised by Beasts',
		description: 'You were orphaned or lost in the wild, and a friendly animal pack (perhaps apes, bears, or wolves) took you in. Returning to so-called civilization was a shock, but you’re now determined to learn all you can about your own kind.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-raisedByBeasts-skill',
				listOptions: [ SkillList.Interpersonal ],
				selected: [ 'Handle Animals' ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-raisedByBeasts-b',
				name: 'Raised by Beasts Benefit',
				description: 'Choose an animal type related to the animals who helped you, such as wolf. You gain an edge on tests that use the Handle Animals skill when interacting with animals of this type. You can also communicate with animals of this type as if you shared a language, and animals of this type aren’t initially hostile to you unless they’re supernaturally compelled to be.'
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
				description: 'When your family fled your homeland, they left their most values asset behind. Work with the Director to determine whether this asset is a trinket or leveled treasure, several points of Wealth, the project source to create a treasure, or the like. This asset is in the hands of the invaders but can be won back as the Director determines.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-refugee-d',
				name: 'Refugee Drawback',
				description: 'The faction that invaded your homeland wants you captured or dead. Any of their agents or sympathizers attempt to harm you if they recognize you, as the Director determines.'
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
				description: 'Choose one of your skills. That skill grants a +3 bonus to tests instead of +2.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-rival-d',
				name: 'Rival Drawback',
				description: 'Your rival has similar statistics to yours, but always had one skill they excelled at, as determined by the Director. Intimidated by their prowess, you take a bane on tests using that skill.'
			})
		]
	};

	static rogueTalent: Complication = {
		id: 'comp-rogueTalent',
		name: 'Rogue Talent',
		description: 'You are the only survivor of a cataclysmic psionic event - an experiment gone wrong, a voiceless talker attack, or some naturally occurring phenomenon of a far-off part of the timescape. It left you with a psionic talent, but also made you vulnerable to telepathic attacks.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-rogueTalent-b',
					name: 'Telekinetic Grasp',
					description: 'You reach out with your mind to move a creature or object.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature or object',
					sections: [
						FactoryLogic.createAbilitySectionText('Note: you can use this ability as a ranged free strike.'),
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Intuition, Characteristic.Presence ],
								tier1: 'Push or pull 1',
								tier2: 'Push or pull 2',
								tier3: 'Push or pull 3'
							})
						)
					]
				})
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-rogueTalent-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Weakness, value: 5 })
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
				description: 'Members of your extended family is looking for you, intending to drag you home - and you’ve never been able to stand up to them.'
			})
		]
	};

	static searchingForACure: Complication = {
		id: 'comp-searchingForACure',
		name: 'Searching for a Cure',
		description: 'Your homeland has been corrupted by some terrible curse or plague, and you’re the only one who escaped it. The members of your family still exist, but in changed forms - perhaps as vampire spawn, zombies, or living statues. People tell you the situation is hopeless, but you’re determined to find a cure that can undo your loved ones’ suffering.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-searchingForACure-b',
				name: 'Searching for a Cure Benefit',
				description: 'Choose a type of monster connected to your homeland’s plight, such as a vampire, ghost, or medusa. You have a +1 bonus to saving throws related to that monster’s abilities, and you treat your characteristic scores as 1 higher than usual for the purpose of resisting potencies related to those abilities'
			}),
			FactoryLogic.feature.create({
				id: 'comp-searchingForACure-d',
				name: 'Searching for a Cure Drawback',
				description: 'You have started to succumb to the curse or plague, and will suffer the fate of your family if you don’t find a cure soon. Work with the Director to determine the timeline of your transformation, which should be something that could happen during the campaign!'
			})
		]
	};

	static secretIdentity: Complication = {
		id: 'comp-secretIdentity',
		name: 'Secret Identity',
		description: 'You’re secretly very important - but it’s not safe for your true identity to be known. Perhaps you’re the witness to a crime or a royal family on the run from a usurper. Until you are no longer at risk of being hunted, you’ll maintain the guise of an ordinary adventurer.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-secretIdentity-skill',
				listOptions: [ SkillList.Intrigue ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-secretIdentity-b',
				name: 'Secret Identity Benefit',
				description: 'You can resume your true identity temporarily. While in your true identity, your Renown and Wealth are treated as 2 higher than usual, and you might gain other benefits in consultation with the Director.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-secretIdentity-d',
				name: 'Secret Identity Drawback',
				description: 'Each time you resume your true identity while you are still hunted, you have a 20 percent cumulative chance each day that your enemies will find you. This chance resets if you resume your secret identity for 1 day.'
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
				description: 'You have a 1st-echelon trinket of your choice. This was a signature treasure of your twin, and has their name or sigil written, sewn, or emblazoned on it somewhere.',
				types: [ ItemType.Trinket ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-secretTwin-d',
				name: 'Secret Twin Drawback',
				description: 'Your twin disappeared because someone wanted them dead. Whenever you finish a respite, roll a d10. On a 1 or 2, the Director can decide that your past catches up with you in the near future in some way—an assassin seeking your twin, someone who knows your real identity and threatens to reveal it, and so forth.'
			})
		]
	};

	static selfTaught: Complication = {
		id: 'comp-selfTaught',
		name: 'Self Taught',
		description: 'While your peers were learning their trades in fancy schools, you whoned your capabilities on the mean streets with nothing but your own instinct as a guide. What you lost in polish and tactical acumen, you now make up for in raw power.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-selfTaught-b',
				name: 'Self Taught',
				description: 'At the start of each of your turns during combat, you can forgo gaining your Heroic Resource until the start of your next turn. If you do, your strikes gain a damage bonus equal to your highest characteristic score until the start of your next turn.'
			})
		]
	};

	static sewerFolk: Complication = {
		id: 'comp-sewerFolk',
		name: 'Sewer Folk',
		description: 'Impoverished or on the run, you spent formative years living in the sewers of a major city. There, you learned lessons that have served you well, although the miasma of the sewers did permanent damage to your health.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-sewerFolk-b',
				name: 'Sewer Folk Benefit',
				description: 'You can automatically climb or swim (your choice) at full speed while moving, and you never get lost while underground. Additionally, while in a city with sewers, you and your companions can move from place to place without being detected, as the Director determines.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-sewerFolk-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Weakness, value: 5 })
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
				description: 'Whenever you start your turn with concealment, you gain 1 surge.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-shadowBorn-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Holy, modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static sharedSpirit: Complication = {
		id: 'comp-sharedSpirit',
		name: 'Shared Spirit',
		description: 'A supernatural spirit shares your body, with each of you controlling your body by turn. You and the spirit share the same short-term goals and work equally well with your companions, though you might have different personalities, mannerisms, and long-term goals.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-sharedSpirit-b',
				name: 'Shared Spirit',
				description: 'At the start of each day, roll 1d6. On a 1-4, you control your body. On a 5-6, the spirit does. Alternatively, if you and the spirit are on good terms, you can choose each day who is in control. CYou can use those skills only while you are in control of your body. Then choose three new skills, which you have and can use only while your spirit is in control.'
			})
		]
	};

	static shatteredLegacy: Complication = {
		id: 'comp-shatteredLegacy',
		name: 'Shattered Legacy',
		description: 'You’re the heir to a powerful supernatural treasure that has been in your family for generations. One problem, though: the treasure is broken. Some ancestor of yours sundered it while saving the world. Or maybe they tripped and smashed it on a rock. Either way, it’s your job to fix it.',
		features: [
			FactoryLogic.feature.createLanguageChoice({
				id: 'comp-shatteredLegacy-lang'
			}),
			FactoryLogic.feature.createItemChoice({
				id: 'comp-shatteredLegacy-b',
				name: 'Shattered Legacy Benefit',
				description: 'You gain one leveled treasure of your choice.',
				types: [ ItemType.LeveledArmor, ItemType.LeveledImplement, ItemType.LeveledWeapon, ItemType.Leveled ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-shatteredLegacy-d',
				name: 'Shattered Legacy Drawback',
				description: 'The chosen leveled treasure is broken and completely inoperative. Repairing the treasure requires that you complete the Craft Treasure project for it. The project goal is half of what it would cost to create such an item, and you already have the project source you need. You must seek out any item prerequisite.'
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
				description: 'You have forgotten one language you know of your choice.'
			})
		]
	};

	static siblingsShield: Complication = {
		id: 'comp-siblingsShield',
		name: 'Sibling\'s Shield',
		description: 'You were tasked with delivering a ceremonial shield to your older sibling, a celebrated warrior, for their years of service. When you arrived at their homestead, you found them dead on their doorstep with their own sword lodged in their back. To find out who did this to them — and why — you decided to step into their shoes. It will take a while to match up to your sibling’s legacy, though.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-siblingsShield-b',
				name: 'Sibling\'s Shield Benefit',
				description: 'While you wear your sibling’s shield on your back, you can’t be flanked.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-siblingsShield-d',
				name: 'Sibling\'s Shield Drawback',
				description: 'Visions of your dead sibling haunt you at night. Whenever you take a respite, make an Intuition test that can’t make use of any skill. On a tier 1 or tier 2 outcome, you gain 1 fewer Recoveries than usual when you finish the respite.'
			})
		]
	};

	static silentSentinel: Complication = {
		id: 'comp-silentSentinel',
		name: 'Silent Sentinel',
		description: 'You were trained by a group of spies, who psionically infused silence into your every step and enhanced your ability to hear distant whispers. But your enhanced hearing has some nasty side effects.',
		features: [
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-silentSentinel-skill1',
				listOptions: [ SkillList.Intrigue ],
				count: 2,
				selected: [ 'Eavesdrop', 'Sneak' ]
			}),
			FactoryLogic.feature.createSkillChoice({
				id: 'comp-silentSentinel-skill3',
				listOptions: [ SkillList.Lore ]
			}),
			FactoryLogic.feature.create({
				id: 'comp-silentSentinel-b',
				name: 'Silent Sentinel Benefit',
				description: 'You can telepathically communicate with any creature provided they share a language with you and you can observe each other. A creature you communicate with this way can respond telepathically if they choose.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-silentSentinel-d',
				name: 'Silent Sentinel Drawback',
				description: 'Whenever you take sonic damage, you are dazed until the end of your next turn.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-silentSentinel-mod',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Sonic, modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static slightCaseOfLycanthropy: Complication = {
		id: 'comp-slightCaseOfLycanthropy',
		name: 'Slight Case of Lycanthropy',
		description: `
Maybe you were bitten as a child, or maybe it’s a family curse. Either way, you have a malady that is best not discussed in public, lest the torches and pitchforks make an appearance.

Note: Stormwight furies can’t take this complication.`,
		features: [
			FactoryLogic.feature.create({
				id: 'comp-slightCaseOfLycanthropy-b',
				name: 'Slight Case of Lycanthropy Benefit',
				description: 'Whenever you make a non-minion creature winded or kill a non-minion creature, you gain 1 surge.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-slightCaseOfLycanthropy-d',
				name: 'Slight Case of Lycanthropy Drawback',
				description: 'At the start of each of your turns, if you have five or more surges — or one or more surges while in moonlight — you lose all your surges and become a wolfish hybrid until the end of your turn. While in that form, you have your usual statistics, but you must make a melee free strike against the nearest creature if you can. You can shift up to your speed toward that creature if necessary. If allies and enemies are equally near, you target an ally.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-slightCaseOfLycanthropy-s',
				name: 'Special',
				description: 'You can’t take this complication if you are a fury with the stormwight primordial aspect.'
			})
		]
	};

	static stolenFace: Complication = {
		id: 'comp-stolenFace',
		name: 'Stolen Face',
		description: 'An evil fairy cursed you, leaving you with a blank visage instead of a face. Although you’re able to imitate other peoples’ features, you’d like to have your own back.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-stolenFace-b',
				name: 'Stolen Face Benefit',
				description: 'You can spend 5 uninterrupted minutes to rearrange your face to resemble the face of another creature of your ancestry who you’ve observed before. You have a double edge on tests made to impersonate that creature or to disguise your identity. You are unable to change your hair or other non-facial features.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-stolenFace-d',
				name: 'Stolen Face Drawback',
				description: 'Whenever you take damage, your face becomes blank, with no eyes, nose, mouth, or ears. This doesn’t affect your senses or your ability to speak. Your face doesn’t return until you use the benefit of this complication to restore it.'
			})
		]
	};

	static strangeInheritance: Complication = {
		id: 'comp-strangeInheritance',
		name: 'Strange Inheritance',
		description: 'Your siblings each inherited money or land, but you received a strange, seemingly useless trinket — along with the advice that maybe you weren’t cut out for an ordinary, peaceful life.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-strangeInheritance-b',
				name: 'Strange Inheritance Benefit',
				description: 'You gain a somewhat inoperative 2nd echelon trinket of the Director’s choice. This trinket functions only while the total of your level plus your Victories is 5 or higher. You don’t learn what the trinket’s powers are until the first time it becomes operative.'
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
		description: 'You were trained as an officer, but you no longer serve. Whether you fled from a battle, were dishonorably discharged, or defected from an evil army, you make your own way in the world now — though your military training will never truly leave you.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-strippedOfRank-b',
					name: 'Issue Order',
					description: '“Move or die, folks.”',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One ally',
					sections: [
						FactoryLogic.createAbilitySectionText(`
The target can use a triggered action to take a main action, a move action, or a maneuver.

Note: If you have the Strike Now tactician ability, the target can use a free triggered action instead of a triggered action to gain the benefit of this ability.`)
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-strippedOfRank-d',
				name: 'Stripped of Rank Drawback',
				description: 'Rather than attracting followers at 3, 6, 9, and 12 Renown, you can attract followers only when your Renown reaches 4, 8, 12, and 16.'
			})
		]
	};

	static thrillSeeker: Complication = {
		id: 'comp-thrillSeeker',
		name: 'Thrill Seeker',
		description: 'You live for danger. Whether in battle or mundane peril, you can transcend your usual limits—and once you’ve tasted that excitement, you want more.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-thrillSeeker-b',
				name: 'Thrill Seeker Benefit',
				description: 'Each time your party reaches 2, 4, and 6 Victories, you earn the party a hero token.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-thrillSeeker-d',
				name: 'Thrill Seeker Drawback',
				description: 'At the start of a new game session, the party doesn’t earn a hero token for your character.'
			})
		]
	};

	static vampireSire: Complication = {
		id: 'comp-vampireSire',
		name: 'Vampire Sire',
		description: 'A vampire has bitten you. You’re not undead - or not yet, anyway - but your connection with your vampire progenitor fills you with urges you fight to control.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-vampireSire-b',
				name: 'Vampire Sire Benefit',
				description: 'Whenever you make a melee free strike against an adjacent creature, you can do so by biting the creature. If you obtain a tier 3 outcome on the free strike, you gain temporary Stamina equal to the damage dealt. If not lost beforehand, this temporary Stamina lasts until the end of your next respite.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-vampireSire-d',
				name: 'Vampire Sire Drawback',
				description: 'While you have temporary Stamina from this complication, you grow visible fangs, you take a bane on Presence tests made to interact with humanoids, and your vampire progenitor can sense your location.'
			})
		]
	};

	static hearsVoices: Complication = {
		id: 'comp-hearsVoices',
		name: 'Voice in your Head',
		description: 'You occasionally hear a voice in your head, giving you orders or offering advice. You don’t know who the voice is or why it comes to you, but when you’ve followed the advice, it’s usually proved to be sound',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-hearsVoices-b',
				name: 'Hears Voices Benefit',
				description: 'The Director tells you when you hear the voice. The voice seems to be aware of your surroundings, and its advice is usually vague but helpful. Someday its motivations might be different from your own, but for now it seems keen on making sure that you survive.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-hearsVoices-d',
				name: 'Hears Voices Drawback',
				description: 'Eventually, the voice may reveal that it wants something from you that you may not want to provide. If the voice is displeased with you, it can interrupt your rest during a respite, causing you to regain 2 fewer Recoveries than normal.'
			})
		]
	};

	static vowOfDuty: Complication = {
		id: 'comp-vowOfDuty',
		name: 'Vow of Duty',
		description: 'You have sworn an oath to an organization. The organization is your rock, and as long as your faith in it remains unshaken, you are immovable.',
		features: [
			FactoryLogic.feature.createBonus({
				id: 'comp-vowOfDuty-b',
				field: FeatureField.Stability,
				value: 1
			}),
			FactoryLogic.feature.create({
				id: 'comp-vowOfDuty-d',
				name: 'Vow of Duty Drawback',
				description: 'If you are forced to disobey your organization’s orders, your stability becomes 0 until your doubts are resolved or you find a new organization to pledge yourself to.'
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
				description: 'If a creature is of a lower level than you, you automatically know when they are lying, though you don’t necessarily know the actual truth behind their lie. Additionally, you have a double edge on any test made to persuade a creature of some specific fact.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-vowOfHonesty-d',
				name: 'Vow of Honesty Drawback',
				description: 'When you lie, your honor is stained and you lose this complication’s benefit. Additionally, you take a bane on any test that uses a skill from the interpersonal skill group. You can lose the bane and regain this complication’s benefit only by doing penance, such as gaining the forgiveness of the creature you lied to.'
			})
		]
	};

	static wakingDreams: Complication = {
		id: 'comp-waking-dreams',
		name: 'Waking Dreams',
		description: 'You broke a magic amulet that immersed your mind in weird magic. This magic has given you the power of premonition. However, you struggle to control this new gift.  Whenever you take a respite, make a Reason test.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-waking-dreams-ability',
					name: 'Waking Dreams',
					description: '',
					type: FactoryLogic.type.createNoAction(),
					keywords: [ ],
					distance: [ ],
					target: 'Self',
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Reason ],
								tier1: 'You receive a painful vision that is fractal and inscrutable. When you finish the respite, you lose 1 Recovery.',
								tier2: 'You experience a vision of an event currently happening in your world. The vision lasts for only a few seconds, but the information you glean is helpful to you.',
								tier3: 'The vision from lasts 1 minute or more.'
							})
						)
					]
				})
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
				description: 'Even if you are a war dog yourself, other war dogs can’t use their Posthumous Promotion ability on you while you wear your collar.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-warDogCollar-ability',
					name: 'Posthumous Retirement',
					description: 'You make your modified collar explode.',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
					target: 'Each enemy in the area',
					sections: [
						FactoryLogic.createAbilitySectionText('Your loyalty collar detonates, dealing fire damage equal to 5 plus your level to each target. Once you have used this ability, you can’t use it again until you spend 1 minute out of combat resetting the collar')
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-warDogCollar-d',
				name: 'War Dog Collar Drawback',
				description: 'Each time you use your Posthumous Retirement ability, the Director can spend 3 Malice to make your collar malfunction and deal its damage to you in addition to the usual targets.'
			})
		]
	};

	static warOfAssassins: Complication = {
		id: 'comp-war-of-assassins',
		name: 'War Of Assassins',
		description: 'Being in the wrong place at the wrong time saw you caught in the middle of a conflict between two warring assassins’ guilds. Whether by choice or by accident, you wound up helping one faction at the expense of the other.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-war-of-assassins-b',
				name: 'War Of Assassins Benefit',
				description: 'Having gained the favor of the faction who you helped, you can call on its members three times for favors. If a favor is reasonable and within the faction’s power to grant, its members do it, no questions asked.'
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
				description: 'Your royal ward can be a burden. When you take a respite, roll a d10. On a 1, your ward contacts you and requires your help during the respite, requiring you to spend your time helping them instead of undertaking a respite activity.'
			})
		]
	};

	static waterborn: Complication = {
		id: 'comp-waterborn',
		name: 'Waterborn',
		description: 'You nearly lost your life at sea, but then you heard the voice. Someone - or something - in the water called out to you, telling you to swim. The ocean was suddenly no longer your doom but your parent, granting you a fragment of its power. But for what purpose, you can’t be sure',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-waterborn-b',
				name: 'Waterborn Benefit',
				description: 'You can automatically swim at full speed while moving, and you can breathe underwater.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'comp-waterborn-ability',
					name: 'Rogue Wave',
					description: 'You summon a wave of water to batter your foe.',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature or object',
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '2 damage; push or pull 1',
								tier2: '5 damage; push or pull 2',
								tier3: '7 damage; push or pull 3'
							})
						),
						FactoryLogic.createAbilitySectionText('You can forgo dealing damage with this ability.')
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'comp-waterborn-d',
				name: 'Waterborn Drawback',
				description: 'The ocean or a creature it sends to seek you can assign you a quest. If you don’t do the ocean’s bidding, it might temporarily deny you this complication’s benefits — including being able to breathe underwater — at an inconvenient time.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-waterborn-mod',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Lightning, modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static wodewalker: Complication = {
		id: 'comp-wodewalker',
		name: 'Wodewalker',
		description: 'You were dying in the wode, collapsing while starving and wounded. When you woke, you discovered that a group of green elementalists had saved your life by infusing the regenerative bark of a tree to your body.',
		features: [
			FactoryLogic.feature.createBonus({
				id: 'comp-wodewalker-b',
				field: FeatureField.RecoveryValue,
				valueCharacteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'comp-wodewalker-d',
				modifiers: [
					FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Weakness, value: 5 })
				]
			})
		]
	};

	static wrathfulSpirit: Complication = {
		id: 'comp-wrathfulSpirit',
		name: 'Wrathful Spirit',
		description: 'You’re quick to anger, never letting an insult go without slinging one right back. In combat, you fight as if possessed by a literal spirit of wrath. No matter the tactical circumstances, when someone injures you, you feel compelled to answer blood with blood.',
		features: [
			FactoryLogic.feature.create({
				id: 'comp-wrathfulSpirit-b',
				name: 'Wrathful Spirit Benefit',
				description: 'While you are taunted by a creature, you gain an edge on strikes against that creature. Aditionally, you can spend 1 Heroic Resource to have a double edge instead.'
			}),
			FactoryLogic.feature.create({
				id: 'comp-wrathfulSpirit-d',
				name: 'Wrathful Spirit Drawback',
				description: 'In combat, whenever a creature makes a strike against you and you are not taunted, you are taunted by that creature until the end of your next turn. Additionally, whether in casual conversation or if you are involved in a negotiation, whenever a creature insults you, you must either spend a Recovery or be compelled to reply with an insult.'
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
				description: 'Your health suffered in prison. Whenever you are winded, you are stricken with a hacking cough that makes it impossible for you to hide or sneak.'
			})
		]
	};
}
