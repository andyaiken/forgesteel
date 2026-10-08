import { useDirectorSourcebooks, useHeroes, useOptions, useSession } from '@/contexts/data-context';
import { AdventureLogic } from '@/logic/adventure-logic';
import { Counter } from '@/models/counter';
import { Encounter } from '@/models/encounter';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { Session } from '@/models/session';
import { SessionLogic } from '@/logic/session-logic';
import { TacticalMap } from '@/models/tactical-map';
import { Utils } from '@/utils/utils';
import { useNavigation } from '@/hooks/use-navigation';

interface Props {
	persistSession: (session: Session) => Promise<void>;
}

export const useSessionActions = (props: Props) => {
	const { persistSession } = props;
	const navigation = useNavigation();
	const options = useOptions();
	const session = useSession();
	const heroes = useHeroes();
	const sourcebooks = useDirectorSourcebooks();

	const startEncounter = async (encounter: Encounter) => {
		const copy = SessionLogic.startEncounter(encounter, sourcebooks, heroes, options);

		const sessionCopy = Utils.copy(session);
		sessionCopy.encounters.push(copy);

		await persistSession(sessionCopy);
		await navigation.goToSession();
		return copy.id;
	};

	const startMontage = async (montage: Montage) => {
		const copy = SessionLogic.startMontage(montage);

		const sessionCopy = Utils.copy(session);
		sessionCopy.montages.push(copy);

		await persistSession(sessionCopy);
		await navigation.goToSession();
		return copy.id;
	};

	const startNegotiation = async (negotiation: Negotiation) => {
		const copy = SessionLogic.startNegotiation(negotiation);

		const sessionCopy = Utils.copy(session);
		sessionCopy.negotiations.push(copy);

		await persistSession(sessionCopy);
		await navigation.goToSession();
		return copy.id;
	};

	const startMap = async (map: TacticalMap) => {
		const copy = SessionLogic.startMap(map);

		const sessionCopy = Utils.copy(session);
		sessionCopy.tacticalMaps.push(copy);

		await persistSession(sessionCopy);
		await navigation.goToSession();
		return copy.id;
	};

	const startCounter = async (counter: Counter) => {
		const copy = SessionLogic.startCounter(counter);

		const sessionCopy = Utils.copy(session);
		sessionCopy.counters.push(copy);

		await persistSession(sessionCopy);
		await navigation.goToSession();
		return copy.id;
	};

	const updateEncounter = (encounter: Encounter) => {
		const copy = Utils.copy(session);

		const index = copy.encounters.findIndex(n => n.id === encounter.id);
		if (index !== -1) {
			copy.encounters[index] = encounter;
		}

		persistSession(copy);
	};

	const updateMontage = (montage: Montage) => {
		const copy = Utils.copy(session);

		const index = copy.montages.findIndex(n => n.id === montage.id);
		if (index !== -1) {
			copy.montages[index] = montage;
		}

		persistSession(copy);
	};

	const updateNegotiation = (negotiation: Negotiation) => {
		const copy = Utils.copy(session);

		const index = copy.negotiations.findIndex(n => n.id === negotiation.id);
		if (index !== -1) {
			copy.negotiations[index] = negotiation;
		}

		persistSession(copy);
	};

	const updateMap = (map: TacticalMap) => {
		const copy = Utils.copy(session);

		const index = copy.tacticalMaps.findIndex(tm => tm.id === map.id);
		if (index !== -1) {
			copy.tacticalMaps[index] = map;
		}

		persistSession(copy);
	};

	const updateCounter = (counter: Counter) => {
		const copy = Utils.copy(session);

		const index = copy.counters.findIndex(c => c.id === counter.id);
		if (index !== -1) {
			copy.counters[index] = counter;
		}

		persistSession(copy);
	};

	const finishSessionElement = (id: string) => {
		const copy = Utils.copy(session);

		copy.encounters = copy.encounters.filter(e => e.id !== id);
		copy.montages = copy.montages.filter(m => m.id !== id);
		copy.negotiations = copy.negotiations.filter(n => n.id !== id);
		copy.tacticalMaps = copy.tacticalMaps.filter(tm => tm.id !== id);
		copy.counters = copy.counters.filter(c => c.id !== id);

		if (copy.playerViewID === id) {
			copy.playerViewID = null;
		}

		persistSession(copy);

		const options = AdventureLogic.getContentOptions(copy);
		return options.length > 0 ? options[0].id : null;
	};

	return {
		startEncounter,
		startMontage,
		startNegotiation,
		startMap,
		startCounter,
		updateEncounter,
		updateMontage,
		updateNegotiation,
		updateMap,
		updateCounter,
		finishSessionElement
	};
};
