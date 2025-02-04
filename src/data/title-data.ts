import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { FactoryLogic } from '../logic/factory-logic';
import { Title } from '../models/title';

export class TitleData {
	static ancientLoremaster: Title = {
		id: 'title-ancient-loremaster',
		name: 'Ancient Loremaster',
		description: '“It’s astonishing what you find in old books. Look at this, nearly complete schematics for a war automaton, gathering dust because nobody here reads Zaliac.”',
		echelon: 1,
		prerequisites: 'You find a trove of forgotten books.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-ancient-loremaster-1',
				name: 'Leverage',
				description: 'You learn a priceless secret. The Director chooses the type of person who would value this secret, usually a member of a particular faction, such as a Higaran noble, or a type of person, such as a fence of stolen goods. When negotiating with this type of person, you can offer this secret. If they accept, you instantly raise their interest by 3. You can only share this secret once.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ancient-loremaster-2',
				name: 'Rare Books',
				description: 'You add rare, ancient books to your collection. When you make a project roll for a research project, you roll an additional 1d6 for each dead language you know.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ancient-loremaster-3',
				name: 'Susurrus Codex',
				description: 'You find a sinister book that whispers advice in a voice no one else can hear. As long as you follow all the book’s advice, you gain an edge on Reason tests and a bane on Presence tests. You can stop following the book’s advice at any time, but the book won’t speak to you for the rest of the day.'
			})
		],
		selectedFeatureID: ''
	};

	static battleaxeDiplomat: Title = {
		id: 'title-battleaxe-diplomat',
		name: 'Battleaxe Diplomat',
		description: '“We seem to be equals in might and swordcraft. Perhaps we should bandy with words awhile instead.”',
		echelon: 1,
		prerequisites: 'You gain the friendship or alliance of a creature you once battled.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-battleaxe-diplomat-1',
				name: 'Iron Hand in Velvet Glove',
				description: 'The first time during a negotiation when you make a test that uses the Intimidate skill and don’t make an argument that appeals to the NPC’s pitfall, you don’t lower the NPC’s patience or interest no matter the outcome of the roll.'
			}),
			FactoryLogic.feature.create({
				id: 'title-battleaxe-diplomat-2',
				name: 'Truce!',
				description: 'You have a double edge on tests made to stop combat and start negotiation.'
			}),
			FactoryLogic.feature.create({
				id: 'title-battleaxe-diplomat-3',
				name: 'Warriors’ Understanding',
				description: 'You have an edge on Presence tests made to influence creatures who you fought against in combat encounters.'
			})
		],
		selectedFeatureID: ''
	};

	static brawler: Title = {
		id: 'title-brawler',
		name: 'Brawler',
		description: '“We won’t kill you. But you might wish we did.”',
		echelon: 1,
		prerequisites: 'You triumph in battle without killing any of your foes.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-brawler-1',
				name: 'Duck!',
				description: 'When an enemy strikes you while a second creature is flanking you, you can use a triggered action to redirect the strike against the second creature. You can’t use this benefit again until you gain a Victory.'
			}),
			FactoryLogic.feature.create({
				id: 'title-brawler-2',
				name: 'Furniture Fighter',
				description: 'When you use a weapon ability with an improvised weapon or a weapon that is not part of your kit, the ability still benefits from your kit’s melee weapon damage bonus.'
			}),
			FactoryLogic.feature.create({
				id: 'title-brawler-3',
				name: 'Headbutter',
				description: 'Your free strikes don’t take a bane while you are grappled or restrained.'
			}),
			FactoryLogic.feature.create({
				id: 'title-brawler-4',
				name: 'If I Wanted You Dead, You’d Be Dead',
				description: 'Now and in future fights, when you defeat foes without any killing, you gain an edge on tests during negotiations with them.'
			})
		],
		selectedFeatureID: ''
	};

	static cityRat: Title = {
		id: 'title-city-rat',
		name: 'City Rat',
		description: '“Stay out all night, visit the dives. Get in a fight, run from the cops. That’s the real city.”',
		echelon: 1,
		prerequisites: 'You have spent at least 5 respites in a metropolis.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-city-rat-1',
				name: 'Discerning Shopper',
				description: 'When looking for an item prerequisite for a crafting project, you can remember meeting someone who might have the item - or at least information about it.'
			}),
			FactoryLogic.feature.create({
				id: 'title-city-rat-2',
				name: 'One with the Crowd',
				description: 'You gain an edge on tests made to hide and sneak, provided you are using one or more creatures as cover.'
			}),
			FactoryLogic.feature.create({
				id: 'title-city-rat-3',
				name: 'Street Smart',
				description: 'While in a settlement, you never suffer penalties from being surprised.'
			})
		],
		selectedFeatureID: ''
	};

	static doomed: Title = {
		id: 'title-doomed',
		name: 'Doomed',
		description: '“I don’t know what it meant, but when I watched her die, I saw a vision. I watched her die, and saw my own death. Am I going mad?”',
		echelon: 1,
		prerequisites: 'You are not a Hakaan but have witnessed the death of a Hakaan.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-doomed-1',
				name: 'Doomed',
				description: 'You’re not destined for a meaningful death, but you still might achieve one. When you’re reduced to 0 Stamina but still conscious, you can choose to become doomed. If you do, you can’t regain Stamina, you automatically get tier 3 results on tests and power rolls, and you don’t die until your Stamina equals the negative of your maximum Stamina value. At the end of the encounter, you die.'
			})
		],
		selectedFeatureID: ''
	};

	static dwarfLegionnaire: Title = {
		id: 'title-dwarf-legionnaire',
		name: 'Dwarf Legionnaire',
		description: '“I have learned much. It may be your courage that inspires others. Watch your opponent’s shield as well as their sword. And above all, stand fast, and do not yield.”',
		echelon: 1,
		prerequisites: 'You fight alongside at least three dwarves.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-dwarf-legionnaire-1',
				name: 'Close Formation',
				description: 'Your stability increases by 2 while adjacent to at least two allies.'
			}),
			FactoryLogic.feature.create({
				id: 'title-dwarf-legionnaire-2',
				name: 'Rune of Alarm',
				description: 'You can spend 10 minutes to inscribe a magical eye-shaped rune on a surface. The rune sheds light for 2 squares. It is dispelled if it is activated or if you inscribe the rune elsewhere. The rune is activated when an enemy comes within 2 squares of the rune. When the rune is activated, you wake up if you are nonmagically asleep, and for 1 minute you can see through the rune as if you were in its square.'
			}),
			FactoryLogic.feature.create({
				id: 'title-dwarf-legionnaire-3',
				name: 'Stonemeld',
				description: 'While adjacent to a stone wall, you can use a maneuver to gain concealment. The concealment lasts until you leave the square or use an ability.'
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
				description: 'Choose a damage type to which the defeated monster had an immunity. You gain the Elementalist 1st-level Hurl Element feature, dealing the chosen damage type.'
			}),
			FactoryLogic.feature.create({
				id: 'title-elemental-dabbler-2',
				name: 'Elemental Immunity',
				description: 'Choose a damage type to which the defeated monster had an immunity. You gain immunity to the chosen damage type equal to your highest characteristic score.'
			}),
			FactoryLogic.feature.create({
				id: 'title-elemental-dabbler-3',
				name: 'Elemental Weapons',
				description: 'Choose a damage type to which the defeated monster had an immunity. When you use an ability that deals damage with no type, you can change that damage to damage of the chosen damage type.'
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

You can find a sage who can make up to three Reason tests to recall lore or project rolls for research projects on your behalf. The sage has a +5 bonus to these tests. Research project rolls take 10 minutes each and don’t need to be made during a respite.`
			}),
			FactoryLogic.feature.create({
				id: 'title-faction-member-2',
				name: 'Guild Faction',
				description: `
When you’re negotiating with a member of your faction, their starting Patience increases by 2, up to a maximum of 5.

You can find an expert craftsperson who can make up to three project rolls for crafting projects on your behalf. The craftsperson has a +5 bonus to these tests. These project rolls take 10 minutes each and don’t need to be made during a respite.`
			}),
			FactoryLogic.feature.create({
				id: 'title-faction-member-3',
				name: 'Martial Faction',
				description: `
When you’re negotiating with a member of your faction, their starting Patience increases by 2, up to a maximum of 5.

You can recruit up to three minions with levels no greater than your own, of a type appropriate for the faction (such as human guards`
			}),
			FactoryLogic.feature.create({
				id: 'title-faction-member-4',
				name: 'Spy Faction',
				description: `
When you’re negotiating with a member of your faction, their starting Patience increases by 2, up to a maximum of 5.

You can find an agent who can provide you with three pieces of information about a settlement you’re in, such as the location of a hidden person, a secret entrance into a guarded area, or the negotiation ideal or pitfall of an important person.`
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
				description: 'When you finish a respite while in a community you have saved, the party gains a hero token. This hero token disappears at the end of your next respite if it hasn’t been used.'
			}),
			FactoryLogic.feature.create({
				id: 'title-local-hero-2',
				name: 'Easy Marks',
				description: 'You have an edge on tests made with skills from the interpersonal and intrigue skill groups when influencing members of a community that you have saved.'
			}),
			FactoryLogic.feature.create({
				id: 'title-local-hero-3',
				name: 'Local Fame',
				description: 'Your Renown score increases by 1.'
			})
		],
		selectedFeatureID: ''
	};

	static mageHunter: Title = {
		id: 'title-mage-hunter',
		name: 'Mage Hunter',
		description: '“Their power is dangerous. Unnatural. Someone needs to do something.”',
		echelon: 1,
		prerequisites: 'You defeat three leaders or solo monsters who could each use at least one ability with the Magic keyword.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-mage-hunter-1',
				name: 'Arcane Dampening',
				description: 'Your characteristic scores are considered 1 higher when resisting potencies from magic abilities.'
			}),
			FactoryLogic.feature.create({
				id: 'title-mage-hunter-2',
				name: 'Oh No You Don’t!',
				description: 'When an adjacent creature uses an ability with the Magic keyword, you can make a free strike against them as a triggered action.'
			}),
			FactoryLogic.feature.create({
				id: 'title-mage-hunter-3',
				name: 'Stink of Magic',
				description: 'As a maneuver, you can open your senses to the residue of magic. Until the end of your next turn, you are aware whether each creature within 5 squares of you is an undead, construct, or creature from another plane of existence, and whether they have used an ability with the Magic keyword in the past hour. Additionally, you never suffer the penalties of being surprised by undead, constructs, or creatures from another plane of existence.'
			})
		],
		selectedFeatureID: ''
	};

	static marshal: Title = {
		id: 'title-marshal',
		name: 'Marshal',
		description: '“I said you had 24 hours to leave town. That was… what, about 24 hours ago?”',
		echelon: 1,
		prerequisites: 'You join an organization, such as the Far Mariners, that hunts criminals, or you are deputized to act for the local authorities.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-marshal-1',
				name: 'I Guess It’s the Hard Way',
				description: 'When a combat begins and you are not surprised, the first time you take damage before your turn you halve that damage.'
			}),
			FactoryLogic.feature.create({
				id: 'title-marshal-2',
				name: 'Heedless Pursuer',
				description: 'Once on your turn, you can spend 1d6 stamina as a free maneuver. If you do so, you ignore difficult terrain and the length of your jumps increases by 1 square until the end of your turn.'
			}),
			FactoryLogic.feature.create({
				id: 'title-marshal-3',
				name: 'Silver Shield',
				description: 'You have a badge granted to you by your organization. While you are wearing it, you gain the Divine Interdiction feature from the My Life for Yours class. When you use this feature in this way, you can’t spend wrath unless you have the Wrath class feature.'
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
		prerequisites: 'You defeat a leader or solo monster with a Reason score of –2 or lower, such as an ankheg.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-monster-bane-1',
				name: 'Beast Bane',
				description: 'When a creature with the Animal keyword uses a strike against you, the strike takes a bane.'
			}),
			FactoryLogic.feature.create({
				id: 'title-monster-bane-2',
				name: 'Monster Whisperer',
				description: 'You gain an edge on tests made to calm or tame non-sapient creatures.'
			}),
			FactoryLogic.feature.create({
				id: 'title-monster-bane-3',
				name: 'Monster Trophy',
				description: 'You decorate your equipment with a trophy from a monster. While the trophy is visible, you gain an edge on tests made to intimidate sapient creatures.'
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

Additionally, the faction is a good source of information. The Director chooses a skill from the crafting or lore skill groups appropriate to the faction, such as the Criminal Underworld skill for an outlaw gang, the Blacksmith skill for a blacksmith’s guild, or the Society skill for a noble house. While in a settlement with the faction, you gain this skill if you don’t already have it. If you already have the skill, they gain an edge on tests made with the skill.`
			})
		],
		selectedFeatureID: ''
	};

	static presumedDead: Title = {
		id: 'title-presumed-dead',
		name: 'Presumed Dead',
		description: '“But… you’re dead. We went to your funeral.”',
		echelon: 1,
		prerequisites: 'You die in a way that prevents your body from being recovered or examined (for instance, you fall off a cliff).',
		features: [
			FactoryLogic.feature.create({
				id: 'title-presumed-dead-1',
				name: 'Presumed Dead',
				description: `
While it may appear that you died, in fact you did not. You regain 1 Stamina and can spend one or more Recoveries. In addition, you gain a 1st-echelon trinket of the Director’s choice.

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
		prerequisites: 'You defeat a leader or solo monster that is 1S or smaller, such as a goblin monarch.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-ratcatcher-1',
				name: 'Death From Above',
				description: 'You gain a +3 damage bonus to strikes against creatures whose size is smaller than yours.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ratcatcher-2',
				name: 'Everybody Move!',
				description: 'When you use the Knockback maneuver, you can use it on one additional creature of your size or two additional smaller creatures.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-ratcatcher-3',
					name: 'Come Out to Play',
					description: 'Come out to play-yay!',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
					target: 'All enemies hidden from you',
					cost: 1,
					effect: 'Each target is P < [average] taunted (EoT). You know the locations of creatures taunted in this way.'
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
				description: 'You must fight to the death for your captors’ amusement. Your intended opponents wield or guard a trinket or leveled item, which you can earn if you are victorious.'
			}),
			FactoryLogic.feature.create({
				id: 'title-saved-for-a-worse-fate-2',
				name: 'Prey',
				description: 'Your captors plan to release you and hunt you down, but it’s no fun unless you offer a challenge. Each of you is given medicine which raises your Speed and your number of Recoveries by 2. This benefit lasts until your next Respite.'
			}),
			FactoryLogic.feature.create({
				id: 'title-saved-for-a-worse-fate-3',
				name: 'Sacrifices',
				description: 'You are to be dropped in a volcano, fed to a sacred monster, abandoned in a desert, or otherwise sacrificed to a higher power. You are bedecked with holy jewelry. Each hero gains 1 Wealth.'
			}),
			FactoryLogic.feature.create({
				id: 'title-saved-for-a-worse-fate-4',
				name: 'Saviors',
				description: 'Your captors fear an even stronger foe. They want you to defeat this enemy for them. You can keep any treasure you find while doing so.'
			})
		],
		selectedFeatureID: ''
	};

	static shipCaptain: Title = {
		id: 'title-ship-captain',
		name: 'Ship Captain',
		description: '“Up anchor, shipmates, ’tisn’t gold but glory we seek!”',
		echelon: 1,
		prerequisites: 'You acquire a ship, airship, or similar vessel.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-ship-captain-1',
				name: 'Deep Sea Diver',
				description: 'Your movement gains the Swim keyword.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ship-captain-2',
				name: 'Ship Speaker',
				description: 'You magically know any of your ships’ locations even while not aboard. You can telepathically speak to anyone on board the ship who understands a language, and they can respond, no matter your distance from the ship.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ship-captain-3',
				name: 'Signal Flags',
				description: 'While aboard a ship, you can communicate with and conduct negotiations with another ship up to 5 miles away, as long as you can both see each other. You have an edge on Presence tests made while negotiating in this way.'
			}),
			FactoryLogic.feature.create({
				id: 'title-ship-captain-4',
				name: 'Trained Crewmember',
				description: 'You gain an edge on tests made to handle sea or air vessels.'
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
			FactoryLogic.feature.create({
				id: 'title-troupe-tactics-1',
				name: 'Flying Circus',
				description: 'At any time during a willing adjacent ally’s turn, you can use a triggered action to push them up to 2 squares if their size is the same as yours, or 4 squares if they are smaller. If this push causes the creature to fall, they can use their action or maneuver before they fall to reduce the height of the fall by 2.'
			}),
			FactoryLogic.feature.create({
				id: 'title-troupe-tactics-2',
				name: 'Spotlight',
				description: 'You magically cause a creature within 10 squares to shed light for 5 squares. The light lasts for 1 minute, until the creature is more than 10 squares away from you, or until you dismiss the effect (no action required). While illuminated, a creature can’t sneak or hide, has a bane on tests to perform an action secretly, and has an edge on tests made with the Lead, Music, and Perform skills.'
			}),
			FactoryLogic.feature.create({
				id: 'title-troupe-tactics-3',
				name: 'Supporting Player',
				description: 'You gain an edge on group tests using Presence and on tests made to assist another creature with a Presence test.'
			}),
			FactoryLogic.feature.create({
				id: 'title-troupe-tactics-4',
				name: 'Work the Crowd',
				description: 'While one of your allies is playing music or performing, you gain an edge on tests made to hide, sneak, conceal objects, or pick pockets.'
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
				description: 'You are considered to have 2 higher Renown when negotiating with criminals.'
			}),
			FactoryLogic.feature.create({
				id: 'title-wanted-dead-or-alive-2',
				name: 'Minion Mover',
				description: 'When you make a melee strike that targets a minion and at least one more minion is within distance of the attack, the attack gains a +3 bonus to damage.'
			}),
			FactoryLogic.feature.create({
				id: 'title-wanted-dead-or-alive-3',
				name: 'No, You’re Under Arrest!',
				description: 'You gain an edge on power rolls made to escape a grab. Additionally, when you make a successful test to escape manacles or bonds, as part of the same maneuver you can transfer the manacles or bonds to another person adjacent to you without them immediately noticing.'
			})
		],
		selectedFeatureID: ''
	};

	static zombieSlayer: Title = {
		id: 'title-zombie-slayer',
		name: 'Zombie Slayer',
		description: '“Why won’t you die! You’ve already done it once, youvshould be good at it by now!”',
		echelon: 1,
		prerequisites: 'You defeat a leader or solo monster with the Undead keyword, such as a ghost.',
		features: [
			FactoryLogic.feature.create({
				id: 'title-zombie-slayer-1',
				name: 'Blessed Weapons',
				description: 'When you use an ability that deals damage that has no type, you can deal holy damage instead.'
			}),
			FactoryLogic.feature.create({
				id: 'title-zombie-slayer-2',
				name: 'Divine Health',
				description: 'You gain corruption immunity equal to your highest characteristic score. You can’t be turned into an undead creature.'
			}),
			FactoryLogic.feature.createAbility({
				ability: FactoryLogic.createAbility({
					id: 'title-zombie-slayer-3',
					name: 'Holy Terror',
					description: 'Return to your grave!',
					type: FactoryLogic.type.createManeuver(),
					keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
					distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
					target: 'All enemies',
					cost: 3,
					effect: 'Each undead creature in the area takes holy damage equal to your Reason, Intuition, or Presence score (your choice) and is P < [strong] frightened (save ends).'
				})
			})
		],
		selectedFeatureID: ''
	};
}
