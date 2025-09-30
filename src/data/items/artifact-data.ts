import { AbilityKeyword } from '@/enums/ability-keyword';
import { FactoryLogic } from '@/logic/factory-logic';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { KitWeapon } from '@/enums/kit-weapon';

export class ArtifactData {
	static bladeOfAThousandYears: Item = FactoryLogic.createItem({
		id: 'item-blade-of-a-thousand-years',
		name: 'Blade of a Thousand Years',
		description: 'This fabled sword features a hilt made of glittering starlight, out of which its gleaming metal blade extends.',
		type: ItemType.Artifact,
		keywords: [ AbilityKeyword.Magic, KitWeapon.Light, KitWeapon.Medium, KitWeapon.Heavy ],
		effect: `
Whether drawn from a stone, gifted by a lake spirit, forged by a god, or used to kill one, there is a sword that exists outside of time and space. It is always where it needs to be precisely when it needs to be there--then is gone in a flash when the need for it has waned. The sword is depicted in art, song, and story across many living cultures—and even more frequently among cultures long buried, often after proving the deciding factor in a battle. It's been wielded by numerous heroes of legend, and even more who have slipped into the forgotten shadows of history.

Though its size and make are often debated, the sword is consistently described as having a crossguard made from pure starlight. When wielded, a brilliant metal blade springs forth from that hilt, suiting the holder's taste in weapons. Those who touch the blade are filled with the vigor and power of the heroes who have held it before.`,
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-blade-of-a-thousand-years-1',
						name: 'Suited for Victory',
						description: 'This sword takes on the size, shape, and make that the wielder wills into it. It can be a light, medium, or heavy weapon, and you can change its weapon type and appearance as a free maneuver. Any weapon ability that deals rolled damage using the Blade of a Thousand Years always deals holy damage. Any creature with weakness to holy damage who takes damage from this weapon is also frightened and weakened until the end of their next turn.'
					}),
					FactoryLogic.feature.createAbilityDamage({
						id: 'item-blade-of-a-thousand-years-1a',
						name: '',
						keywords: [ AbilityKeyword.Weapon, AbilityKeyword.Melee ],
						value: 5
					}),
					FactoryLogic.feature.create({
						id: 'item-blade-of-a-thousand-years-2',
						name: 'Rally the Righteous',
						description: 'This blade fills all around it with hope and courage. Each ally within 1 mile of the weapon gains an edge on weapon abilities and magic abilities, and has damage immunity 5. Additionally, each such creature\'s Stamina maximum increases by 15 and they gain a +15 bonus to Stamina when this ability first affects them.'
					}),
					FactoryLogic.feature.create({
						id: 'item-blade-of-a-thousand-years-3',
						name: 'Turn the Tide',
						description: 'Each enemy minion within 1 mile of the sword is dazed. Any enemy leader or solo creature in that area takes a bane on ability rolls.'
					}),
					FactoryLogic.feature.create({
						id: 'item-blade-of-a-thousand-years-4',
						name: 'Victory\'s Assurance',
						description: 'This weapon always appears on the eve before what will later come to be known as a historic battle. It disappears after 24 hours or when the battle is won, whichever comes first. By taking the blade, the wielder unwittingly enters into a pact with the weapon. If they don\'t secure victory against monumental odds or some great foe by the time the sword disappears, they are pulled into the sword, preventing any chance of resurrection, and forever dooming them to lend their strength to the heroes of other ages.'
					}),
					FactoryLogic.feature.create({
						id: 'item-blade-of-a-thousand-years-5',
						name: 'Soul of the Martyr',
						description: 'If the wielder dies while holding this blade, their soul is drawn into the starlight hilt, where it remains for the rest of time to prevent any chance of resurrection. The sword disappears, but the lingering feeling of hope that spreads from it remains. For the next hour, the effects of Rally the Righteous increase to provide a double edge on weapon abilities and magic abilities, damage immunity 10, an increase to Stamina maximum of 30, and a bonus to Stamina of +30.'
					})
				]
			}
		]
	});

	static encepter: Item = FactoryLogic.createItem({
		id: 'item-encepter',
		name: 'Encepter',
		description: 'A bejeweled scepter with a spiraling porcelain handle balances an orb of light above its crown.',
		type: ItemType.Artifact,
		keywords: [ AbilityKeyword.Magic ],
		effect: `
This scepter waits high in the sky, resting within an endlessly raging cyclone. It waits for the one who will unify all people under its light. It awaits its champion.

The Encepter is said to have first manifested in a young world doomed to apocalypse--unless every last inhabitant of that world could stand together. The scepter is said to impose either dominion or obliteration over any threat its light is drawn around. Today, it is most commonly known as a bad omen, and should the Encepter reveal itself, folk know that the world teeters on the brink of destruction. Whether any of the stories are true, few can say, for the only living eyes that have witnessed the Encepter belong to dragons deep in slumber.`,
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-encepter-1',
						name: 'Shining Presence',
						description: 'The one who wields the Encepter is always cast in a brilliant glow. Any power roll made by the wielder that uses Presence automatically achieves a tier 3 outcome, though the wielder can still roll in an attempt to score a critical success or critical hit.'
					}),
					FactoryLogic.feature.create({
						id: 'item-encepter-2',
						name: 'Champion\'s Lasso',
						description: 'As a free maneuver, the wielder of the scepter can trigger a glowing line of light that traces their path as they move, or can dismiss the glowing line. If the wielder crosses over this line, each creature and object of the wielder\'s choice enclosed inside the line and within 2 squares above and below it are considered lassoed by the Encepter. Creatures remain lassoed until the lasso is released or until a new line is drawn.'
					}),
					FactoryLogic.feature.create({
						id: 'item-encepter-3',
						name: 'Dominion',
						description: 'Each creature lassoed by the Encepter is restrained and can\'t teleport. A creature caught in midair while lassoed stays in place rather than falling.'
					}),
					FactoryLogic.feature.create({
						id: 'item-encepter-4',
						name: 'Obliteration',
						description: 'As a main action, the wielder raises the Encepter to the sky. Each target lassoed by the Encepter erupts in a prismatic burst of light, taking 10 psychic damage for each square horizontally encircled by the lasso. The lasso is then immediately released.'
					}),
					FactoryLogic.feature.create({
						id: 'item-encepter-5',
						name: 'At World\'s End',
						description: 'If the Encepter was not taken from its cyclonic resting place with the purpose of vanquishing a terrible peril, then a terrible peril emerges to threaten the world within 3 days of the scepter being taken.'
					})
				]
			}
		]
	});

	static mortalCoil: Item = FactoryLogic.createItem({
		id: 'item-mortal-coil',
		name: 'Mortal Coil',
		description: 'This floating helix of golden metal spins ever faster as it activates, crackling with crimson sparks.',
		type: ItemType.Artifact,
		keywords: [ AbilityKeyword.Psionic ],
		effect: `
Change is the engine of existence. Permanence begets stagnation. When the past refuses to relinquish control, a path must be cleared for the future. Energized by the flickering of minds and souls passing through the void, the Mortal Coil taps into the entropic potential inherent in every living creature to cast a shadow capable of felling even gods. For the true gift of life is death, and gifts are meant to be given.

Only one destined for death can contain the power of the Mortal Coil. A mortal creature who carries this artifact serves as its host, gaining an additional main action on each of their turns, aging at ten times the usual rate, and becoming unable to ever regain Stamina. A host with no natural maximum lifespan permanently reduces their Stamina maximum by 10 each year.

When the Mortal Coil is left unattended or is in the possession of a creature who is not mortal, it activates and can't be deactivated until a mortal creature becomes its host once more. While active, the artifact extends a penumbra of influence for 10 miles in every direction. Every creature in the penumbra is subject to the following effects.`,
		featuresByLevel: [
			{
				level: 1,
				features: [
					FactoryLogic.feature.create({
						id: 'item-mortal-coil-1',
						name: 'One Foot in the Grave',
						description: 'Any creature in the penumbra has damage weakness 2 and can\'t regain Stamina.'
					}),
					FactoryLogic.feature.create({
						id: 'item-mortal-coil-2',
						name: 'Get Busy Dyin\'',
						description: 'Each creature in the penumbra ages at 10 times the usual rate, and diseases and poisons affecting creatures in the penumbra run their course at 10 times their usual rate. A creature with no natural maximum lifespan permanently reduces their Stamina maximum by 10 each year. Each creature can undertake one additional respite activity during each respite.'
					}),
					FactoryLogic.feature.create({
						id: 'item-mortal-coil-3',
						name: 'If You Meet God on the Road, Kill Them',
						description: 'Every non-mortal entity in the penumbra is granted the gift of mortality. Previously immortal or invulnerable entities--from planar creatures to the gods themselves--can be killed while in the penumbra, though not necessarily easily. Any creature or entity who dies in the Mortal Coil\'s penumbra experiences perfect death. They are permanently, irrevocably dead, and no magic, psionics, or technology can restore them to life.'
					}),
					FactoryLogic.feature.create({
						id: 'item-mortal-coil-4',
						name: 'Perpetual Motion',
						description: 'If there are ever no creatures or entities within the Mortal Coil\'s penumbra, the radius of the penumbra doubles.'
					}),
					FactoryLogic.feature.create({
						id: 'item-mortal-coil-5',
						name: 'Beneath Contempt',
						description: 'Deities and their servants always overlook the Mortal Coil and its host--either unable to notice it, or not considering it a threat. If the artifact is somehow destroyed or unmade through godly power, it consumes a year of life from every humanoid in the manifold where it was destroyed, then reforms in a hidden place.'
					})
				]
			}
		]
	});
}
