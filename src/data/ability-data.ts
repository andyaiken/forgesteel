import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { FactoryLogic } from '../logic/factory-logic';

export class AbilityData {
	//#region Free Strikes

	static freeStrikeMelee = FactoryLogic.createAbility({
		id: 'free-melee',
		name: 'Free Strike (melee)',
		description: '',
		type: FactoryLogic.type.createFreeStrike(),
		keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
		distance: [ FactoryLogic.distance.createMelee() ],
		target: '1 creature or object',
		powerRoll: FactoryLogic.createPowerRoll({
			characteristic: [ Characteristic.Might, Characteristic.Agility ],
			tier1: '2 + M or A damage',
			tier2: '5 + M or A damage',
			tier3: '7 + M or A damage'
		})
	});

	static freeStrikeRanged = FactoryLogic.createAbility({
		id: 'free-ranged',
		name: 'Free Strike (ranged)',
		description: '',
		type: FactoryLogic.type.createFreeStrike(),
		keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
		distance: [ FactoryLogic.distance.createRanged(5) ],
		target: '1 creature or object',
		powerRoll: FactoryLogic.createPowerRoll({
			characteristic: [ Characteristic.Might, Characteristic.Agility ],
			tier1: '2 + M or A damage',
			tier2: '4 + M or A damage',
			tier3: '6 + M or A damage'
		})
	});

	//#endregion

	//#region Moves

