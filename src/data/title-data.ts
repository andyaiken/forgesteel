import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { Title } from '@/models/title';

export class TitleData {
	static ancientLoremaster: Title = {
		id: 'title-ancient-loremaster',
		name: 'Ancient Loremaster',
		description: '“It’s astonishing what you find in old books. Look at this—nearly complete schematics for a war automaton, gathering dust because nobody here reads Zaliac.”',
		echelon: 1,
		prerequisites: 'You find a trove of forgotten books.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-ancient-loremaster-1',
				name: 'Leverage',
				description: 'You learn a priceless secret. The Director chooses the type of person who would value this secret, usually a member of a particular faction, such as a Higaran noble, or a type of person, such as a fence of stolen goods. When negotiating with this type of person, you can offer this secret. If they accept, their interest increases by 3 (to a maximum of 5). You can only share this secret once.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ancient-loremaster-2',
				name: 'Rare Books',
				description: 'You add rare, ancient books to your collection. Whenever you undertake a research project, roll 1d6 for each dead language you know and add the total to the project roll.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ancient-loremaster-3',
				name: 'Susurrus Codex',
				description: 'You find a sinister book that whispers advice in a voice no one else can hear. As long as you follow the book’s advice, you gain an edge on Reason tests and take a bane on Presence tests. You can stop following the book’s advice at any time, but the book won’t speak to you for the rest of the day.'
			})
		],
		selectedFeatureID: ''
	};

	static angler: Title = {
		id: 'title-angler',
		name: 'Angler',
		description: 'You gain the following benefit',
		echelon: 1,
		prerequisites: '120 project points spent on the Tackle table while Fishing.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-angler-1',
				name: 'Angler',
				description: 'You gain an edge on all Fishing project rolls.'
			})
		],
		selectedFeatureID: ''
	};

	static battleaxeDiplomat: Title = {
		id: 'title-battleaxe-diplomat',
		name: 'Battleaxe Diplomat',
		description: '“We seem to be equals in might and combat prowess. Perhaps we should bandy words awhile instead.”',
		echelon: 1,
		prerequisites: 'You gain the friendship or alliance of a creature you once battled.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-battleaxe-diplomat-1',
				name: 'Iron Hand in Velvet Glove',
				description: 'The first time during a negotiation that you make a test using the Intimidate skill and don’t make an argument that appeals to an NPC’s motivation, you don’t lower the NPC’s patience or interest no matter the outcome of the roll.'
			}),
			FactoryLogic.feature.create({
				id: 'title-battleaxe-diplomat-2',
				name: 'Truce!',
				description: 'You have a double edge on tests made to stop combat and start a negotiation.'
			}),
			FactoryLogic.feature.create({
				id: 'title-battleaxe-diplomat-3',
				name: 'Warriors’ Understanding',
				description: 'You gain an edge on Presence tests made to interact with creatures you have fought against in combat encounters.'
			})
		],
		selectedFeatureID: ''
	};

	static brawler: Title = {
		id: 'title-brawler',
		name: 'Brawler',
		description: '“We won’t kill you. But you might wish we had.”',
		echelon: 1,
		prerequisites: 'You triumph in battle without killing any of your foes.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-brawler-1',
					name: 'Duck!',
					type: FactoryLogic.type.createTrigger('An enemy strikes you while a second creature is flanking you'),
					distance: [ FactoryLogic.distance.createSpecial('Adjacent') ],
					target: 'One enemy',
					sections: [
						FactoryLogic.createAbilitySectionText('You redirect the strike against the second creature. Once you use this benefit, you can’t use it again until you earn 1 or more Victories.')
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'title-brawler-2',
				name: 'Furniture Fighter',
				description: 'When you use a weapon ability with an improvised weapon or a weapon that isn’t part of your kit, the ability benefits from your kit’s melee weapon damage bonus.'
			}),
			FactoryLogic.feature.create({
				id: 'title-brawler-3',
				name: 'Headbutter',
				description: 'While you are grabbed or restrained, your free strikes don’t take a bane when those conditions would impose one.'
			}),
			FactoryLogic.feature.create({
				id: 'title-brawler-4',
				name: 'If I Wanted You Dead, You’d Be Dead',
				description: 'Whenever you defeat foes without killing any of them (including the foes you defeat to meet the prerequisite for this title), you gain an edge on tests during negotiations with those foes.'
			})
		],
		selectedFeatureID: ''
	};

	static cityRat: Title = {
		id: 'title-city-rat',
		name: 'City Rat',
		description: '“Stay out all night, visit the dives. Get in a fight, run from the cops. That’s the real city”',
		echelon: 1,
		prerequisites: 'You have spent at least 5 respites in a metropolis.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-city-rat-1',
				name: 'Discerning Shopper',
				description: 'When looking for an item prerequisite for a crafting project, you can remember meeting someone who might have the item—or at least information about it.'
			}),
			FactoryLogic.feature.create({
				id: 'title-city-rat-2',
				name: 'One with the Crowd',
				description: 'While you’re using one or more creatures as cover, you gain an edge on tests made to hide and sneak.'
			}),
			FactoryLogic.feature.create({
				id: 'title-city-rat-3',
				name: 'Street Smart',
				description: 'While in a settlement, you can’t be surprised.'
			})
		],
		selectedFeatureID: ''
	};

	static doomed: Title = {
		id: 'title-doomed',
		name: 'Doomed',
		description: '“I don’t know what it meant, but when I watched her die, I saw a vision. I watched her die and saw my own death. Am I losing my mind?”',
		echelon: 1,
		prerequisites: 'You are not a Hakaan but have witnessed the death of a Hakaan.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-doomed-1',
				name: 'Doomed',
				description: 'You aren’t destined for a meaningful death, but you still might achieve one. When you’re reduced to 0 Stamina but remain conscious, you can become doomed. If you do, you can’t regain Stamina, you automatically obtain a tier 3 outcome on tests and power rolls, and you don’t die until your Stamina reaches the negative of your Stamina maximum. At the end of the encounter, you die.'
			})
		],
		selectedFeatureID: ''
	};

	static dwarfLegionnaire: Title = {
		id: 'title-dwarf-legionnaire',
		name: 'Dwarf Legionnaire',
		description: '“I have learned much. It might be your courage that inspires others. Watch your opponent’s shield as well as their sword. And above all, stand fast, and do not yield.”',
		echelon: 1,
		prerequisites: 'You fight alongside three or more dwarves.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-dwarf-legionnaire-1',
				name: 'Close Formation',
				description: 'While adjacent to two or more allies, you gain a +2 bonus to stability.'
			}),
			FactoryLogic.feature.create({
				id: 'title-dwarf-legionnaire-2',
				name: 'Rune of Alarm',
				description: 'You can spend 10 uninterrupted minutes to inscribe a magic eye-shaped rune on a surface. The rune sheds light for 2 squares. The rune is dispelled 1 minute after it is activated or if you inscribe the rune elsewhere. The rune activates when an enemy comes within 2 squares of it. When the rune is activated, you wake up if you are nonmagically asleep, and you can perceive through the rune for 1 minute as if you were in its square.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-dwarf-legionnaire-3',
					name: 'Stonemeld',
					type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Adjacent to a stone wall' ] }),
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					sections: [
						FactoryLogic.createAbilitySectionText('You gain concealment. This concealment lasts until you leave the square or use an ability.')
					]
				})
			})
		],
		selectedFeatureID: ''
	};

	static elementalDabbler: Title = {
		id: 'title-elemental-dabbler',
		name: 'Elemental Dabbler',
		description: '“Spirit of fire, I command you!”',
		echelon: 1,
		prerequisites: 'You defeat a monster with the Elemental keyword, such as an crux of fire.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-elemental-dabbler-1',
				name: 'Elemental Blaster',
				description: 'Choose a damage type to which the defeated monster had an immunity. You have the Elementalist 1st-level Hurl Element feature, dealing the chosen damage type.'
			}),
			FactoryLogic.feature.create({
				id: 'title-elemental-dabbler-2',
				name: 'Elemental Immunity',
				description: 'Choose a damage type to which the defeated monster had an immunity. You have immunity to the chosen damage type equal to your highest characteristic score.'
			}),
			FactoryLogic.feature.create({
				id: 'title-elemental-dabbler-3',
				name: 'Elemental Weapons',
				description: 'Choose a damage type to which the defeated monster had an immunity. Whenever you use a damage-dealing weapon ability, that ability can deal damage of the chosen type instead of its usual damage type.'
			})
		],
		selectedFeatureID: ''
	};

	static factionMember: Title = {
		id: 'title-faction-member',
		name: 'Faction Member',
		description: '“In six months, I’ll be running this place.”',
		echelon: 1,
		prerequisites: 'You join an army, guild, or similar organization.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-faction-member-1',
				name: 'Academic Faction',
				description: `
When you’re negotiating with a member of your faction, their starting Patience increases by 2, up to a maximum of 5.

You find a sage who can make up to three Reason tests to recall lore or make project rolls for research projects on your behalf. The sage has a +5 bonus to these tests. These project rolls take 10 minutes each and don’t need to be made during a respite.`
			}),
			FactoryLogic.feature.create({
				id: 'title-faction-member-2',
				name: 'Guild Faction',
				description: `
When you’re negotiating with a member of your faction, their starting Patience increases by 2, up to a maximum of 5.

You find an expert crafter who can make up to three project rolls for crafting projects on your behalf. The crafter has a +5 bonus to these tests. These project rolls take 10 uninterrupted minutes each and don’t need to be made during a respite.`
			}),
			FactoryLogic.feature.create({
				id: 'title-faction-member-3',
				name: 'Martial Faction',
				description: `
When you’re negotiating with a member of your faction, their starting Patience increases by 2, up to a maximum of 5.

You recruit up to three minions with levels no greater than your own, of a type appropriate for the faction (such as human guards). These minions follow your orders for a day.`
			}),
			FactoryLogic.feature.create({
				id: 'title-faction-member-4',
				name: 'Spy Faction',
				description: `
When you’re negotiating with a member of your faction, their starting Patience increases by 2, up to a maximum of 5.

You find an agent who can provide you with three pieces of information about the settlement you’re in, such as the location of a hidden person, a secret entrance into a guarded area, or the negotiation motivation or pitfall of an important person.`
			})
		],
		selectedFeatureID: ''
	};

	static goldenrod: Title = {
		id: 'title-goldenrod',
		name: 'Goldenrod',
		description: 'You gain the following benefit',
		echelon: 1,
		prerequisites: '300 project points spent on the Tackle table while Fishing.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-goldenrod-1',
				name: 'Goldenrod',
				description: 'Each time you undertake the Fishing project, you can reroll one project roll.'
			})
		],
		selectedFeatureID: ''
	};

	static localHero: Title = {
		id: 'title-local-hero',
		name: 'Local Hero',
		description: '“Your coin won’t spend here. The Heroes of Gravesford drink for free in this tavern!”',
		echelon: 1,
		prerequisites: 'You save a community from certain destruction.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-local-hero-1',
				name: 'A New Dawn',
				description: 'Each time you finish a respite while in a community you have saved, the party gains a hero token. This hero token disappears at the end of your next respite if it hasn’t been used.'
			}),
			FactoryLogic.feature.create({
				id: 'title-local-hero-2',
				name: 'Easy Marks',
				description: 'You gain an edge on tests made using skills from the interpersonal and intrigue skill groups when influencing members of a community that you have saved.'
			}),
			FactoryLogic.feature.createBonus({
				id: 'title-local-hero-3',
				name: 'Local Fame',
				field: FeatureField.Renown,
				value: 1
			})
		],
		selectedFeatureID: ''
	};

	static mageHunter: Title = {
		id: 'title-mage-hunter',
		name: 'Mage Hunter',
		description: '“Their power is dangerous. Unnatural. Someone needs to do something.”',
		echelon: 1,
		prerequisites: 'You defeat three leader or solo creatures who each have at least one ability with the Magic keyword.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-mage-hunter-1',
				name: 'Arcane Dampening',
				description: 'When resisting potencies from magic abilities, your characteristic scores are considered to be 1 higher than usual.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-mage-hunter-2',
					name: 'Oh No You Don’t!',
					type: FactoryLogic.type.createTrigger('Target uses an ability with the Magic keyword'),
					distance: [ FactoryLogic.distance.createSpecial('Adjacent') ],
					target: 'One creature',
					sections: [
						FactoryLogic.createAbilitySectionText('Make a free strike.')
					]
				})
			}),
			FactoryLogic.feature.createMultiple({
				id: 'title-mage-hunter-3',
				name: 'Stink of Magic',
				description: 'As a maneuver, you open your senses to the residue of magic. Until the end of your next turn, you are aware of whether each creature within 5 squares is a construct, an undead, or a creature from another world, and whether they have used a magic ability in the previous hour. Additionally, you can’t be surprised by constructs, undead, or creatures from another world.',
				features: [
					FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'title-mage-hunter-3-1',
							name: 'Stink of Magic',
							description: 'You open your senses to the residue of magic',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
							target: 'Each creature in the area',
							sections: [
								FactoryLogic.createAbilitySectionText('Until the end of your next turn, you are aware of whether each target is a construct, an undead, or a creature from another world, and whether they have used a magic ability in the previous hour.')
							]
						})
					}),
					FactoryLogic.feature.create({
						id: 'title-mage-hunter-3-2',
						name: 'Stink of Magic',
						description: 'You can’t be surprised by constructs, undead, or creatures from another world.'
					})
				]
			})
		],
		selectedFeatureID: ''
	};

	static marshal: Title = {
		id: 'title-marshal',
		name: 'Marshal',
		description: '“I said you had twenty-four hours to leave town. That was… what, about 24 hours ago?”',
		echelon: 1,
		prerequisites: 'You join an organization that hunts criminals, such as the Far Mariners, or you are deputized to act for the local authorities.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-marshal-1',
				name: 'Guess It’s the Hard Way',
				description: 'When combat begins and you aren’t surprised, the first time you take damage before taking your turn, you halve that damage.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-marshal-2',
					name: 'Heedless Pursuer',
					description: 'You open your senses to the residue of magic',
					type: FactoryLogic.type.createManeuver({ free: true }),
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					sections: [
						FactoryLogic.createAbilitySectionText('You deal yourself 1d6 damage that can’t be reduced in any way. When you do, you ignore difficult terrain and you can increase the distance of any jump you make by 1 square, both until the end of your turn.')
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'title-marshal-3',
				name: 'Silver Shield',
				description: 'You have a badge granted to you by your organization. While you wear it, you gain the My Life for Yours feature from the censor class. When you use that ability, you can’t spend wrath unless you have the Wrath class feature.'
			}),
			FactoryLogic.feature.create({
				id: 'title-marshal-4',
				name: 'Trained Tracker',
				description: 'You gain an edge on tests made to track criminals.'
			})
		],
		selectedFeatureID: ''
	};

	static monsterBane: Title = {
		id: 'title-monster-bane',
		name: 'Monster Bane',
		description: '“You dare mock Blunwin Mousebane? You think my deed trivial? Ah but you didn’t see the size of the mouse!”',
		echelon: 1,
		prerequisites: 'You defeat a leader or solo monster with a Reason score of –2 or lower, such as an arixx.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-monster-bane-1',
				name: 'Beast Bane',
				description: 'Creatures with the Animal keyword take a bane on strikes made against you.'
			}),
			FactoryLogic.feature.create({
				id: 'title-monster-bane-2',
				name: 'Monster Soother',
				description: 'You gain an edge on tests made to calm or tame nonsapient creatures.'
			}),
			FactoryLogic.feature.create({
				id: 'title-monster-bane-3',
				name: 'Monster Trophy',
				description: 'You decorate your equipment with a trophy from a creature you defeated. While the trophy is visible, you gain an edge on tests made to intimidate sapient creatures.'
			})
		],
		selectedFeatureID: ''
	};

	static owedAFavor: Title = {
		id: 'title-owed-a-favor',
		name: 'Owed a Favor',
		description: '“The Guild’s gratitude knows no bounds! We’ll repay you in any way we can … short of actually paying you.”',
		echelon: 1,
		prerequisites: 'You successfully perform a service for a powerful faction.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-owed-a-favor-1',
				name: 'Owed a Favor',
				description: `
The faction will perform one favor for the party, provided it doesn’t interfere with the faction’s goals.

Additionally, the faction is a good source of information. The Director chooses a skill from the crafting or lore skill groups appropriate to the faction, such as the Criminal Underworld skill for an outlaw gang, the Blacksmithing skill for a blacksmith’s guild, or the Society skill for a noble house. While in a settlement where the faction has a presence, you gain this skill if you don’t already have it. If you already have the skill, you instead gain an edge on tests made using the skill.`
			})
		],
		selectedFeatureID: ''
	};

	static presumedDead: Title = {
		id: 'title-presumed-dead',
		name: 'Presumed Dead',
		description: '“But… you’re dead. We went to your funeral.”',
		echelon: 1,
		prerequisites: 'You die in a way that prevents your body from being recovered or examined (for instance, by falling off a cliff).',
		features: [
			FactoryLogic.feature.create({
				id: 'title-presumed-dead-1',
				name: 'Presumed Dead',
				description: `
While it might appear that you died, you did not. Instead, you regain 1 Stamina and can spend 1 or more Recoveries. Additionally, you gain a 1st-echelon trinket of the Director’s choice (see Treasures earlier in this chapter).

At a dramatic moment determined by the Director, you rejoin your party with an explanation for your narrow escape, and how you found your new trinket along the way.`
			})
		],
		selectedFeatureID: ''
	};

	static ratcatcher: Title = {
		id: 'title-ratcatcher',
		name: 'Ratcatcher',
		description: '“I like fighting these little guys. Means I don’t have to waste money on a helmet.”',
		echelon: 1,
		prerequisites: 'You defeat a leader or solo monster that is size 1S or smaller, such as a goblin monarch.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-ratcatcher-1',
				name: 'Deadly and Big',
				description: 'Your strikes gain a +3 damage bonus against creatures whose size is smaller than yours.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ratcatcher-2',
				name: 'Everybody Move!',
				description: 'When you use the Knockback maneuver, you can target one additional creature of your size or two additional smaller creatures.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-ratcatcher-3',
					name: 'Come Out to Play',
					description: 'Come out to play-yay!',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
					target: 'Each enemy in the area hidden to you',
					cost: 1,
					sections: [
						FactoryLogic.createAbilitySectionText('Each target who has P < [average] is taunted by you until the end of their next turn, and you know the location of each creature taunted in this way.')
					]
				})
			})
		],
		selectedFeatureID: ''
	};

	static savedForAWorseFate: Title = {
		id: 'title-saved-for-a-worse-fate',
		name: 'Saved for a Worse Fate',
		description: '“Drink this. You’ll need all your strength for what lies ahead!”',
		echelon: 1,
		prerequisites: 'The entire party is killed or captured by intelligent foes.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-saved-for-a-worse-fate-1',
				name: 'Gladiators',
				description: 'You must fight to the death for your captors’ amusement. Your intended opponents wield or guard a trinket or leveled treasure, which you can earn if you are victorious.'
			}),
			FactoryLogic.feature.create({
				id: 'title-saved-for-a-worse-fate-2',
				name: 'Prey',
				description: 'Your captors plan to release you and hunt you down, but it’s no fun unless you offer a challenge. Each of you is given a medicinal draught that grants a +1 bonus to speed and increases your Recoveries by 2. This benefit lasts until the end of your next respite.'
			}),
			FactoryLogic.feature.create({
				id: 'title-saved-for-a-worse-fate-3',
				name: 'Sacrifices',
				description: 'You are to be dropped in a volcano, fed to a sacred monster, abandoned in a desert, or otherwise sacrificed to a higher power. You are bedecked with holy jewelry. Each hero earns 1 Wealth.'
			}),
			FactoryLogic.feature.create({
				id: 'title-saved-for-a-worse-fate-4',
				name: 'Saviors',
				description: 'Your captors fear an even stronger foe, and they want you to defeat this enemy for them. You can even keep any treasure you find while doing so.'
			})
		],
		selectedFeatureID: ''
	};

	static shipCaptain: Title = {
		id: 'title-ship-captain',
		name: 'Ship Captain',
		description: '“Up anchor, shipmates! ’Tisn’t gold but glory we seek!”',
		echelon: 1,
		prerequisites: 'You acquire a ship, airship, or similar vessel.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-ship-captain-1',
				name: 'Deep Sea Diver',
				description: 'You can automatically swim at full speed while moving.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ship-captain-2',
				name: 'Ship Speaker',
				description: 'You magically know the location of any ship controlled by your party even while you aren’t aboard. You can telepathically communicate with anyone on board one of your ships who understands a language, and they can respond, no matter your distance from the ship.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ship-captain-3',
				name: 'Signal Flags',
				description: 'While aboard a ship, you can communicate with and conduct negotiations with another ship up to 5 miles away, as long as you and creatures on the other ship have line of effect to each other. You gain an edge on Presence tests made while negotiating in this way.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ship-captain-4',
				name: 'Trained Crewmember',
				description: 'You gain an edge on tests made to handle air or sea vessels.'
			})
		],
		selectedFeatureID: ''
	};

	static troupeTactics: Title = {
		id: 'title-troupe-tactics',
		name: 'Troupe Tactics',
		description: '“We’re actors! We’re the opposite of people!”',
		echelon: 1,
		prerequisites: 'The party has successfully performed as a troupe of actors, circus performers, or other entertainers.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-troupe-tactics-1',
					name: 'Flying Circus',
					type: FactoryLogic.type.createTrigger('During target\'s turn'),
					distance: [ FactoryLogic.distance.createSpecial('Adjacent') ],
					target: 'One ally',
					sections: [
						FactoryLogic.createAbilitySectionText('You push the target up to 2 squares if their size is the same as yours, or 4 squares if they are smaller. If this push causes the ally to fall, they can use a maneuver before they fall to reduce the height of the fall by 2.')
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'title-troupe-tactics-2',
				name: 'Spotlight',
				description: 'You magically cause a creature within 10 squares to shed light for 5 squares. This light lasts for 1 minute, until the creature is more than 10 squares away from you, or until you dismiss the effect (no action required). While illuminated, a creature can’t sneak or hide, they take a bane on tests made to perform any action secretly, and they gain an edge on tests made using the Lead, Music, or Perform skills.'
			}),
			FactoryLogic.feature.create({
				id: 'title-troupe-tactics-3',
				name: 'Supporting Player',
				description: 'You gain an edge on group tests using Presence and on tests made to assist another creature with a Presence test.'
			}),
			FactoryLogic.feature.create({
				id: 'title-troupe-tactics-4',
				name: 'Work the Crowd',
				description: 'While any of your allies is playing music or performing, you gain an edge on tests made to conceal objects, hide, pick pockets, or sneak.'
			})
		],
		selectedFeatureID: ''
	};

	static wantedDeadOrAlive: Title = {
		id: 'title-wanted-dead-or-alive',
		name: 'Wanted Dead or Alive',
		description: '“A hundred silver?! An insult! I turned my father in for fifty golden crowns. And he was innocent!”',
		echelon: 1,
		prerequisites: 'You are declared an outlaw by a governmental authority.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-wanted-dead-or-alive-1',
				name: 'Honor Among Thieves',
				description: 'When negotiating with criminals, your Renown score is considered to be 2 higher than usual.'
			}),
			FactoryLogic.feature.create({
				id: 'title-wanted-dead-or-alive-2',
				name: 'Minion Mover',
				description: 'When you make a melee strike that targets a minion and at least one more minion is within distance of the strike, the strike gains a +3 damage bonus.'
			}),
			FactoryLogic.feature.create({
				id: 'title-wanted-dead-or-alive-3',
				name: 'No, You’re Under Arrest!',
				description: 'You gain an edge on the Escape Grab maneuver. Additionally, when you succeed on a test to escape bonds or manacles, as part of the same maneuver, you can transfer the bonds or manacles to an adjacent creature of the same size without them immediately noticing.'
			})
		],
		selectedFeatureID: ''
	};

	static zombieSlayer: Title = {
		id: 'title-zombie-slayer',
		name: 'Zombie Slayer',
		description: '“Why won’t you die! You’ve already done it once, you should be good at it by now!”',
		echelon: 1,
		prerequisites: 'You defeat a leader or solo monster with the Undead keyword, such as a ghost.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-zombie-slayer-1',
				name: 'Blessed Weapons',
				description: 'Whenever you use a damage-dealing weapon ability, that ability can deal holy damage instead of its usual damage type.'
			}),
			FactoryLogic.feature.createMultiple({
				id: 'title-zombie-slayer-2',
				name: 'Divine Health',
				description: 'You gain corruption immunity equal to your highest characteristic score. Additionally, you can’t be turned into an undead creature.',
				features: [
					FactoryLogic.feature.create({
						id: 'title-zombie-slayer-2-1',
						name: 'Divine Health',
						description: 'You can’t be turned into an undead creature.'
					}),
					FactoryLogic.feature.createDamageModifier({
						id: 'title-zombie-slayer-2-2',
						modifiers: [
							FactoryLogic.damageModifier.createCharacteristic({
								damageType: DamageType.Corruption,
								modifierType: DamageModifierType.Immunity,
								characteristics: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ]
							})
						]
					})
				]
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-zombie-slayer-3',
					name: 'Holy Terror',
					description: 'Return to your grave!',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
					target: 'Each undead enemy in the area',
					cost: 3,
					sections: [
						FactoryLogic.createAbilitySectionText('Each target takes holy damage equal to your Reason, Intuition, or Presence score (your choice). Additionally, each target who has P < [strong] is frightened (save ends).')
					]
				})
			})
		],
		selectedFeatureID: ''
	};

	static arenaFighter: Title = {
		id: 'title-arena-fighter',
		name: 'Arena Fighter',
		description: '“You’ve never seen the showstopper? The move so brutal it was banned in the arena? Come closer and I’ll show it to you.”',
		echelon: 2,
		prerequisites: 'You are victorious in battle in an arena or some other public contest of combat.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-arena-fighter-1',
				name: 'Dirty Fighting',
				description: 'While you are standing, your melee strikes gain a +3 damage bonus against prone creatures. Additionally, being prone doesn’t impose a bane on your strikes.'
			}),
			FactoryLogic.feature.create({
				id: 'title-arena-fighter-2',
				name: 'Foes as Weapons',
				description: 'Whenever you have a creature of your size or smaller grabbed, you can use them as a weapon when you make a melee weapon free strike. Both the target and the grabbed enemy take the strike’s damage.'
			}),
			FactoryLogic.feature.createBonus({
				id: 'title-arena-fighter-3',
				name: 'Instant Celebrity',
				field: FeatureField.Renown,
				value: 1
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-arena-fighter-4',
					name: 'Showstopper',
					description: 'Show\'s over, kids!',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility ],
								tier1: '6 damage; I < [weak], slowed (save ends)',
								tier2: '10 damage; I < [average], frightened (save ends)',
								tier3: '14 damage; I < [strong], dazed (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('If you kill a non-minion opponent using this ability, each enemy within 3 squares of you is frightened (save ends).')
					]
				})
			})
		],
		selectedFeatureID: ''
	};

	static awakened: Title = {
		id: 'title-awakened',
		name: 'Awakened',
		description: '“I was grappling with them, and when they died … I felt something happen. To me.”',
		echelon: 2,
		prerequisites: 'You defeat a leader or solo creature who has at least one ability with the Psionic keyword, such as a voiceless talker evolutionist.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-awakened-1',
				name: 'Foresight',
				description: 'You don’t take a bane when using abilities against creatures with concealment.'
			}),
			FactoryLogic.feature.create({
				id: 'title-awakened-2',
				name: 'Rogue Talent',
				description: 'Choose one triggered action that the talent class has access to at 1st level. You gain that ability regardless of whether your class and subclass allow you to take it. If this ability allows you to gain or spend clarity, you can’t do so unless you have the Clarity class feature.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-awakened-3',
					name: 'Telepathy',
					type: FactoryLogic.type.createManeuver(),
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature who understands a langauge you know',
					sections: [
						FactoryLogic.createAbilitySectionText('You communicate telepathically with the target. The targer can respond telepathically as part of the same maneuver.')
					]
				})
			})
		],
		selectedFeatureID: ''
	};

	static battlefieldCommander: Title = {
		id: 'title-battlefield-commander',
		name: 'Battlefield Commander',
		description: '“Spells and shadows have their place, but it takes soldiers to hold the field.”',
		echelon: 2,
		prerequisites: 'You lead an army in battle and win.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-battlefield-commander-1',
					name: 'Charge!',
					description: 'Follow me!',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
					target: 'Self and each ally in the area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionText('Each target can use the Charge main action.')
					]
				})
			}),
			FactoryLogic.feature.createBonus({
				id: 'title-battlefield-commander-2',
				name: 'Renowned Warrior',
				field: FeatureField.Renown,
				value: 1
			}),
			FactoryLogic.feature.create({
				id: 'title-battlefield-commander-3',
				name: 'Student of War',
				description: 'Choose a 1st-level doctrine feature from the tactician class. You gain that feature even if you don’t have the Tactical Doctrine feature.'
			})
		],
		selectedFeatureID: ''
	};

	static bloodMagic: Title = {
		id: 'title-blood-bagic',
		name: 'Blood Magic',
		description: '“Flow, blood, thou fiend’s libation, and catch my foes in conflagration!”',
		echelon: 2,
		prerequisites: 'You participate in a Discover Lore project to learn forbidden knowledge.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-blood-magic-1',
				name: 'Blood Mage',
				description: 'When you use an area ability with the Magic or Psionic keyword, you can take damage equal to your level to increase the ability’s area by 1 until the end of the encounter. If the area is a line, you increase the size of one dimension, not both. This damage can’t be reduced in any way. You can use this benefit only once per use of an ability.'
			}),
			FactoryLogic.feature.create({
				id: 'title-blood-magic-2',
				name: 'Bloody Murder',
				description: 'When you deal rolled damage to a creature with a strike, you can take damage equal to your level to deal twice that much corruption damage to the creature. The damage you take from this title can’t be reduced in any way. You can use this benefit only once per ability. If the creature is reduced to 0 Stamina by this corruption damage, the creature explodes in a shower of blood and you regain the Stamina you lost. You can’t use this benefit on creatures without blood, such as constructs, elementals, or undead.'
			}),
			FactoryLogic.feature.createDamageModifier({
				id: 'title-blood-magic-3',
				name: 'I Reject This Evil Power!',
				modifiers: [
					FactoryLogic.damageModifier.createPerLevel({
						damageType: DamageType.Corruption,
						modifierType: DamageModifierType.Immunity,
						value: 1
					})
				]
			})
		],
		selectedFeatureID: ''
	};

	static corsair: Title = {
		id: 'title-corsair',
		name: 'Corsair',
		description: '“Haul down your flag or we’ll burn you to the waterline!”',
		echelon: 2,
		prerequisites: 'You have the Ship Captain title, and you sink or capture a ship of equal or greater size than your own.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-corsair-1',
				name: 'Artillerist',
				description: 'You gain a +5 damage bonus when using a ship’s weapons.'
			}),
			FactoryLogic.feature.create({
				id: 'title-corsair-2',
				name: 'Black Flag',
				description: 'You have a recognizable flag that strikes terror on the high seas. While your flag is flying from your ship, crewmembers of other ships who have line of effect to the flag take a bane on strikes made against your ship or its crew.'
			}),
			FactoryLogic.feature.createBonus({
				id: 'title-corsair-3',
				name: 'Fearsome Reputation',
				field: FeatureField.Renown,
				value: 1
			}),
			FactoryLogic.feature.create({
				id: 'title-corsair-4',
				name: 'Scoundrel Tactics',
				description: 'While aboard a ship, you can use the following skills to make a test to influence another ship up to 5 miles away whose crewmembers have line of effect to you, and you gain an edge when you do so. You can use Disguise to hide your ship’s identity or general type, Intimidate to convince another ship’s crew to flee or surrender, or Hide or Sneak to let your ship avoid notice.'
			})
		],
		selectedFeatureID: ''
	};

	static factionOfficer: Title = {
		id: 'title-faction-officer',
		name: 'Faction Officer',
		description: '“If you want or need something, talk to me. I have a certain … influence in these parts.”',
		echelon: 2,
		prerequisites: 'You have the Faction Member title, and you greatly advance the faction’s goals.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-faction-officer-1',
				name: 'Requisition',
				description: 'When you gain this title, you gain a 1st- or 2nd-echelon magic trinket of your choice from your faction. Whenever you gain a level, you can swap the trinket out for another one.'
			}),
			FactoryLogic.feature.create({
				id: 'title-faction-officer-2',
				name: 'You\'re the Boss',
				description: 'Lower-ranking members of your faction follow your routine orders. In nonroutine matters, you gain an edge on tests made to influence those characters’ behavior.'
			})
		],
		selectedFeatureID: ''
	};

	static feyFriend: Title = {
		id: 'title-fey-friend',
		name: 'Fey Friend',
		description: '“Do you enjoy the vintage? Yes, you can understand my tongue now. One does not drink at my table and leave unchanged.”',
		echelon: 2,
		prerequisites: 'You eat and drink with an elf monarch or archfey.',
		features: [
			FactoryLogic.feature.createMultiple({
				id: 'title-fey-friend-1',
				name: 'Gift of Charm',
				features: [
					FactoryLogic.feature.createLanguageChoice({
						id: 'title-fey-friend-1-1',
						name: 'Gift of Charm',
						selected: [ 'Khelt' ]
					}),
					FactoryLogic.feature.create({
						id: 'title-fey-friend-1-2',
						name: 'Gift of Charm',
						description: 'You have a skill of your choice from the interpersonal skill group.'
					})
				]
			}),
			FactoryLogic.feature.createMultiple({
				id: 'title-fey-friend-2',
				name: 'Gift of Foresight',
				features: [
					FactoryLogic.feature.createLanguageChoice({
						id: 'title-fey-friend-2-1',
						name: 'Gift of Foresight',
						selected: [ 'Khelt' ]
					}),
					FactoryLogic.feature.create({
						id: 'title-fey-friend-2-2',
						name: 'Gift of Foresight',
						description: 'When resisting potencies, your Intuition score is considered to be 1 higher than usual.'
					})
				]
			}),
			FactoryLogic.feature.createMultiple({
				id: 'title-fey-friend-3',
				name: 'Gift of Knowledge',
				features: [
					FactoryLogic.feature.createLanguageChoice({
						id: 'title-fey-friend-3-1',
						name: 'Gift of Knowledge',
						selected: [ 'Khelt' ]
					}),
					FactoryLogic.feature.create({
						id: 'title-fey-friend-3-2',
						name: 'Gift of Knowledge',
						description: 'You gain an edge on tests you make that use any skill from the lore skill group.'
					})
				]
			})
		],
		selectedFeatureID: ''
	};

	static giantSlayer: Title = {
		id: 'title-giant-slayer',
		name: 'Giant Slayer',
		description: '“Come back here, puny one, and let me crush you!”',
		echelon: 2,
		prerequisites: 'You defeat a leader or solo creature with the Giant keyword, such as a fire giant chief.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-giant-slayer-1',
				name: 'Smallfolk Dodge',
				description: 'Any creature of size 2 or larger takes a bane on strikes against you.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-giant-slayer-2',
					name: 'The Harder They Fall',
					description: 'Timber!',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One creature',
					cost: 7,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility ],
								tier1: '7 damage; M < [weak], prone and can\'t stand (save ends)',
								tier2: '11 damage; M < [average], prone and can\'t stand (save ends)',
								tier3: '16 damage; M < [strong], prone and can\'t stand (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('If the target is size 2 or larger, you gain an edge on this ability.')
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'title-giant-slayer-3',
				name: 'Up the Beanstalk',
				description: 'You have the Climb skill. If you already have this skill, you instead gain an edge on tests made using the Climb skill. Whileyou’re climbing a creature, the creature has a double bane on strikes against you and you have a double edge on tests made to stay on the creature.'
			})
		],
		selectedFeatureID: ''
	};

	static godsworn: Title = {
		id: 'title-godsworn',
		name: 'Godsworn',
		description: '“He seemed like he needed help! Now the dead speak to me. I think maybe that old man was more than he appeared.”',
		echelon: 2,
		prerequisites: 'You do a favor for an agent of a god or saint, or promise to do so.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-godsworn-1',
				name: 'Healing Gift',
				description: 'You can use the 1st-level Conduit feature Healing Grace as if you had spent 1 piety. Once you use this benefit, you can’t use it again until you earn 1 or more Victories.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-godsworn-2',
					name: 'Last-Ditch Prayer',
					type: FactoryLogic.type.createManeuver({ free: true }),
					distance: [ FactoryLogic.distance.createSelf() ],
					target: 'Self',
					sections: [
						FactoryLogic.createAbilitySectionText('You recite a prayer for help, gaining a pool of 2d10 of the Heroic Resource granted by your class. This pool disappears at the end of your turn if you haven’t used it. Once you use this benefit, you can’t use it again until you perform another service for a god or saint, or until you gain a level.')
					]
				})
			}),
			FactoryLogic.feature.createMultiple({
				id: 'title-godsworn-3',
				name: 'Touched by the divine',
				description: 'Choose a god or saint',
				features: [
					FactoryLogic.feature.createDomainChoice({
						id: 'title-godsworn-3a',
						count: 1
					}),
					FactoryLogic.feature.createDomainFeature({
						id: 'title-godsworn-3b',
						name: '1st-Level Domain Feature',
						level: 1
					})
				]
			})
		],
		selectedFeatureID: ''
	};

	static heistHero: Title = {
		id: 'title-heist-hero',
		name: 'Heist Hero',
		description: '“Everybody know their assignments? All right, let’s go.”',
		echelon: 2,
		prerequisites: 'You have the Troupe Leading Player title, and you have used planning and teamwork to execute a theft that went (reasonably) according to plan.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-heist-hero-1',
				name: 'Mother Hen',
				description: 'You can spend 10 uninterrupted minutes to psionically enhance up to five willing creatures within 10 squares of you who understand a language you know. For the next hour, you and each target can communicate telepathically with each other no matter the distance between you.'
			}),
			FactoryLogic.feature.create({
				id: 'title-heist-hero-2',
				name: 'Sneakers',
				description: 'You gain the Sneak skill. If you already have this skill, you instead gain an edge on tests made using the Sneak skill. During group tests, you can both use the Sneak skill and assist another hero using the Sneak skill.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-heist-hero-3',
					name: 'Timely Distraction',
					description: `
Coming through with hot soup!

I better watch out for that banana peel!`,
					type: FactoryLogic.type.createTrigger('An ally makes a test to lie to, pick the pocket of, hide from, or sneak by the target and doesn’t like the outcome.'),
					keywords: [ AbilityKeyword.Ranged ],
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					sections: [
						FactoryLogic.createAbilitySectionText('You momentarily attract the target’s notice to let your ally reroll their test. Once you use this ability, you can’t use it again against the same target for 1 hour.')
					]
				})
			})
		],
		selectedFeatureID: ''
	};

	static knight: Title = {
		id: 'title-knight',
		name: 'Knight',
		description: '“Kneel, heroes. Arise, knights of Tor, and may your swords be ever sharp in our service.”',
		echelon: 2,
		prerequisites: 'A noble or monarch grants you knighthood or a similar rank.',
		features: [
			FactoryLogic.feature.createBonus({
				id: 'title-knight-1',
				name: 'Heraldic Fame',
				field: FeatureField.Renown,
				value: 1
			}),
			FactoryLogic.feature.createBonus({
				id: 'title-knight-2',
				name: 'Knightly Aegis',
				field: FeatureField.Stamina,
				value: 6
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-knight-3',
					name: 'Knightly Challenge',
					description: 'Have at thee!',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
					distance: [ FactoryLogic.distance.createMelee() ],
					target: 'One creature',
					cost: 5,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility ],
								tier1: '7 damage; taunted (save ends)',
								tier2: '11 damage; taunted (save ends)',
								tier3: '16 damage; taunted (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('You can end the taunted condition on the target as a free maneuver.'),
						FactoryLogic.createAbilitySectionText('If you take this title, you might occasionally be called upon to perform duties for the person who knighted you.')
					]
				})
			})
		],
		selectedFeatureID: ''
	};

	static masterLibrarian: Title = {
		id: 'title-master-librarian',
		name: 'Master Librarian',
		description: '“You want to know the exact coordinates of the Gem of the Waves shipwreck? I came across that just the other day in an unpublished memoir of its second mate. Let me get that for you.”',
		echelon: 2,
		prerequisites: 'You have the Ancient Loremaster title, and you have completed a Discover Lore project to learn lost knowledge or forbidden knowledge.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-master-librarian-1',
				name: 'Arcane Improvisation',
				description: 'When you use a damage-dealing magic signature ability, you can change its damage type to acid, cold, corruption, fire, lightning, poison, or sonic damage.'
			}),
			FactoryLogic.feature.create({
				id: 'title-master-librarian-2',
				name: 'I Have Just the Book',
				description: 'If you start a Discover Lore project in your hero’s stronghold or other a permanent base of operations you immediately gain 60 project points toward the completion of that project. If the project costs 60 or fewer points, you complete it in 10 uninterrupted minutes without needing to use a respite activity.'
			}),
			FactoryLogic.feature.create({
				id: 'title-master-librarian-3',
				name: 'Picked Up a Few Things',
				description: 'You know a skill from the lore skill group.'
			}),
			FactoryLogic.feature.createLanguageChoice({
				id: 'title-master-librarian-4',
				name: 'Polyglot',
				count: 2
			})
		],
		selectedFeatureID: ''
	};

	static specialAgent: Title = {
		id: 'title-special-agent',
		name: 'Special Agent',
		description: '“And this is interesting … if you twist the third button on your overcoat— no, don’t do it now!”',
		echelon: 2,
		prerequisites: 'A spymaster gives you an important secret mission.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-special-agent-1',
				name: 'Boffin',
				description: `
You gain a small magic spy device called a boffin. Once per encounter, you can activate a boffin property as a maneuver

* Make a test that uses the Disguise skill. You gain an edge on the test.
* One mundane lock you touch is unlocked.
* Choose a square within 10 squares, even if you don’t have line of effect to it. You can observe the area around that square as if you were in it.
* You throw the boffin up to 10 squares, where it explodes in a 5 cube. Each creature in the area takes fire damage equal to 2d10 + your level. The boffin is permanently destroyed but can be replaced by your spymaster … though they don’t like doing so too often.`
			}),
			FactoryLogic.feature.create({
				id: 'title-special-agent-2',
				name: 'Caustic Alchemy',
				description: 'You have your choice of the 1st-level shadow college features Coat the Blade or Smoke Bomb. When you use that feature, you can’t spend insight unless you have the Insight class feature.'
			}),
			FactoryLogic.feature.create({
				id: 'title-special-agent-3',
				name: 'Spy Ring',
				description: 'You gain a piece of magic jewelry, such as a ring. As a main action while wearing the jewelry, you can take on the illusory appearance of an individual within 10 squares who you have line of effect to. This disguise lets you automatically succeed on tests made using the Disguise skill based solely on visual identification.'
			})
		],
		selectedFeatureID: ''
	};

	static swornHunter: Title = {
		id: 'title-sworn-hunter',
		name: 'Sworn Hunter',
		description: '“I will follow you to the ends of the earth—just so I can kick you off the edge.”',
		echelon: 2,
		prerequisites: 'You have the Marshal title, and you take down an entire criminal organization.',
		features: [
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-sworn-hunter-1',
					name: 'Hunter\'s Oath',
					type: FactoryLogic.type.createMain(),
					distance: [ FactoryLogic.distance.createRanged(10) ],
					target: 'One creature',
					sections: [
						FactoryLogic.createAbilitySectionText('You swear a hunter’s oath against the target. This oath lasts until the target dies or until you swear a hunter’s oath against a different creature. As long as the hunter’s oath lasts, you magically know the direction to the target if they are within 50 miles of you, and your damage-dealing abilities gain a +5 damage bonus against the target.')
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'title-sworn-hunter-2',
				name: 'Particular Set of Skills',
				description: 'You know a skill from the intrigue skill group.'
			}),
			FactoryLogic.feature.create({
				id: 'title-sworn-hunter-3',
				name: 'Spy Ring',
				description: 'When you have a creature grabbed and take damage from an ability not used by that creature, the grabbed creature takes the same damage.'
			})
		],
		selectedFeatureID: ''
	};

	static undeadSlain: Title = {
		id: 'title-undead-slain',
		name: 'Undead Slain',
		description: '“No, I didn’t get bitten. And yes, I’m fine!”',
		echelon: 2,
		prerequisites: 'You are killed by an undead creature.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-undead-slain-1',
				name: 'Ghoul or Campire',
				description: `You return to life 1 minute after being killed with Stamina equal to your winded value. You gain corruption immunity equal to your level and the following benefit if you are killed by a ghoul or vampire. If you die again, you rise as an undead creature under the Director’s control.
					
When you make a melee free strike against an adjacent creature, you can bite that creature. If you do so and obtain a tier 3 outcome, you gain temporary Stamina equal to the damage dealt. If not lost beforehand, this temporary Stamina lasts until the end of your next respite.`
			}),
			FactoryLogic.feature.create({
				id: 'title-undead-slain-2',
				name: 'Incorporeal Undead',
				description: `You return to life 1 minute after being killed with Stamina equal to your winded value. You gain corruption immunity equal to your level and the following benefit if you are killed by an incorporeal undead. If you die again, you rise as an undead creature under the Director’s control.
					
You can move through other creatures and objects. The first time in a combat round that you pass through a creature, that creature takes corruption damage equal to half your level. You don’t take damage from being force moved into objects.`
			}),
			FactoryLogic.feature.create({
				id: 'title-undead-slain-3',
				name: 'Other Corporeal Undead',
				description: `You return to life 1 minute after being killed with Stamina equal to your winded value. You gain corruption immunity equal to your level and the following benefit if you are killed by any other corporeal undead. If you die again, you rise as an undead creature under the Director’s control.
					
When you are reduced to 0 Stamina by damage that isn’t fire or holy damage and your body isn’t destroyed, you can regain half your Stamina and fall prone. Once you use this benefit, you can’t use it again until you earn 10 or more Victories.`
			})
		],
		selectedFeatureID: ''
	};

	static unstoppable: Title = {
		id: 'title-unstoppable',
		name: 'Unstoppable',
		description: '“I seen the goblin king run ’im through with a spear. Then I seen ’im pull ’imself back up, spear still in ’im, and headbutt the goblin king … then he pulls out the spear and throws it on the goblin king’s corpse.”',
		echelon: 2,
		prerequisites: 'You defeat a foe while at or below 0 Stamina.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-unstoppable-1',
				name: 'From Hell’s Heart',
				description: 'While you are winded, your melee strikes gain a +3 damage bonus.'
			}),
			FactoryLogic.feature.create({
				id: 'title-unstoppable-2',
				name: 'Furious Attack',
				description: 'Choose one signature ability from the fury class. You gain that ability regardless of whether your class and subclass allow you to take it. If this ability allows you to gain or spend ferocity, you can’t do so unless you have the Ferocity class feature.'
			}),
			FactoryLogic.feature.create({
				id: 'title-unstoppable-3',
				name: 'Furious Charge',
				description: 'When you use the Charge action, your strike made as part of that action gains a damage bonus equal to the number of squares you moved as part of the charge.'
			})
		],
		selectedFeatureID: ''
	};

	static armedAndDangerous: Title = {
		id: 'title-armed-and-dangerous',
		name: 'Armed and Dangerous',
		description: '“I’m not picky. Any tool will suffice. A sword seems a most appropriate tool for this job.”',
		echelon: 3,
		prerequisites: 'You can’t use kits, and you defeat five non-minion enemies using weapon abilities that don’t have the Magic or Psionic keyword.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-armed-and-dangerous-1',
				name: 'Effect',
				description: 'You can use and gain the benefits of kits.'
			})
		],
		selectedFeatureID: ''
	};

	static backFromTheGrave: Title = {
		id: 'title-back-from-the-grave',
		name: 'Back from the Grave',
		description: '“Hi! Remember me?”',
		echelon: 3,
		prerequisites: 'You die at the hands of your greatest foe, that foe still lives, and you aren’t a revenant.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-back-from-the-grave-1',
				name: 'Effect',
				description: 'You are restored to life. You gain the Tough But Withered signature trait from the revenant ancestry.'
			})
		],
		selectedFeatureID: ''
	};

	static demonSlayer: Title = {
		id: 'title-demon-slayer',
		name: 'Demon Slayer',
		description: '“F’lath v’korr en zaratha g’rrack.”',
		echelon: 3,
		prerequisites: 'You defeat a leader or solo creature with the Demon keyword, such as a soulraker hivequeen, or you are possessed by a demon.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-demon-slayer-1',
				name: 'Demonic Lore',
				description: 'You know the Proto-Ctholl language. Additionally, when you deal damage using a magic ability, you can change the ability’s damage type to holy.'
			}),
			FactoryLogic.feature.create({
				id: 'title-demon-slayer-2',
				name: 'Lethe',
				description: 'While you are winded, your strikes gain a +5 damage bonus.'
			}),
			FactoryLogic.feature.create({
				id: 'title-demon-slayer-3',
				name: 'Made of Teeth',
				description: 'Your body can sprout teeth in unusual places. Whenever a creature makes physical contact with you or starts their turn touching you, you can deal 5 damage to them (no action required).'
			}),
			FactoryLogic.feature.create({
				id: 'title-demon-slayer-4',
				name: 'Soulsight',
				description: 'Any creature within 2 squares can’t be hidden from you.'
			}),
			FactoryLogic.feature.create({
				id: 'title-demon-slayer-5',
				name: 'Special',
				description: 'When you make a Presence test and roll a natural 5 or lower, you are cursed to communicate in only Proto-Ctholl for 1 minute, whether you know that language or not.'
			})
		],
		selectedFeatureID: ''
	};

	static diabolist: Title = {
		id: 'title-diabolist',
		name: 'Diabolist',
		description: '“If you can’t beat ’em, join ’em.”',
		echelon: 3,
		prerequisites: 'You defeat a leader or solo creature with the Devil keyword, such as an archdevil, or you make a deal with a devil.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-diabolist-1',
				name: 'Devil Lore',
				description: 'You know the Anjali language, and your understanding of this language helps you create irresistible supernatural effects. The potencies of your magic or psionic abilities that target Reason, Intuition, or Presence increase by 1.'
			}),
			FactoryLogic.feature.create({
				id: 'title-diabolist-2',
				name: 'Infernal Legacy',
				description: 'You gain 3 ancestry points to spend on purchased devil ancestry traits.'
			}),
			FactoryLogic.feature.create({
				id: 'title-diabolist-3',
				name: 'Sly Devil',
				description: 'You gain the Silver Tongue signature trait from the devil ancestry.'
			}),
			FactoryLogic.feature.create({
				id: 'title-diabolist-4',
				name: 'Untouched by Corruption',
				description: 'Whenever you use a damage-dealing ability, that ability can deal holy damage instead of its usual damage type.'
			})
		],
		selectedFeatureID: ''
	};

	static dragonBlooded: Title = {
		id: 'title-dragon-blooded',
		name: 'Dran Blooded',
		description: '“I stabbed the wyrm Axarthan in the heart and their silver blood washed over me, leaving me … as you see.”',
		echelon: 3,
		prerequisites: 'You defeat a leader or solo creature with the Dragon keyword, such as a gloom dragon.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-dragon-blooded-1',
				name: 'Dragon Scaled',
				description: 'Dragon scales grow on your body wherever the heart’s blood of the dragon touched you. You gain the Wyrmplate signature trait from the dragon knight ancestry.'
			}),
			FactoryLogic.feature.create({
				id: 'title-dragon-blooded-2',
				name: 'Dragon Touched',
				description: 'You gain 3 ancestry points to spend on purchased dragon knight ancestry traits.'
			})
		],
		selectedFeatureID: ''
	};

	static fleetAdmiral: Title = {
		id: 'title-fleet-admiral',
		name: 'Fleet Admiral',
		description: '“All hail the Pirate Queen!”',
		echelon: 3,
		prerequisites: 'You have the Corsair title, and you lead a fleet of at least three ships.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-fleet-admiral-1',
				name: 'First Mate',
				description: 'You have a pirate retainer, such as a human warrior, chosen by the Director. This retainer’s level increases to your level.'
			}),
			FactoryLogic.feature.create({
				id: 'title-fleet-admiral-2',
				name: 'Swashbuckler',
				description: 'You can automatically climb at full speed while moving.'
			}),
			FactoryLogic.feature.create({
				id: 'title-fleet-admiral-3',
				name: 'Treasure Keeper',
				description: 'You earn 1 Wealth.'
			}),
			FactoryLogic.feature.create({
				id: 'title-fleet-admiral-4',
				name: 'Weather Wizard',
				description: `
Once per day, you can spend 10 uninterrupted minutes to magically alter mundane weather in a 5-mile radius around you. The weather moves with you and persists for 6 hours or until you dismiss it as a free maneuver. Choose from one of the following weather types:

* Calm: Wind-powered vessels and technology cease working.
* Fog: Visibility is reduced to 6 squares.
* High Winds: The speed of wind-powered vessels is doubled.
* Light Winds: No effects due to weather.
 *Storm: The crew of an unsheltered wind-powered vessel must make a medium group Reason test. On a failure, the vessel needs repairs and moves at half speed until those repairs are made.`
			})
		],
		selectedFeatureID: ''
	};

	static maestro: Title = {
		id: 'title-maestro',
		name: 'Maestro',
		description: '“When I saw the bloodstained manuscript under Fellwander’s arm, I knew his quest for the Opera was over—and with it, his chance for redemption.”',
		echelon: 2,
		prerequisites: 'You visit the realms of gods, devils, or other immortal beings and hear a note of the Music of Creation.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-maestro-1',
				name: 'Angelic Chorus',
				description: 'You can use the lessons of musical improvisation in combat. Choose one class act triggered action from the troubadour class. You gain that ability regardless of whether your class and subclass allow you to take it. If this ability allows you to gain or spend drama, you can gain or spend the Heroic Resource of your class in place of drama.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-maestro-2',
					name: 'The Devil’s Chord',
					description: 'Helloooo Orden!',
					type: FactoryLogic.type.createMain(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
					target: 'Each creature in the area',
					cost: 9,
					sections: [
						FactoryLogic.createAbilitySectionRoll(
							FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: 'You take 4 sonic damage unless you have the Performance skill.',
								tier2: '6 sonic damage; M , [average], weakened (save ends)',
								tier3: '10 sonic damage; M , [average], weakened and bleeding (save ends)'
							})
						),
						FactoryLogic.createAbilitySectionText('The soul of any creature killed by this ability is dragged to Hell.')
					]
				})
			}),
			FactoryLogic.feature.create({
				id: 'title-maestro-3',
				name: 'Music of the Spheres',
				description: 'As a main action, you sing or play a note as delicate and sharp as glass—and just as easily shattered. Until the start of your next turn, whenever a creature within 10 squares makes a strike, they take 8 sonic damage. Whenever you make a strike during that same period, you also take 8 sonic damage.'
			})
		],
		selectedFeatureID: ''
	};

	static masterCrafter: Title = {
		id: 'title-master-crafter',
		name: 'Master Crafter',
		description: '“The sword Vanartha has been remade, mightier now than on the day it was forged.”',
		echelon: 3,
		prerequisites: 'You complete a downtime project to imbue armor, an implement, or a weapon with a 9th-level enhancement.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-master-crafter-1',
				name: 'Masterpiece',
				description: 'The armor, implement, or weapon can be imbued a fourth time, with any enhancement the item qualifies for.'
			}),
			FactoryLogic.feature.create({
				id: 'title-master-crafter-2',
				name: 'Research Dividends',
				description: 'You gain the item prerequisite for an armor, implement, or weapon enhancement of your choice. Additionally, you learn the project source language for that enhancement.'
			}),
			FactoryLogic.feature.create({
				id: 'title-master-crafter-3',
				name: 'Skilled Hands',
				description: 'You have a skill from the crafting skill group that would have been used during the creation of the prerequisite item. If you already have that skill, you instead gain an edge on tests made using the skill. Additionally, you gain a second skill of your choice from the crafting skill group.'
			}),
			FactoryLogic.feature.create({
				id: 'title-master-crafter-4',
				name: 'Strong Hands Make Light Work',
				description: 'Whenever you make a project roll, you can use Might as the project roll characteristic.'
			})
		],
		selectedFeatureID: ''
	};

	static noble: Title = {
		id: 'title-noble',
		name: 'Noble',
		description: '“Technically, I’m called Lord Morninghill these days. I did a little favor for Duke Kenway at the Battle of Black Forest.”',
		echelon: 3,
		prerequisites: 'A monarch or important noble grants you a noble rank.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-noble-1',
				name: 'I Know How to Talk to These People',
				description: 'You gain an edge on Presence tests made to interact with royals, nobles, and their feudal followers, provided they are aware of your noble rank.'
			}),
			FactoryLogic.feature.create({
				id: 'title-noble-2',
				name: 'Noble Splendor',
				description: 'You earn 1 Renown and 1 Wealth.'
			}),
			FactoryLogic.feature.create({
				id: 'title-noble-3',
				name: 'Retinue',
				description: 'The number of followers you can recruit increases by two.'
			}),
			FactoryLogic.feature.create({
				id: 'title-noble-4',
				name: 'Special',
				description: 'If you take this title, you might occasionally be called upon to perform duties for the person who granted your noble rank.'
			})
		],
		selectedFeatureID: ''
	};

	static planarVoyager: Title = {
		id: 'title-planar-voyager',
		name: 'Planar Voyager',
		description: '“I’ve seen skywhales floating above the seas of Primordius. I’ve seen star freighters dancing around the moons of Axiom. So I guess you’re right, I’m not from around these parts.”',
		echelon: 3,
		prerequisites: 'You voyage in strange vehicles on different worlds.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-planar-voyager-1',
				name: 'Prismacore Eyes',
				description: 'Exposure to prismacore has given your eyes a mirrorlike sheen. You have psychic immunity 10, creatures can’t use magic or psionic abilities or other effects to determine your location or read your thoughts unless you allow them to, and you gain a +3 bonus to stability against magic or psionic abilities.'
			}),
			FactoryLogic.feature.create({
				id: 'title-planar-voyager-2',
				name: 'Stellar Knowledge',
				description: 'You gain the Mechanics skill. If you already have this skill, you instead gain an edge on tests made using the skill. Additionally, you gain the item prerequisite and project source for a psionic trinket.'
			}),
			FactoryLogic.feature.create({
				id: 'title-planar-voyager-3',
				name: 'Time Raider Training',
				description: 'You gain 2 ancestry points to spend on purchased time raider ancestry traits.'
			})
		],
		selectedFeatureID: ''
	};

	static scarred: Title = {
		id: 'title-scarred',
		name: 'Scarred',
		description: '“Last time we fought, I gave you a little token to remember me by … now it appears you need another reminder of my power.”',
		echelon: 3,
		prerequisites: 'An enemy leader or solo creature reduces you to 0 Stamina.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-scarred-1',
				name: 'Effect',
				description: 'You gain a visible scar in a location of your choice. Additionally, your Stamina maximum increases by 20, and the creature who scarred you takes a bane on abilities against you.'
			}),
			FactoryLogic.feature.create({
				id: 'title-scarred-2',
				name: 'Special',
				description: 'You can gain this title multiple times. The second and each subsequent time that you gain it, your Stamima maximum doesn’t increase.'
			})
		],
		selectedFeatureID: ''
	};

	static siegeBreaker: Title = {
		id: 'title-siege-breaker',
		name: 'Siege Breaker',
		description: '“Best way to deal with a castle siege? Be on the outside.”',
		echelon: 3,
		prerequisites: 'You have the Battlefield Commander title, and you lead the defense of a settlement or fortification.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-siege-breaker-1',
				name: 'Death From Above',
				description: 'When you gain an edge on an ability due to high ground, the ability gains a +8 damage bonus.'
			}),
			FactoryLogic.feature.create({
				id: 'title-siege-breaker-2',
				name: 'Hold the Line',
				description: 'While you’re within 5 squares of an ally, you and each ally within 5 squares of you gains a +3 bonus to stability.'
			}),
			FactoryLogic.feature.create({
				id: 'title-siege-breaker-3',
				name: 'Last Defender',
				description: 'Whenever an ally within 5 squares is reduced to 0 Stamina, you gain temporary Stamina equal to the ally’s level (or 1 if they have no level). If you already have temporary Stamina granted by this title, you increase your temporary Stamina by the amount you would have gained.'
			})
		],
		selectedFeatureID: ''
	};

	static teacher: Title = {
		id: 'title-teacher',
		name: 'Teacher',
		description: '“Someday, I’ll understand how peeling these carrots for dinner relates to my elementalist training.”',
		echelon: 3,
		prerequisites: 'You train or command at least three lower-level members of your class.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-teacher-1',
				name: 'Effect',
				description: 'You can travel with a student who shares your class. The student has the statistics of a 1st-level member of your class and has the same skills as you, but doesn’t engage in combat. They can perform any out-of-combat tasks a 1st-level member of your class can perform. Whenever they make a test to assist you in a task, they can’t obtain less than a tier 2 outcome on the test.'
			})
		],
		selectedFeatureID: ''
	};

	static championCompetitor: Title = {
		id: 'title-champion-competitor',
		name: 'Champion Competitor',
		description: '“Marduk uses the Beldoit Gambit! Avanna counters with the Iron Defense and goes on the attack! Marduk’s last tower is knocked down! And just like that, we have a new … world … champion!”',
		echelon: 4,
		prerequisites: 'You beat the best in the world at a game or sport.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-champion-competitor-1',
				name: 'Best of the Best',
				description: 'A characteristic used during the competition increases by 1 (to a maximum of 6). Choose a skill you used during the competition. You gain a +4 bonus to tests made using that skill instead of a +2 bonus.'
			}),
			FactoryLogic.feature.create({
				id: 'title-champion-competitor-2',
				name: 'Glory and Riches',
				description: 'A characteristic used during the competition increases by 1 (to a maximum of 6). You earn 2 Renown and 1 Wealth.'
			}),
			FactoryLogic.feature.create({
				id: 'title-champion-competitor-3',
				name: 'I’ll Just Take the Prize',
				description: 'A characteristic used during the competition increases by 1 (to a maximum of 6). You gain a trinket or leveled treasure of the Director’s choice.'
			})
		],
		selectedFeatureID: ''
	};

	static demigod: Title = {
		id: 'title-demigod',
		name: 'Demigod',
		description: '“The ritual is complete. I feel your power flow through me. I am become a god! Ah-ha-ha-ha-ha!”',
		echelon: 4,
		prerequisites: 'You have the Godsworn title, and hundreds of worshipful mortals complete a divine ritual in your name.',
		features: [
			FactoryLogic.feature.createMultiple({
				id: 'title-demigod-1',
				name: 'Demigod',
				features: [
					FactoryLogic.feature.create({
						id: 'title-demigod-1a',
						name: 'Immortal Excellence',
						description: 'A characteristic of your choice increases by 1 (to a maximum of 6).'
					}),
					FactoryLogic.feature.create({
						id: 'title-demigod-1b',
						name: 'Longevity',
						description: 'Your natural lifespan doubles and you can appear to be any age.'
					}),
					FactoryLogic.feature.create({
						id: 'title-demigod-1c',
						name: 'Worshippers',
						description: 'You magically hear prayers directed to you.'
					}),
					FactoryLogic.feature.createChoice({
						id: 'title-demigod-1d',
						name: 'Option',
						options: [
							{
								feature: FactoryLogic.feature.create({
									id: 'title-demigod-1da',
									name: 'Acolytes',
									description: 'The number of followers you can recruit increases by two.'
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.create({
									id: 'title-demigod-1db',
									name: 'Divine Weapons',
									description: 'Whenever you use a damage-dealing weapon ability, that ability can deal corruption or holy damage instead of its usual damage type.'
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.create({
									id: 'title-demigod-1dc',
									name: 'Missionaries',
									description: 'You earn 2 Renown.'
								}),
								value: 1
							}
						]
					})
				]
			})
		],
		selectedFeatureID: ''
	};

	static enlightened: Title = {
		id: 'title-enlightened',
		name: 'Enlightened',
		description: '“Don’t you see? This world that seems so real to you is nothing but a game, and all the people merely pieces!”',
		echelon: 4,
		prerequisites: 'You learn a cosmic truth that alters your understanding of reality.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-enlightened-1',
				name: 'Cosmic Revelation',
				description: 'Your choice of your Reason or Intuition increases by 1 (to a maximum of 6). When you make a test with a skill from the lore skill group and obtain a tier 1 or tier 2 outcome, you can instead obtain a tier 3 outcome. Once you use this benefit, you can’t use it again until you earn 1 or more Victories.'
			}),
			FactoryLogic.feature.create({
				id: 'title-enlightened-2',
				name: 'Longevity',
				description: 'Your choice of your Reason or Intuition increases by 1 (to a maximum of 6). Whenever you spend a Recovery, you can end one condition on yourself.'
			}),
			FactoryLogic.feature.create({
				id: 'title-enlightened-3',
				name: 'Worshippers',
				description: 'Your choice of your Reason or Intuition increases by 1 (to a maximum of 6). You can reach behind the curtain and alter reality. At the start of combat, choose yourself or any creature within 5 squares. The chosen target must move up to their speed to a space you choose, but can’t enter damaging terrain or terrain that could impose a condition on them. The target doesn’t appear to move or teleport to that space—they are simply there. No one but you has any memory of the target’s previous position.'
			})
		],
		selectedFeatureID: ''
	};

	static forsaken: Title = {
		id: 'title-forsaken',
		name: 'Forsaken',
		description: '“The quest is done, the enemy is defeated, and the Blade of a Thousand Years has passed from our hands. What do we do with the rest of our lives?”',
		echelon: 4,
		prerequisites: 'Your party loses, destroys, or otherwise parts with an artifact.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-forsaken-1',
				name: 'Brief Reunion',
				description: 'A characteristic of your choice increases by 1 (to a maximum of 6). While you’re winded, you can use a maneuver to summon the artifact to your hand. It disappears at the end of your next turn. Once you use this benefit, you can’t use it again until you earn 1 or more Victories.'
			}),
			FactoryLogic.feature.create({
				id: 'title-forsaken-2',
				name: 'Perfect Protection',
				description: 'A characteristic of your choice increases by 1 (to a maximum of 6). The Director chooses a damage type that is dealt by or thematically related to the artifact—for instance, holy for the Blade of a Thousand Years, psychic for the Encepter, or corruption for the Mortal Coil. You have immunity all to the chosen damage type.'
			}),
			FactoryLogic.feature.create({
				id: 'title-forsaken-3',
				name: 'Poor Compensation',
				description: 'A characteristic of your choice increases by 1 (to a maximum of 6). Instead of disappearing or otherwise departing, the artifact turns into a trinket or leveled treasure of the Director’s choice that has the same approximate shape as the lost item—for instance, any magic sword for the Blade of a Thousand Years, any implement for the Encepter, or a Thief of Joy or any other torque for the Mortal Coil.'
			})
		],
		selectedFeatureID: ''
	};

	static monarch: Title = {
		id: 'title-monarch',
		name: 'Monarch',
		description: '“The tyrant is dead! Long live the new king!”',
		echelon: 4,
		prerequisites: 'You or a member of your party becomes the monarch of a nation.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-monarch-1',
				name: 'Crown Jewels',
				description: 'Inhabitants of your nation must obey your lawful orders or suffer the consequences. Your choice of your Might or Presence increases by 1 (to a maximum of 6). You gain one of your nation’s treasures—a trinket of the Director’s choice.'
			}),
			FactoryLogic.feature.create({
				id: 'title-monarch-2',
				name: 'Royal Fame',
				description: 'Inhabitants of your nation must obey your lawful orders or suffer the consequences. Your choice of your Might or Presence increases by 1 (to a maximum of 6). You earn 2 Renown.'
			}),
			FactoryLogic.feature.create({
				id: 'title-monarch-3',
				name: 'Royal Retinue',
				description: 'Inhabitants of your nation must obey your lawful orders or suffer the consequences. Your choice of your Might or Presence increases by 1 (to a maximum of 6). The number of followers you can recruit increases by 2.'
			}),
			FactoryLogic.feature.create({
				id: 'title-monarch-4',
				name: 'Royal Wealth',
				description: 'Inhabitants of your nation must obey your lawful orders or suffer the consequences. Your choice of your Might or Presence increases by 1 (to a maximum of 6). You earn 2 Wealth.'
			})
		],
		selectedFeatureID: ''
	};

	static peaceBringer: Title = {
		id: 'title-peace-bringer',
		name: 'Peace Bringer',
		description: '“There goes Diana, peace bringer. She has won many a victory with her sword, but her greatest deed was convincing two nations to stop fighting.”',
		echelon: 4,
		prerequisites: 'You conduct a successful negotiation on which the fate of a nation or a world stands.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-peace-bringer-1',
				name: 'Calm Heads Prevail',
				description: 'Your choice of your Reason or Presence increases by 1 (to a maximum of 6). When you make a test to stop combat and start a negotiation, you always obtain a tier 3 outcome.'
			}),
			FactoryLogic.feature.create({
				id: 'title-peace-bringer-2',
				name: 'Drop Your Sword',
				description: 'Your choice of your Reason or Presence increases by 1 (to a maximum of 6). When you succeed on a test using the Intimidate skill, you can cause affected creatures to drop any items they are holding.'
			}),
			FactoryLogic.feature.create({
				id: 'title-peace-bringer-3',
				name: 'Hear Me Out',
				description: 'Your choice of your Reason or Presence increases by 1 (to a maximum of 6). While you are present in a negotiation, an NPC’s starting patience increases by 3 (to a maximum of 5).'
			}),
			FactoryLogic.feature.create({
				id: 'title-peace-bringer-4',
				name: 'Many Paths to Peace',
				description: 'Your choice of your Reason or Presence increases by 1 (to a maximum of 6). When you make a test with a skill from the interpersonal skill group, you can use any characteristic of your choice for the test.'
			})
		],
		selectedFeatureID: ''
	};

	static theoreticalWarrior: Title = {
		id: 'title-theoretical-warrior',
		name: 'Theoretical Warrior',
		description: '“I’ve read about this tactic in books—it looks fairly straightforward.”',
		echelon: 4,
		prerequisites: 'You have the Master Librarian title, and you complete a Learn From a Master project with a project goal of 1,000.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-theoretical-warrior-1',
				name: 'Effect',
				description: 'Your choice of your Reason or Intuition increases by 1 (to a maximum of 6). Additionally, choose a heroic ability belonging to any class. You gain this heroic ability, which can be paid for using the Heroic Resource of your class. You can’t use a heroic ability that requires a class feature you don’t have.'
			})
		],
		selectedFeatureID: ''
	};

	static tireless: Title = {
		id: 'title-tireless',
		name: 'Tireless',
		description: '“To reach Giant’s Foot by dawn, we’ll have to run every step of the way. Let’s get moving.”',
		echelon: 4,
		prerequisites: 'You have the Unstoppable title, and you make or assist on a test as part of a montage test that obtains a full success.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-tireless-1',
				name: 'Bounce Back Fast',
				description: 'Your choice of your Might or Agility increases by 1 (to a maximum of 6). Whenever you rest for 8 hours or more, you can gain the benefit of a respite. Once you use this benefit, you can’t use it again until you have taken a regular respite.'
			}),
			FactoryLogic.feature.create({
				id: 'title-tireless-2',
				name: 'Reserves of Strength',
				description: 'Your choice of your Might or Agility increases by 1 (to a maximum of 6). Your recovery value is half your Stamina.'
			}),
			FactoryLogic.feature.create({
				id: 'title-tireless-3',
				name: 'Undying',
				description: 'Your choice of your Might or Agility increases by 1 (to a maximum of 6). You can’t be affected by the bleeding condition.'
			})
		],
		selectedFeatureID: ''
	};

	static unchained: Title = {
		id: 'title-unchained',
		name: 'Unchained',
		description: '“I’ll never get away with it? My dear, I already have.”',
		echelon: 4,
		prerequisites: 'You have the Heist Hero title, and you have stolen a precious object or escaped from captivity while evading guards of 8th level or higher.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-unchained-1',
				name: 'Bye-Bye',
				description: 'Your choice of your Might or Agility increases by 1 (to a maximum of 6). You can use a maneuver to teleport yourself and each willing ally within 5 squares of you to new positions within 10 squares of your original starting point. Once you use this benefit, you can’t use it again until you earn 1 or more Victories.'
			}),
			FactoryLogic.feature.create({
				id: 'title-unchained-2',
				name: 'Laughs at Locks',
				description: 'Your choice of your Might or Agility increases by 1 (to a maximum of 6). Whenever you make a test to open a lock or break a restraint, you don’t need any tools and you automatically obtain a tier 3 outcome.'
			}),
			FactoryLogic.feature.create({
				id: 'title-unchained-3',
				name: 'Slippery',
				description: 'Your choice of your Might or Agility increases by 1 (to a maximum of 6). You can’t be grabbed against your will.'
			})
		],
		selectedFeatureID: ''
	};

	// Summoner titles

	static safeguarded: Title = {
		id: 'title-safeguarded',
		name: 'Safeguarded',
		description: 'They risk their lives for me because I risk my life for theirs. This fight belongs to all of us!',
		echelon: 1,
		prerequisites: 'You earn a noble rank or earn the favor of a knight’s guild.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-safeguarded-1',
				name: 'Effect',
				description: `
You start combat encounters with a squad of five minions from the specific monster band or people you earned this title from.

Additionally, if you would take damage outside of a combat encounter, you can forgo one of the minions at the start of the next combat encounter to ignore the damage.`
			})
		],
		selectedFeatureID: ''
	};

	static summonerSuccessor: Title = {
		id: 'title-summoner-successor',
		name: 'Summoner Successor',
		description: 'When their leader fell, they started listening to me for some reason.',
		echelon: 2,
		prerequisites: 'You defeat a leader or solo creature with a Summon or Call Forth ability, such as a high elf ordinator.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-summoner-successor-1',
				name: 'Effect',
				description: `
Choose a signature minion from a summoner’s portfolio that shares a keyword with one of the creatures the summoner could summon. You can summon three of that minion into a single squad (up to a maximum of eight creatures) at the start of each of your turns in combat. The distance you can command them is equal to your ranged free strike distance. You also gain the Strike for Me triggered action, which now has the Psionic keyword.

Additionally, you can summon up to two of your signature minion while outside of combat to do simple tasks.`
			})
		],
		selectedFeatureID: ''
	};

	static ringleader: Title = {
		id: 'title-ringleader',
		name: 'Ringleader',
		description: 'Don’t worry. I’ve got a guy.',
		echelon: 3,
		prerequisites: 'You complete three downtime projects during the same respite with the help of followers or minions.',
		features: [
			FactoryLogic.feature.createMultiple({
				id: 'title-ringleader-1',
				features: [
					FactoryLogic.feature.create({
						id: 'title-ringleader-1a',
						name: 'Effect',
						description: 'You no longer need line of effect to give commands to any minions you can summon.'
					}),
					FactoryLogic.feature.createChoice({
						id: 'title-ringleader-1b',
						options: [
							{
								feature: FactoryLogic.feature.create({
									id: 'title-ringleader-1b-1',
									name: 'Stringpuller',
									description: 'While occupying a civilized area (such as a village, town, district, or city), you always have access to an extra follower native to the location. If the area is otherwise hostile to you, this follower is a spy in hiding who has any project points they earn halved.'
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.create({
									id: 'title-ringleader-1b-2',
									name: 'Networker',
									description: 'Your maximum follower count increases by 2.'
								}),
								value: 1
							},
							{
								feature: FactoryLogic.feature.create({
									id: 'title-ringleader-1b-3',
									name: 'For the Boss',
									description: 'Your followers gain a +3 bonus to project rolls that they make.'
								}),
								value: 1
							}
						]
					})
				]
			})
		],
		selectedFeatureID: ''
	};

	static delegator: Title = {
		id: 'title-delegator',
		name: 'Delegator',
		description: 'Your champion made a very compelling argument and have stepped in to take your place in battle.',
		echelon: 4,
		prerequisites: 'You are a summoner and you strike a deal with your portfolio’s champion.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-delegator-1',
				name: 'Effect',
				description: `
At the start of a combat encounter, you can choose to unsummon yourself into your portfolio’s native plane while your champion fights and summons monsters in your place. The champion uses your Stamina, Recoveries, abilities, and features (except for your Summoner Strikes and Summoner’s Kit). You can dismiss the champion and summon yourself back into the place you left at the end of an encounter.

If your champion would die while taking your place, you lose the ability to summon and unsummon yourself and any minions until you revive your champion as a respite activity.`
			})
		],
		selectedFeatureID: ''
	};

	static highSummoner: Title = {
		id: 'title-high-summoner',
		name: 'High Summoner of the Circle',
		description: 'As I was taught, so I pass on to you.',
		echelon: 4,
		prerequisites: 'You are a summoner, and you teach another person how to call forth two or more minions from your portfolio.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-high-summoner-1',
				name: 'Effect',
				description: `
Your minions cost one fewer essence to summon (minimum cost of 1 essence).

Additionally, you are considered a master that can be learned from using the Learn from a Master research project. Anyone that makes a project roll using you as the source gains a bonus to their roll equal to your Reason.`
			})
		],
		selectedFeatureID: ''
	};
}
