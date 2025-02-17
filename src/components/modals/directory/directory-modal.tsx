import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { LogoPanel } from '../../panels/logo/logo-panel';
import { Modal } from '../modal/modal';
import { Playbook } from '../../../models/playbook';
import { Sourcebook } from '../../../models/sourcebook';
import { useNavigation } from '../../../hooks/use-navigation';

import './directory-modal.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[],
	playbook: Playbook;
	onClose: () => void;
	createHero: () => void;
}

export const DirectoryModal = (props: Props) => {
	const navigation = useNavigation();

	try {
		return (
			<Modal
				toolbar={
					<div style={{ width: '100%' }}>
						<LogoPanel onClick={() => { navigation.goToWelcome(); props.onClose(); }} />
					</div>
				}
				content={
					<div className='directory-modal'>
						<HeaderText>Heroes</HeaderText>
						{props.heroes.map(h => <div key={h.id} className='directory-btn' onClick={() => { navigation.goToHeroView(h.id); props.onClose(); }}>{h.name || 'Unnamed Hero'}</div>)}
						<div className='directory-btn' onClick={() => { props.createHero(); props.onClose(); }}>Create a New Hero</div>
						<div className='directory-btn' onClick={() => { navigation.goToHeroList(); props.onClose(); }}>Heroes</div>
						<HeaderText>Library</HeaderText>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('ancestry'); props.onClose(); }}>Ancestries</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('culture'); props.onClose(); }}>Cultures</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('career'); props.onClose(); }}>Careers</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('class'); props.onClose(); }}>Classes</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('complication'); props.onClose(); }}>Complications</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('domain'); props.onClose(); }}>Domains</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('kit'); props.onClose(); }}>Kits</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('perk'); props.onClose(); }}>Perks</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('title'); props.onClose(); }}>Titles</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('item'); props.onClose(); }}>Items</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('monster-group'); props.onClose(); }}>Monsters</div>
						<HeaderText>Playbook</HeaderText>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybookList('encounter'); props.onClose(); }}>Encounters</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybookList('negotiation'); props.onClose(); }}>Negotiations</div>
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
