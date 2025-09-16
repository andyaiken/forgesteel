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
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('ancestry'); props.onClose(); }}>Ancestries</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('career'); props.onClose(); }}>Careers</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('class'); props.onClose(); }}>Classes</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('complication'); props.onClose(); }}>Complications</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('culture'); props.onClose(); }}>Cultures</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('domain'); props.onClose(); }}>Domains</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('imbuement'); props.onClose(); }}>Imbuements</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('item'); props.onClose(); }}>Items</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('kit'); props.onClose(); }}>Kits</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('monster-group'); props.onClose(); }}>Monsters</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('perk'); props.onClose(); }}>Perks</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('terrain'); props.onClose(); }}>Terrain</div>
						<div className='directory-btn' onClick={() => { navigation.goToLibrary('title'); props.onClose(); }}>Titles</div>
						<div className='directory-header'>Playbook</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybook('adventure'); props.onClose(); }}>Adventures</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybook('encounter'); props.onClose(); }}>Encounters</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybook('montage'); props.onClose(); }}>Montages</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybook('negotiation'); props.onClose(); }}>Negotiations</div>
						<div className='directory-btn' onClick={() => { navigation.goToPlaybook('tactical-map'); props.onClose(); }}>Tactical Maps</div>
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
