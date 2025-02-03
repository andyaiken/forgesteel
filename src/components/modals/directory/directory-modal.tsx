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
}

export const DirectoryModal = (props: Props) => {
	const navigation = useNavigation();

	try {
		return (
			<Modal
				toolbar={
					<div style={{ width: '100%' }}>
						<LogoPanel onClick={() => navigation.goToWelcome()} />
					</div>
				}
				content={
					<div className='directory-modal'>
						<HeaderText>Heroes</HeaderText>
						{props.heroes.map(h => <div key={h.id} className='directory-btn' onClick={() => navigation.goToHeroView(h.id)}>{h.name}</div>)}
						{props.heroes.length === 0 ? <div className='directory-btn' onClick={() => navigation.goToHeroList()}>List</div> : null}
						<HeaderText>Library</HeaderText>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('ancestry')}>Ancestries</div>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('culture')}>Cultures</div>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('career')}>Careers</div>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('class')}>Classes</div>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('complication')}>Complications</div>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('domain')}>Domains</div>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('kit')}>Kits</div>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('perk')}>Perks</div>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('title')}>Titles</div>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('item')}>Items</div>
						<div className='directory-btn' onClick={() => navigation.goToLibraryList('monster-group')}>Monsters</div>
						<HeaderText>Playbook</HeaderText>
						<div className='directory-btn' onClick={() => navigation.goToPlaybookList('encounter')}>Encounters</div>
						<div className='directory-btn' onClick={() => navigation.goToPlaybookList('negotiation')}>Negotiations</div>
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
