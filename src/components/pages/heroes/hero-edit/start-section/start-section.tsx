import { HeaderText } from '@/components/controls/header-text/header-text';
import { HeroSourcebooksPanel } from '@/components/panels/hero-sourcebooks/hero-sourcebooks-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';

import './start-section.scss';

interface Props {
	sourcebookIDs: string[];
	sourcebooks: Sourcebook[];
	setSourcebookIDs: (settingIDs: string[]) => void;
	importSourcebook: (sourcebook: Sourcebook) => void;
}

export const StartSection = (props: Props) => {
	return (
		<div className='hero-edit-content start-section'>
			<div className='hero-edit-content-column selected'>
				<SelectablePanel>
					<HeaderText>Creating a Hero</HeaderText>
					<div className='ds-text'>
						Creating a hero in <b>FORGE STEEL</b> is simple.
					</div>
					<ul>
						<li>
							Use the tabs above to select your hero's <code>Ancestry</code>, <code>Culture</code>, <code>Career</code>, and <code>Class</code>.
							If there are any choices to be made, you'll be prompted to make your selections.
						</li>
						<li>
							Optionally, you can choose a <code>Complication</code> - but you can skip this if you'd prefer.
						</li>
						<li>
							Finally, go to the <code>Details</code> tab and give your hero a name.
						</li>
					</ul>
					<div className='ds-text'>
						When you're done, click <code>Save Changes</code> in the toolbar at the top, and you'll see your hero sheet.
					</div>
				</SelectablePanel>
			</div>
			<div className='hero-edit-content-column choices'>
				<HeroSourcebooksPanel
					sourcebooks={props.sourcebooks}
					sourcebookIDs={props.sourcebookIDs}
					onImportSourcebook={props.importSourcebook}
					onChange={props.setSourcebookIDs}
				/>
			</div>
		</div>
	);
};
