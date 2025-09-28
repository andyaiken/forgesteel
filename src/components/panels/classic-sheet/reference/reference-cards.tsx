import { Markdown } from '../../../controls/markdown/markdown';
import { RulesItem } from '../../../../models/rules-item';
import { SheetFormatter } from '../../../../logic/classic-sheet/sheet-formatter';

import './reference-cards.scss';

interface Props {
	rule: RulesItem;
}

export const RulesReferenceCard = (props: Props) => {
	const rule = props.rule;
	const c = rule.label.toLocaleLowerCase().split(' ').join('-');
	return (
		<div className={`${c} extra-reference card`} key={c}>
			<h2>{rule.label}</h2>
			<Markdown text={SheetFormatter.enhanceMarkdown(rule.content)} />
		</div>
	);
};

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
			<p>
				<strong>Can’t Exceed Speed</strong>: A single move or other effect can never
				allow a creature to move more squares than their speed, unless the effect states
				otherwise. For example, a creature with speed 5 might have that speed reduced to
				2 by the slowed condition (see Conditions in Chapter 5: Classes). If an ally
				then targets them with an effect that allows them to move up to 3 squares, the
				creature can move only 2 squares because that’s their current speed.
			</p>
			<p>
				<strong>Can’t Cut Corners</strong>: A creature can’t move diagonally when
				doing so would involve passing through the corner of a wall or some other
				object that completely fills the corner between the creature’s space and
				the space they are moving to. This rule applies only to moving past objects,
				not moving past other creatures.
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
