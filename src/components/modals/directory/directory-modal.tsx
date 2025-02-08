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
	createHero: () => void;
	closeDirectory: () => void;
}

export const DirectoryModal = (props: Props) => {
	const navigation = useNavigation();

	try {
		return (
			<Modal
				toolbar={
					<div style={{ width: '100%' }}>
						<LogoPanel onClick={() => { navigation.goToWelcome(); props.closeDirectory(); }} />
					</div>
				}
				content={
					<div className='directory-modal'>
						<HeaderText>Heroes</HeaderText>
						{props.heroes.map(h => <div key={h.id} className='directory-btn' onClick={() => { navigation.goToHeroView(h.id); props.closeDirectory(); }}>{h.name || 'Unnamed Hero'}</div>)}
						<div className='directory-btn' onClick={() => { props.createHero(); props.closeDirectory(); }}>Create a New Hero</div>
						<div className='directory-btn' onClick={() => { navigation.goToHeroList(); props.closeDirectory(); }}>Heroes</div>
						<HeaderText>Library</HeaderText>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('ancestry'); props.closeDirectory(); }}>Ancestries</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('culture'); props.closeDirectory(); }}>Cultures</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('career'); props.closeDirectory(); }}>Careers</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('class'); props.closeDirectory(); }}>Classes</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('complication'); props.closeDirectory(); }}>Complications</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('domain'); props.closeDirectory(); }}>Domains</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('kit'); props.closeDirectory(); }}>Kits</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('perk'); props.closeDirectory(); }}>Perks</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('title'); props.closeDirectory(); }}>Titles</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('item'); props.closeDirectory(); }}>Items</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('monster-group'); props.closeDirectory(); }}>Monsters</div>
						<HeaderText>Playbook</HeaderText>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybookList('encounter'); props.closeDirectory(); }}>Encounters</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybookList('negotiation'); props.closeDirectory(); }}>Negotiations</div>
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
