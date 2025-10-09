import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';

export class RetainerData {
	static ambusher4 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-ambusher-4',
			name: 'Go for the Jugular',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '5 damage; M < [weak] bleeding (save ends)',
					tier2: '9 damage; M < [average] bleeding (save ends)',
					tier3: '12 damage; M [strong] bleeding (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('If the target is grabbed or the retainer had an edge on the power roll, the retainer gains 2 surges.')
			]
		})
	});

	static ambusher7 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-ambusher-7',
			name: 'Hamstring Slice',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '7 damage; M < [weak] slowed (EoT)',
					tier2: '10 damage; M < [average] slowed (save ends)',
					tier3: '15 damage; M < [strong] slowed and target can’t use triggered actions (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('The retainer and their mentor can each move up to their speed.')
			]
		})
	});

	static ambusher10 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-ambusher-10',
			name: 'Hold ’Em Down',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '11 damage; if the target is size 1 or smaller, who has M < [weak] is grabbed',
					tier2: '16 damage; if the target is size 1 or smaller, who has M < [average] is grabbed',
					tier3: '21 damage; if the target is size 1 or smaller, who has M < [strong] is grabbed'
				})),
				FactoryLogic.createAbilitySectionText('The retainer gains 2 surges when any creature makes a strike against a target grabbed this way.')
			]
		})
	});

	static artillery4 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-artillery-4',
			name: 'Supporting Volley',
			type: FactoryLogic.type.createTrigger('The retainer’s mentor makes a strike against a creature within distance.'),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: 'The triggering creature',
			sections: [
				FactoryLogic.createAbilitySectionText('The retainer makes a ranged free strike against the target.')
			]
		})
	});

	static artillery7 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-artillery-7',
			name: 'Line ‘Em Up',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
			target: 'Each enemy in the area',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '7 damage; M < [weak] prone',
					tier2: '11 damage; M < [average] prone',
					tier3: '16 damage; M < [strong] prone'
				}))
			]
		})
	});

	static artillery10 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-artillery-10',
			name: 'Ricochet Shot',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: 'One creature or object',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '9 damage',
					tier2: '14 damage',
					tier3: '19 damage'
				})),
				FactoryLogic.createAbilitySectionText('The retainer can target a second creature or object within 5 squares of the original target that has line of effect to the original target. The retainer doesn’t need line of effect to the second target but must be aware of their location.')
			]
		})
	});

	static brute4 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-brute-4',
			name: 'Big Windup',
			type: FactoryLogic.type.createManeuver(),
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			sections: [
				FactoryLogic.createAbilitySectionText('Until the start of the retainer’s next turn, strikes made against the retainer gain an edge. At the start of the retainer’s next turn, they gain 2 surges, and any ability they use before the end of their turn that force moves a creature can move that creature 2 additional squares.')
			]
		})
	});

	static brute7 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-brute-7',
			name: 'Overhand Swat',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '8 damage',
					tier2: '13 damage; push 2',
					tier3: '16 damage; push 3; M < [strong] prone'
				})),
				FactoryLogic.createAbilitySectionText('If the target ends any forced movement from this ability in a square adjacent to the retainer’s mentor, the mentor can make a melee free strike against them.')
			]
		})
	});

	static brute10 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-brute-10',
			name: 'Dizzying Sweep',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each creature in the area',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '10 damage; push 1',
					tier2: '14 damage; push 2',
					tier3: '20 damage; push 4'
				})),
				FactoryLogic.createAbilitySectionText('The retainer is dazed until the end of their next turn.')
			]
		})
	});

	static controller4 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-controller-4',
			name: 'Elemental Blast',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Area ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each creature in the area',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '4 damage; push 2',
					tier2: '6 damage; push 3',
					tier3: '10 damage; push 5'
				})),
				FactoryLogic.createAbilitySectionText('When the retainer uses this ability, they can choose for it to deal one of the following damage types: acid, cold, lightning, poison, or sonic.')
			]
		})
	});

	static controller7 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-controller-7',
			name: 'Oil Slick',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '5 poison damage; M < [weak] prone',
					tier2: '8 poison damage; M < [average] prone',
					tier3: '11 poison damage; M < [strong] prone'
				})),
				FactoryLogic.createAbilitySectionText('The area is difficult terrain for eenemies. Any enemy has fire weakness 5 while in the area, and any enemy who ends their turn in the area and has no movement remaining falls prone.')
			]
		})
	});

	static controller10 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-controller-10',
			name: 'Shattering Shards',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One Object',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '7 damage',
					tier2: '11 damage',
					tier3: '16 damage'
				})),
				FactoryLogic.createAbilitySectionText('The area within 2 squares of the target is difficult terrain, and each enemy in the area takes the same damage that the object took.')
			]
		})
	});

	static defender4 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-defender-4',
			name: 'Watch Out!',
			type: FactoryLogic.type.createTrigger('The target takes damage from a strike', { qualifiers: [ 'encounter' ] }),
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'The retainer’s mentor',
			sections: [
				FactoryLogic.createAbilitySectionText('The retainer pushes the target or the attacking creature up to 2 squares. If that moves the mentor out of range of the strike, the strike has no effect.')
			]
		})
	});

	static defender7 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-defender-7',
			name: 'It’s Me You Want!',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'Two creatures',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '7 damage; taunted (EoT)',
					tier2: '11 damage; taunted (save ends)',
					tier3: '16 damage; taunted (save ends)'
				}))
			]
		})
	});

	static defender10 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-defender-10',
			name: 'Last Stand',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One enemy',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '8 damage',
					tier2: '13 damage',
					tier3: '17 damage'
				})),
				FactoryLogic.createAbilitySectionText('The retainer and their mentor each gain 10 temporary Stamina. Additionally, each winded ally within 2 of the retainer can spend a Recovery.')
			]
		})
	});

	static harrier4 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-harrier-4',
			name: 'Tackle',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One enemy',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '5 damage; push 1',
					tier2: '9 damage; push 2',
					tier3: '12 damage; push 4'
				}))
			]
		})
	});

	static harrier7 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-harrier-7',
			name: 'Meet You There',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '7 damage',
					tier2: '10 damage',
					tier3: '15 damage'
				})),
				FactoryLogic.createAbilitySectionText('Before or after the strike, the retainer and their mentor can each shift up to their speed.')
			]
		})
	});

	static harrier10 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-harrier-10',
			name: 'Nab and Stab',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each creature in the area',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '11 damage; one target who has M < [weak] is grabbed',
					tier2: '16 damage; one target who has M < [average] is grabbed',
					tier3: '21 damage; one target who has M < [strong] is grabbed'
				})),
				FactoryLogic.createAbilitySectionText('The retainer shifts up to 2 squares, and can move a creature grabbed using this ability with them.')
			]
		})
	});

	static hexer4 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-hexer-4',
			name: 'Backfire Curse',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One enemy',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '2 corruption damage; the target is cursed (EoT)',
					tier2: '5 corruption damage; the target is cursed (EoT)',
					tier3: '7 corruption damage; the target is cursed (EoT)'
				})),
				FactoryLogic.createAbilitySectionText('While the target is cursed this way, whenever they make a strike that targets only one creature, the retainer can use a free triggered action to choose a second target for the strike within its distance.')
			]
		})
	});

	static hexer7 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-hexer-7',
			name: 'Take Root',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '5 damage; M < [weak] slowed (save ends)',
					tier2: '9 damage; M < [average] slowed (save ends)',
					tier3: '12 damage; M < [strong] slowed (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('While the target is slowed this way, if they end their turn without moving on that turn, they are no longer slowed and are restrained (save ends).')
			]
		})
	});

	static hexer10 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-hexer-10',
			name: 'Mazed',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Magic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '7 damage; M < [weak] mazed (save ends)',
					tier2: '11 damage; M < [average] mazed (save ends)',
					tier3: '16 damage; M < [strong] mazed (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('While mazed, the target is dazed. Additionally, at the end of each of the mazed target’s turns, the retainer can cause the target to move up to their speed in a straight line in a direction of the retainer’s choice. This is not forced movement, and the movement ends if it would cause the target to enter difficult or damaging terrain.')
			]
		})
	});

	static mount4 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-mount-4',
			name: 'Cavalry Charge',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One enemy',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '6 damage',
					tier2: '8 damage',
					tier3: '11 damage'
				})),
				FactoryLogic.createAbilitySectionText('If this ability is used as part of the Charge action, the mount’s rider can use a free triggered action to make a melee free strike against the same target.')
			]
		})
	});

	static mount7 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-mount-7',
			name: 'Giddyup!',
			type: FactoryLogic.type.createMove({ qualifiers: [ 'encounter' ] }),
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: 'Self',
			sections: [
				FactoryLogic.createAbilitySectionText('The mount shifts twice their speed. They can jump as part of this movement.')
			]
		})
	});

	static mount10 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-mount-10',
			name: 'Rearing Trample',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '10 damage; M < [weak] prone',
					tier2: '15 damage; M < [average] prone',
					tier3: '21 damage; M < [strong] prone'
				})),
				FactoryLogic.createAbilitySectionText('A target knocked prone this way or who is already prone takes an extra 5 damage')
			]
		})
	});

	static support4 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-support-4',
			name: 'Battlefield Medic',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Melee ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'Self or one ally',
			sections: [
				FactoryLogic.createAbilitySectionText('The target spends a Recovery, and ability rolls against the target take a bane until the start of the retainer’s next turn.')
			]
		})
	});

	static support7 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-support-7',
			name: 'Focus Fire',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: 'One creature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
					tier1: '9 damage',
					tier2: '13 damage',
					tier3: '18 damage'
				})),
				FactoryLogic.createAbilitySectionText('One ally within distance gains 2 surges.')
			]
		})
	});

	static support10 = FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: 'retainer-support-10',
			name: 'Back from the Dead',
			type: FactoryLogic.type.createMain({ qualifiers: [ 'encounter' ] }),
			keywords: [ AbilityKeyword.Melee ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One ally',
			sections: [
				FactoryLogic.createAbilitySectionText('If the target is at or below 0 Stamina, or if they have died due to Stamina loss since the end of the retainer’s last turn, the target is alive with 1 Stamina and can spend a Recovery.')
			]
		})
	});
}
