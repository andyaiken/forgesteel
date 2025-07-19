import { CraftingPerkData } from './perks/crafting';
import { ExplorationPerkData } from './perks/exploration';
import { InterpersonalPerkData } from './perks/interpersonal';
import { IntriguePerkData } from './perks/intrigue';
import { LorePerkData } from './perks/lore';
import { SupernaturalPerkData } from './perks/supernatural';

export class PerkData {
	static areaOfExpertise = CraftingPerkData.areaOfExpertise;
	static expertArtisan = CraftingPerkData.expertArtisan;
	static handy = CraftingPerkData.handy;
	static homesteader = CraftingPerkData.homesteader;
	static improvisationCreation = CraftingPerkData.improvisationCreation;
	static inspiredArtisan = CraftingPerkData.inspiredArtisan;
	static travellingArtisan = CraftingPerkData.travellingArtisan;

	static brawny = ExplorationPerkData.brawny;
	static camouflageHunter = ExplorationPerkData.camouflageHunter;
	static dangerSense = ExplorationPerkData.dangerSense;
	static friendCatapult = ExplorationPerkData.friendCatapult;
	static iveGotYou = ExplorationPerkData.iveGotYou;
	static monsterWhisperer = ExplorationPerkData.monsterWhisperer;
	static putYourBackIntoIt = ExplorationPerkData.putYourBackIntoIt;
	static survivalist = ExplorationPerkData.survivalist;
	static teamwork = ExplorationPerkData.teamwork;
	static teamLeader = ExplorationPerkData.teamLeader;
	static woodWise = ExplorationPerkData.woodWise;

	static charmingLiar = InterpersonalPerkData.charmingLiar;
	static cunningPlan = InterpersonalPerkData.cunningPlan;
	static dazzler = InterpersonalPerkData.dazzler;
	static engrossingMonologue = InterpersonalPerkData.engrossingMonologue;
	static fastNegotiator = InterpersonalPerkData.fastNegotiator;
	static harmonizer = InterpersonalPerkData.harmonizer;
	static lieDetector = InterpersonalPerkData.lieDetector;
	static openBook = InterpersonalPerkData.openBook;
	static pardonMyFriend = InterpersonalPerkData.pardonMyFriend;
	static persistent = InterpersonalPerkData.persistent;
	static powerPlayer = InterpersonalPerkData.powerPlayer;
	static soTellMe = InterpersonalPerkData.soTellMe;
	static spotTheTell = InterpersonalPerkData.spotTheTell;

	static criminalContacts = IntriguePerkData.criminalContacts;
	static forgettableFace = IntriguePerkData.forgettableFace;
	static gumUpTheWorks = IntriguePerkData.gumUpTheWorks;
	static luckyDog = IntriguePerkData.luckyDog;
	static masterOfDisguise = IntriguePerkData.masterOfDisguise;
	static slippedLead = IntriguePerkData.slippedLead;

	static butIKnowWhoDoes = LorePerkData.butIKnowWhoDoes;
	static eideticMemory = LorePerkData.eideticMemory;
	static expertSage = LorePerkData.expertSage;
	static iveReadAboutThisPlace = LorePerkData.iveReadAboutThisPlace;
	static linguist = LorePerkData.linguist;
	static polymath = LorePerkData.polymath;
	static specialist = LorePerkData.specialist;
	static travellingSage = LorePerkData.travellingSage;

	static arcaneTrick = SupernaturalPerkData.arcaneTrick;
	static creatureSense = SupernaturalPerkData.creatureSense;
	static familiar = SupernaturalPerkData.familiar;
	static invisibleForce = SupernaturalPerkData.invisibleForce;
	static psychicWhisper = SupernaturalPerkData.psychicWhisper;
	static thingspeaker = SupernaturalPerkData.thingspeaker;
	static ritualist = SupernaturalPerkData.ritualist;
}
