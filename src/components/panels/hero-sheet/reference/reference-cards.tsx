import rollT1Icon from '../../../../assets/icons/power-roll-t1.svg';
import rollT2Icon from '../../../../assets/icons/power-roll-t2.svg';
import rollT3Icon from '../../../../assets/icons/power-roll-t3.svg';

import './reference-cards.scss';

export const TurnOptionsReferenceCard = () => {
	return (
		<div className='turn-reference extra-reference card'>
			<h2>Your Turn</h2>
			<p>Each creature can take a move action, a maneuver, and an action on their turn — in any order</p>
			<p>You can also take <strong>one triggered action per round</strong> when the trigger happens. There is no limit to the number of free triggered actions you can take.</p>
			<div className='actions-maneuvers'>
				<div className='move-actions'>
					<h5>Move Actions</h5>
					<ul>
						<li>Advance</li>
						<li>Disengage</li>
						<li>Ride</li>
					</ul>
				</div>
				<div className='main-actions'>
					<h5>Main Actions</h5>
					<ul>
						<li>Charge</li>
						<li>Defend</li>
						<li>Heal</li>
						<li>Free Strike</li>
						<li>Trade for Maneuver</li>
						<li>Trade for Move</li>
					</ul>
				</div>
				<div className='maneuvers'>
					<h5>Maneuvers</h5>
					<ul>
						<li>Aid Attack</li>
						<li>Catch Breath</li>
						<li>Claw Dirt</li>
						<li>Escape Grab</li>
						<li>Grab</li>
						<li>Hide</li>
						<li>Knockback</li>
						<li>Make or Assist Test</li>
						<li>Search for Hidden Creature</li>
						<li>Stand Up</li>
						<li>Use Consumable</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export const MainActionsReferenceCard = () => {
	return (
		<div className='extra-reference card'>
			<h2>Main Actions</h2>
			<p>Any creature can take the following main actions, in addition to those
				listed in their stats:
			</p>
			<ul className='actions'>
				<li>
					<strong>Charge:</strong> Move up to your speed in a straight line without shifting, and
					can then make a melee free strike or use an ability with the Charge
					keyword against a creature when you end your move.
				</li>
				<li>
					<strong>Defend:</strong> All ability power rolls made against you have a double bane
					until the start of your next turn. You gain no benefit from this action
					while another creature is taunted by you.
				</li>
				<li>
					<strong>Free Strike:</strong> You make a free strike.
				</li>
				<li>
					<strong>Heal:</strong> Choose an adjacent creature who can spend a Recovery or
					make a saving throw.
				</li>
				<li>
					<strong>Trade:</strong> You can convert your main action into a maneuver or move
					action, allowing you to take two maneuvers or move actions on your turn.
				</li>
			</ul>
		</div>
	);
};

export const MoveActionsReferenceCard = () => {
	return (
		<div className='extra-reference card'>
			<h2>Move Actions</h2>
			<p>Any creature can take the following move actions:</p>
			<ul className='actions'>
				<li>
					<strong>Advance:</strong> Move a number of squares up to your speed. You can break
					up this movement with your maneuver and action however you wish.
				</li>
				<li>
					<strong>Disengage:</strong> Shift 1 square.
				</li>
				<li>
					<strong>Ride:</strong> Cause a mount you are riding to take the Advance move action.
					A mount can only benefit from this once per round.
				</li>
			</ul>
		</div>
	);
};

export const ManeuversReferenceCard = () => {
	return (
		<div className='extra-reference card'>
			<h2>Maneuvers</h2>
			<p>Any creature can take the following maneuvers, in addition to those listed in their stats:</p>
			<ul className='actions'>
				<li>
					<strong>Aid Attack:</strong> Choose an adjacent enemy. The next ability power roll
					an ally makes against them before the start of your next turn has
					an edge.
				</li>
				<li>
					<strong>Catch Breath:</strong> Spend a Recovery.
				</li>
				<li>
					<strong>Claw Dirt:</strong> You use the Claw Dirt ability.
				</li>
				<li>
					<strong>Escape Grab:</strong> You use the Escape Grab ability while grabbed.
				</li>
				<li>
					<strong>Grab:</strong> You use the Grab ability.
				</li>
				<li>
					<strong>Hide:</strong> You become hidden from creatures who aren’t observing you
					while you have cover or concealment from them.
				</li>
				<li>
					<strong>Knockback:</strong> You use the Knockback ability.
				</li>
				<li>
					<strong>Make or Assist a Test:</strong> Making or assisting a test is a maneuver in combat.
				</li>
				<li>
					<strong>Search for Hidden Creatures:</strong> Attempt to locate creatures hidden from you.
				</li>
				<li>
					<strong>Stand Up:</strong> You stand up from prone, ending that condition.
					Alternatively, you can use this maneuver to make an adjacent prone
					creature stand up.
				</li>
				<li>
					<strong>Use Consumable:</strong> Unless otherwise noted in its description, you can use this
					maneuver to activate a consumable treasure. A creature can use this maneuver to administer a
					consumable treasure that benefits the user either to thelself or a willing adjacent creature.
				</li>
			</ul>
		</div>
	);
};

export const EdgesBanesReferenceCard = () => {
	return (
		<div className='extra-reference card'>
			<h2>Edges and Banes</h2>
			<p><strong>Edge:</strong> If you have a situational advantage (edge) on a power roll, the roll
				gains +2.
			</p>
			<p><strong>Double Edge:</strong> If you have two or more edges, the roll is one tier
				higher instead.
			</p>
			<p><strong>Bane:</strong> If you have a situational disadvantage (bane) on a power roll, the
				roll gains -2.
			</p>
			<p><strong>Double Bane:</strong> If you have two or more banes, the roll is one tier
				lower instead.
			</p>
			<ul>
				<li>If you have an edge and a bane or a double edge and a double bane,
					the roll is made normally without any edges or banes.
				</li>
				<li>If you have a double edge and a bane, the roll has one edge.</li>
				<li>If you have a double bane and an edge, the roll has one bane.</li>
			</ul>
		</div>
	);
};

export const ClimbSwimReferenceCard = () => {
	return (
		<div className='extra-reference card'>
			<h2>Climbing and Swimming</h2>
			<p>
				A creature who has “climb” in their speed entry, or who gains the temporary
				ability to automatically climb, can climb across vertical and horizontal surfaces
				at full speed. Likewise, a creature who has “swim” in their speed entry, or who
				gains the temporary ability to automatically swim, can swim in liquid at full speed.
			</p>
			<p>
				Creatures without those types of movement can still climb or swim when a rule
				allows them to move, but each square of climbing or swimming costs 2 squares
				of movement. If a surface is difficult to climb (for instance, a sheer cliff or
				ice-covered wall) or a liquid is hard to swim through (a raging river or whirlpool),
				the Director can call for a Might test. On a failure, a creature can’t climb or swim
				but wastes no movement in the attempt. The Director can also impose other consequences
				to failure, such as being caught in the spinning current of a whirlpool.
			</p>
		</div>
	);
};

export const JumpReferenceCard = () => {
	return (
		<div className='extra-reference card'>
			<h2>Jump</h2>
			<p>
				Whenever an effect allows you to move (including using the Advance move action), you
				can automatically long jump a number of squares up to your Might or Agility score
				(your choice; minimum 1 square) as part of that movement. The height of your jump
				is automatically 1 square as part of that movement.
			</p>
			<p>If you want to jump even longer or higher than your baseline jump allows, make a Might or Agility test:</p>
			<p><strong>Power Roll + Might or Agility</strong>:</p>
			<table className='power-roll'>
				<tbody>
					<tr>
						<td>
							<img src={rollT1Icon} alt='≤ 11' />
						</td>
						<td>You don’t jump any farther than your baseline jump allows.</td>
					</tr>
					<tr>
						<td><img src={rollT2Icon} alt='12 - 16' /></td>
						<td>You jump 1 square longer and higher than your baseline jump allows.</td>
					</tr>
					<tr>
						<td>
							<img src={rollT3Icon} alt='17+' />
						</td>
						<td>You jump 2 squares longer and higher than your baselinejump allows.</td>
					</tr>
				</tbody>
			</table>
			<p>
				You can’t jump farther or higher than the distance of the effect that allows you to move. You can’t
				jump out of difficult terrain or damaging terrain.
			</p>
		</div>
	);
};

export const ClimbCreaturesCard = () => {
	return (
		<div className='extra-reference card'>
			<h2>Climbing Other Creatures</h2>
			<p>
				You can attempt to climb a creature whose size is greater than yours. If
				the creature is willing, you can climb them without any trouble. If the
				creature is unwilling, you make the following test:
			</p>
			<p><strong>Power Roll + Might or Agility</strong>:</p>
			<table className='power-roll'>
				<tbody>
					<tr>
						<td>
							<img src={rollT1Icon} alt='≤ 11' />
						</td>
						<td>
							You fail to climb the creature, and they can make a free strike
							against you.
						</td>
					</tr>
					<tr>
						<td><img src={rollT2Icon} alt='12 - 16' /></td>
						<td>You fail to climb the creature.</td>
					</tr>
					<tr>
						<td>
							<img src={rollT3Icon} alt='17+' />
						</td>
						<td>You climb the creature.</td>
					</tr>
				</tbody>
			</table>
			<p>
				While you climb or ride a creature, you gain an edge on melee abilities
				used against them. The creature can use a maneuver to attempt to
				knock you off, forcing you to make the following test:
			</p>
			<table className='power-roll'>
				<tbody>
					<tr>
						<td>
							<img src={rollT1Icon} alt='≤ 11' />
						</td>
						<td>
							You fall off the creature into an unoccupied adjacent space of
							your choice, taking falling damage and landing prone as usual.
						</td>
					</tr>
					<tr>
						<td><img src={rollT2Icon} alt='12 - 16' /></td>
						<td>
							You slide down the creature into an unoccupied adjacent
							space of your choice and don’t land prone.
						</td>
					</tr>
					<tr>
						<td>
							<img src={rollT3Icon} alt='17+' />
						</td>
						<td>You continue to hold on to the creature.</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export const MovementReferenceCard = () => {
	return (
		<div className='extra-reference card'>
			<h2>Movement</h2>
			<p>
				All squares adjacent to your character cost 1 movement to move into. No,
				there’s no Pythagorean theorem on the grid. It’s a game, don’t overthink it.
			</p>
			<p>
				Your hero can move freely through an ally’s space. You can move through
				an enemy’s space, but that space is difficult terrain. You can’t
				stop moving in any other creature’s space, including to make a strike or use
				a main action or maneuver while in that space and then continuing your
				move, unless that creature’s size is two or more sizes greater or smaller
				than your own.
			</p>
			<p>
				At the Director’s discretion, you can be forced into the same space as
				another creature whose size is within 1 of yours, such as by falling down
				a narrow shaft with such a creature already at the bottom. When you are
				squeezed into the same space as another creature whose size is within 1 of
				yours, your ability rolls and tests take a bane.
			</p>
		</div>
	);
};

export const FallingReferenceCard = () => {
	return (
		<div className='extra-reference card'>
			<h2>Falling</h2>
			<p>
				When a creature falls 2 or more squares and lands on the ground, they
				take 2 damage for each square they fall (to a maximum of 50 damage)
				and land prone. A creature who falls can reduce the effective height
				of the fall by a number of squares equal to their Agility score (to a
				minimum of 0). Falling into liquid that is 1 square or more deep reduces
				the effective height of a fall by 4 squares (to a minimum of 0).
			</p>
			<p>
				Falling is not forced movement, but being force moved downward is
				considered falling. Movement from falling doesn’t
				provoke opportunity attacks.
			</p>
			<h3>Falling Onto Another Creature</h3>
			<p>
				A creature who falls and lands on another creature causes that creature
				to take the same damage from the fall. The falling creature then lands
				prone in the nearest unoccupied space of their choice. If the falling
				creature’s size is greater than the Might score of the creature they land
				on, that creature is knocked prone.
			</p>
		</div>
	);
};