	static advance = FactoryLogic.createAbility({
		id: 'advance',
		name: 'Advance',
		description: '',
		type: FactoryLogic.type.createMove(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		effect: 'When you take the Advance move action, you can move a number of squares up to your speed. You can break up this movement granted with your maneuver and action however you wish.'
	});

	static disengage = FactoryLogic.createAbility({
		id: 'disengage',
		name: 'Disengage',
		description: '',
		type: FactoryLogic.type.createMove(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		effect: 'When you take the Disengage move action, you can shift 1 square. Some class features, kits, or other rules let you shift more than 1 square when you take this move action, if they do, you can break up the movement granted by this move action with your maneuver and action however you wish.'
	});

	static ride = FactoryLogic.createAbility({
		id: 'ride',
		name: 'Ride',
		description: '',
		type: FactoryLogic.type.createMove(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		effect: 'You can only take the Ride move action while mounted on another creature. When you take the Ride move action, you cause your mount to move up to their speed, taking you with them. Alternatively, you can use this move action to have your mount use the Disengage move action as a free triggered action. A mount can only be ridden with this move action once per round.'
	});

	//#endregion

	//#region Maneuvers

	static aidAttack = FactoryLogic.createAbility({
		id: 'aid-attack',
		name: 'Aid Attack',
		description: '',
		type: FactoryLogic.type.createManeuver(),
		keywords: [],
		distance: [ FactoryLogic.distance.createMelee() ],
		target: '1 enemy',
		effect: 'The next attack an ally makes against the target before the start of your next turn has an edge.'
	});

	static catchBreath = FactoryLogic.createAbility({
		id: 'catch-breath',
		name: 'Catch Breath',
		description: '',
		type: FactoryLogic.type.createManeuver(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		effect: `
By using the Catch Breath maneuver, you spend a Recovery and heal an amount equal to your recovery value.
If you are dying, you can’t take the Catch Breath maneuver, but other creatures can help you spend recoveries.`
	});

	static drinkPotion = FactoryLogic.createAbility({
		id: 'drink-potion',
		name: 'Drink Potion',
		description: '',
		type: FactoryLogic.type.createManeuver(),
		keywords: [],
		distance: [
			FactoryLogic.distance.createSelf(),
			FactoryLogic.distance.createMelee()
		],
		target: 'Self or 1 creature',
		effect: 'You can use this maneuver to drink a potion yourself or to administer a potion to an adjacent creature.'
	});

	static escapeGrab = FactoryLogic.createAbility({
		id: 'escape-grab',
		name: 'Escape Grab',
		description: '',
		type: FactoryLogic.type.createManeuver(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		preEffect: 'While you are grabbed by another creature, you can attempt to escape by making a resistance roll. You take a bane on the roll if the creature’s size is larger than yours.',
		powerRoll: FactoryLogic.createPowerRoll({
			characteristic: [ Characteristic.Might, Characteristic.Agility ],
			tier1: 'You fail to escape the grab.',
			tier2: 'You can escape the grab, but if you do, the creature grabbing you can make a melee free strike against you before you are no longer grabbed.',
			tier3: 'You are no longer grabbed.'
		})
	});

	static grab = FactoryLogic.createAbility({
		id: 'grab',
		name: 'Grab',
		description: '',
		type: FactoryLogic.type.createManeuver(),
		keywords: [ AbilityKeyword.Melee ],
		distance: [ FactoryLogic.distance.createMelee() ],
		target: '1 creature no more than 1 size larger than you',
		powerRoll: FactoryLogic.createPowerRoll({
			characteristic: [ Characteristic.Might ],
			tier1: 'No effect',
			tier2: 'You can grab the target, but if you do, they can make a melee free strike against you right before they become grabbed by you.',
			tier3: 'The target is grabbed by you.'
		}),
		effect: 'You gain an edge on the power roll if the creature’s size is smaller than yours. You can grab only one creature at a time this way.'
	});

	static hide = FactoryLogic.createAbility({
		id: 'hide',
		name: 'Hide',
		description: '',
		type: FactoryLogic.type.createManeuver(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		effect: 'You attempt to hide from other creatures who aren’t observing you while you have cover or concealment.'
	});

	static knockback = FactoryLogic.createAbility({
		id: 'knockback',
		name: 'Knockback',
		description: '',
		type: FactoryLogic.type.createManeuver(),
		keywords: [ AbilityKeyword.Melee ],
		distance: [ FactoryLogic.distance.createMelee() ],
		target: '1 creature no more than 1 size larger than you',
		powerRoll: FactoryLogic.createPowerRoll({
			characteristic: [ Characteristic.Might ],
			tier1: 'Push 1',
			tier2: 'Push 2',
			tier3: 'Push 3'
		}),
		effect: 'You gain an edge on the power roll if the creature’s size is smaller than yours.'
	});

	static makeAssistTest = FactoryLogic.createAbility({
		id: 'make-assist-test',
		name: 'Make Or Assist A Test',
		description: '',
		type: FactoryLogic.type.createManeuver(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		effect: `
Many tests are maneuvers if made in combat. Searching a chest with a Reason test, picking a door’s lock with an Agility test, or lifting a portcullis with a Might test would all be maneuvers. Assisting a test is also a maneuver in combat.
Complex or time-consuming tests might require an action if made in combat - or could take so long that they can’t be made during combat at all. Other tests that take no time at all, such as a Reason test to recall lore about mummies, are usually free maneuvers in combat. The Director has the final say regarding which tests can be made as maneuvers.`
	});

	static search = FactoryLogic.createAbility({
		id: 'search',
		name: 'Search',
		description: '',
		type: FactoryLogic.type.createManeuver(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		preEffect: 'You can use this maneuver to attempt to search for creatures hidden from you, as long as those creatures are within 10 squares of you and you have line of effect to them.',
		powerRoll: FactoryLogic.createPowerRoll({
			characteristic: Characteristic.Intuition,
			tier1: 'You find any hidden creatures with an Agility of 0 or lower and who don’t have the Hide skill',
			tier2: 'You find any hidden creatures who don’t have the Hide skill',
			tier3: 'You find all hidden creatures'
		}),
		effect: 'As part of this maneuver, you can point out any creatures you find to allies within 10 squares of you, making those creatures no longer hidden from those allies. If a creature is hidden from your allies but not from you, you can use a maneuver without making a test to point them out to your allies.'
	});

	static standUp = FactoryLogic.createAbility({
		id: 'stand-up',
		name: 'Stand Up',
		description: '',
		type: FactoryLogic.type.createManeuver(),
		keywords: [],
		distance: [
			FactoryLogic.distance.createSelf(),
			FactoryLogic.distance.createMelee()
		],
		target: 'Self or 1 creature',
		effect: 'You can use this maneuver to stand up if you are prone, ending that condition. Alternatively, you can use this maneuver to make an adjacent prone creature stand up.'
	});

	//#endregion

	//#region Actions

	static charge = FactoryLogic.createAbility({
		id: 'charge',
		name: 'Charge',
		description: '',
		type: FactoryLogic.type.createAction(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		effect: 'When you take the Charge action, you move up to your speed in a straight line, then make a melee free strike against a creature when you end your move. You can’t shift when you charge.'
	});

	static defend = FactoryLogic.createAbility({
		id: 'defend',
		name: 'Defend',
		description: '',
		type: FactoryLogic.type.createAction(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		effect: 'When you take the Defend action, all attacks against you have a double bane until the end of your next turn. You gain no benefit from this action while another creature is taunted by you.'
	});

	static heal = FactoryLogic.createAbility({
		id: 'heal',
		name: 'Heal',
		description: '',
		type: FactoryLogic.type.createAction(),
		keywords: [],
		distance: [ FactoryLogic.distance.createMelee() ],
		target: '1 creature',
		effect: 'You use your action to employ medicine or inspiring words to make an adjacent creature feel better and stay in the fight. The creature can spend a Recovery to regain Stamina, or can make a saving throw against a “(save ends)” effect they are suffering.'
	});

	static swap = FactoryLogic.createAbility({
		id: 'swap',
		name: 'Swap',
		description: '',
		type: FactoryLogic.type.createAction(),
		keywords: [],
		distance: [ FactoryLogic.distance.createSelf() ],
		target: 'Self',
		effect: 'You can turn your action into a move action or a maneuver, so that your turn can alternatively consist of two move actions and a maneuver, or two maneuvers and a move action.'
	});

	//#endregion
}
