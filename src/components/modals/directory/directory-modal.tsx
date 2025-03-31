import { Collections } from '../../../utils/collections';
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
}

export const DirectoryModal = (props: Props) => {
	const navigation = useNavigation();

	try {
		const folders = Collections.distinct(props.heroes.map(h => h.folder), f => f).sort();
		if (folders.length === 0) {
			folders.push('');
		}

		return (
			<Modal
				toolbar={
					<div style={{ width: '100%', textAlign: 'center', cursor: 'pointer' }} onClick={() => { navigation.goToWelcome(); props.onClose(); }}>
						<LogoPanel />
					</div>
				}
				content={
					<div className='directory-modal'>
						<div className='directory-header'>Heroes</div>
						{
							folders.map(f =>
								<div key={f} className='directory-btn' onClick={() => { navigation.goToHeroList(f); props.onClose(); }}>{f || 'Heroes'}</div>
							)
						}
						<div className='directory-header'>Library</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('ancestry'); props.onClose(); }}>Ancestries</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('career'); props.onClose(); }}>Careers</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('class'); props.onClose(); }}>Classes</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('complication'); props.onClose(); }}>Complications</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('culture'); props.onClose(); }}>Cultures</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('domain'); props.onClose(); }}>Domains</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('item'); props.onClose(); }}>Items</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('kit'); props.onClose(); }}>Kits</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('monster-group'); props.onClose(); }}>Monsters</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('perk'); props.onClose(); }}>Perks</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('terrain'); props.onClose(); }}>Terrain</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibraryList('title'); props.onClose(); }}>Titles</div>
						<div className='directory-header'>Playbook</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybookList('adventure'); props.onClose(); }}>Adventures</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybookList('encounter'); props.onClose(); }}>Encounters</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybookList('montage'); props.onClose(); }}>Montages</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybookList('negotiation'); props.onClose(); }}>Negotiations</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybookList('tactical-map'); props.onClose(); }}>Tactical Maps</div>
						<div className='directory-header'>Session</div>
						<div className='directory-btn' onClick={() => { navigation.goToSession(); props.onClose(); }}>Session</div>
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
