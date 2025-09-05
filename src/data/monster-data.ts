import { FactoryLogic } from '../logic/factory-logic';
import { ajax } from './monsters/ajax';
import { angulotl } from './monsters/angulotl';
import { animal } from './monsters/animal';
import { arixx } from './monsters/arixx';
import { ashenHoarder } from './monsters/ashen-hoarder';
import { basilisk } from './monsters/basilisk';
import { bredbeddle } from './monsters/bredbeddle';
import { bugbear } from './monsters/bugbear';
import { chimera } from './monsters/chimera';
import { countRhodar } from './monsters/count-rhodar';
import { demon1st } from './monsters/demon-1st';
import { demon2nd } from './monsters/demon-2nd';
import { demon3rd } from './monsters/demon-3rd';
import { demon4th } from './monsters/demon-4th';
import { devil } from './monsters/devil';
import { draconian } from './monsters/draconian';
import { dragonCrucible } from './monsters/dragon-crucible';
import { dragonGloom } from './monsters/dragon-gloom';
import { dragonMeteor } from './monsters/dragon-meteor';
import { dragonOmen } from './monsters/dragon-omen';
import { dragonThorn } from './monsters/dragon-thorn';
import { dwarf } from './monsters/dwarf';
import { elemental } from './monsters/elemental';
import { elfHigh } from './monsters/elf-high';
import { elfShadow } from './monsters/elf-shadow';
import { elfWode } from './monsters/elf-wode';
import { fossilCryptic } from './monsters/fossil-cryptic';
import { giant } from './monsters/giant';
import { gnoll } from './monsters/gnoll';
import { goblin } from './monsters/goblin';
import { griffon } from './monsters/griffon';
import { hag } from './monsters/hag';
import { hobgoblin } from './monsters/hobgoblin';
import { human } from './monsters/human';
import { kingfissureWorm } from './monsters/kingfissure-worm';
import { kobold } from './monsters/kobold';
import { lich } from './monsters/lich';
import { lightbender } from './monsters/lightbender';
import { lizardfolk } from './monsters/lizardfolk';
import { lordSyuul } from './monsters/lord-syuul';
import { manticore } from './monsters/manticore';
import { medusa } from './monsters/medusa';
import { minotaur } from './monsters/minotaur';
import { ogre } from './monsters/ogre';
import { olothec } from './monsters/olothec';
import { orc } from './monsters/orc';
import { radenwight } from './monsters/radenwight';
import { shamblingMound } from './monsters/shambling-mound';
import { timeRaider } from './monsters/time-raider';
import { troll } from './monsters/troll';
import { undead1st } from './monsters/undead-1st';
import { undead2nd } from './monsters/undead-2nd';
import { undead3rd } from './monsters/undead-3rd';
import { undead4th } from './monsters/undead-4th';
import { valok } from './monsters/valok';
import { voicelessTalker } from './monsters/voiceless-talker';
import { warDog1st } from './monsters/wardog-1st';
import { warDog2nd } from './monsters/wardog-2nd';
import { warDog3rd } from './monsters/wardog-3rd';
import { warDog4th } from './monsters/wardog-4th';
import { werewolf } from './monsters/werewolf';
import { wyvern } from './monsters/wyvern';
import { xorannox } from './monsters/xorannox';

export class MonsterData {
	static ajax = ajax;
	static angulotl = angulotl;
	static animal = animal;
	static arixx = arixx;
	static ashenHoarder = ashenHoarder;
	static basilisk = basilisk;
	static bredbeddle = bredbeddle;
	static bugbear = bugbear;
	static chimera = chimera;
	static countRhodar = countRhodar;
	static demon1st = demon1st;
	static demon2nd = demon2nd;
	static demon3rd = demon3rd;
	static demon4th = demon4th;
	static devil = devil;
	static draconian = draconian;
	static dragonCrucible = dragonCrucible;
	static dragonGloom = dragonGloom;
	static dragonMeteor = dragonMeteor;
	static dragonOmen = dragonOmen;
	static dragonThorn = dragonThorn;
	static dwarf = dwarf;
	static elemental = elemental;
	static elfHigh = elfHigh;
	static elfShadow = elfShadow;
	static elfWode = elfWode;
	static fossilCryptic = fossilCryptic;
	static giant = giant;
	static gnoll = gnoll;
	static goblin = goblin;
	static griffon = griffon;
	static hag = hag;
	static hobgoblin = hobgoblin;
	static human = human;
	static kingfissureWorm = kingfissureWorm;
	static kobold = kobold;
	static lich = lich;
	static lightbender = lightbender;
	static lizardfolk = lizardfolk;
	static lordSyuul = lordSyuul;
	static manticore = manticore;
	static medusa = medusa;
	static minotaur = minotaur;
	static ogre = ogre;
	static olothec = olothec;
	static orc = orc;
	static radenwight = radenwight;
	static shamblingMound = shamblingMound;
	static timeRaider = timeRaider;
	static troll = troll;
	static undead1st = undead1st;
	static undead2nd = undead2nd;
	static undead3rd = undead3rd;
	static undead4th = undead4th;
	static valok = valok;
	static voicelessTalker = voicelessTalker;
	static warDog1st = warDog1st;
	static warDog2nd = warDog2nd;
	static warDog3rd = warDog3rd;
	static warDog4th = warDog4th;
	static werewolf = werewolf;
	static wyvern = wyvern;
	static xorannox = xorannox;

	static malice = [
		FactoryLogic.feature.createMalice({
			id: 'malice-1',
			name: 'Brutal Effectiveness',
			cost: 3,
			sections: [
				'The monster digs into the enemy’s weak spot. The next ability the monster uses with a potency has its potency increased by 1.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'malice-2',
			name: 'Malicious Strike',
			cost: 5,
			repeatable: true,
			sections: [
				'The monster pours all their animosity into their attack. Their next strike deals additional damage to one target equal to their highest characteristic. The damage increases by 1 for every additional malice spent on this feature (to a maximum total of three times their highest characteristic). This feature can’t be used two rounds in a row.'
			]
		})
	];
}
