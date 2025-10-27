import { FactoryLogic } from '@/logic/factory-logic';
import { StatBlockIcon } from '@/enums/stat-block-icon';
import { ajax } from '@/data/monsters/ajax';
import { angulotl } from '@/data/monsters/angulotl';
import { animal } from '@/data/monsters/animal';
import { arixx } from '@/data/monsters/arixx';
import { ashenHoarder } from '@/data/monsters/ashen-hoarder';
import { basilisk } from '@/data/monsters/basilisk';
import { bredbeddle } from '@/data/monsters/bredbeddle';
import { bugbear } from '@/data/monsters/bugbear';
import { chimera } from '@/data/monsters/chimera';
import { civilian } from '@/data/monsters/civilian';
import { countRhodar } from '@/data/monsters/count-rhodar';
import { demon } from '@/data/monsters/demon';
import { devil } from '@/data/monsters/devil';
import { draconian } from '@/data/monsters/draconian';
import { dragonCrucible } from '@/data/monsters/dragon-crucible';
import { dragonGloom } from '@/data/monsters/dragon-gloom';
import { dragonMeteor } from '@/data/monsters/dragon-meteor';
import { dragonOmen } from '@/data/monsters/dragon-omen';
import { dragonThorn } from '@/data/monsters/dragon-thorn';
import { dwarf } from '@/data/monsters/dwarf';
import { elemental } from '@/data/monsters/elemental';
import { elfHigh } from '@/data/monsters/elf-high';
import { elfShadow } from '@/data/monsters/elf-shadow';
import { elfWode } from '@/data/monsters/elf-wode';
import { fossilCryptic } from '@/data/monsters/fossil-cryptic';
import { giant } from '@/data/monsters/giant';
import { gnoll } from '@/data/monsters/gnoll';
import { goblin } from '@/data/monsters/goblin';
import { griffon } from '@/data/monsters/griffon';
import { hag } from '@/data/monsters/hag';
import { hobgoblin } from '@/data/monsters/hobgoblin';
import { human } from '@/data/monsters/human';
import { kingfissureWorm } from '@/data/monsters/kingfissure-worm';
import { kobold } from '@/data/monsters/kobold';
import { lich } from '@/data/monsters/lich';
import { lightbender } from '@/data/monsters/lightbender';
import { lizardfolk } from '@/data/monsters/lizardfolk';
import { lordSyuul } from '@/data/monsters/lord-syuul';
import { manticore } from '@/data/monsters/manticore';
import { medusa } from '@/data/monsters/medusa';
import { minotaur } from '@/data/monsters/minotaur';
import { ogre } from '@/data/monsters/ogre';
import { olothec } from '@/data/monsters/olothec';
import { orc } from '@/data/monsters/orc';
import { radenwight } from '@/data/monsters/radenwight';
import { retainer } from '@/data/monsters/retainer';
import { rival } from '@/data/monsters/rival';
import { shamblingMound } from '@/data/monsters/shambling-mound';
import { timeRaider } from '@/data/monsters/time-raider';
import { troll } from '@/data/monsters/troll';
import { undead } from '@/data/monsters/undead';
import { valok } from '@/data/monsters/valok';
import { voicelessTalker } from '@/data/monsters/voiceless-talker';
import { warDog } from '@/data/monsters/wardog';
import { werewolf } from '@/data/monsters/werewolf';
import { wyvern } from '@/data/monsters/wyvern';
import { xorannox } from '@/data/monsters/xorannox';

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
	static civilian = civilian;
	static countRhodar = countRhodar;
	static demon = demon;
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
	static retainer = retainer;
	static rival = rival;
	static shamblingMound = shamblingMound;
	static timeRaider = timeRaider;
	static troll = troll;
	static undead = undead;
	static valok = valok;
	static voicelessTalker = voicelessTalker;
	static warDog = warDog;
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
			],
			icon: StatBlockIcon.Self
		}),
		FactoryLogic.feature.createMalice({
			id: 'malice-2',
			name: 'Malicious Strike',
			cost: 5,
			repeatable: true,
			sections: [
				'The monster pours all their animosity into their attack. Their next strike deals additional damage to one target equal to their highest characteristic. The damage increases by 1 for every additional malice spent on this feature (to a maximum total of three times their highest characteristic). This feature can’t be used two rounds in a row.'
			],
			icon: StatBlockIcon.Self
		})
	];
}
