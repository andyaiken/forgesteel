import { Button, Drawer } from 'antd';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookSelectModal } from '@/components/modals/select/sourcebook-select/sourcebook-select-modal';
import { useState } from 'react';

import './start-section.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	setSettingIDs: (settingIDs: string[]) => void;
	importSourcebook: (sourcebook: Sourcebook) => void;
}

export const StartSection = (props: Props) => {
	const [ sourcebookSelectOpen, setSourcebookSelectOpen ] = useState<boolean>(false);

	return (
		<div className='hero-edit-content start-section'>
			<div className='hero-edit-content-column single-column selected'>
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
				<SelectablePanel>
					<HeaderText>Sourcebooks</HeaderText>
					<div className='ds-text'>
						This hero can use content from the following sourcebooks:
					</div>
					<ul>
						{
							props.hero.settingIDs.map(id => {
								const sb = props.sourcebooks.find(x => x.id === id);
								return sb ?
									<li key={sb.id}>
										<Field label={sb.name || 'Unnamed Sourcebook'} value={sb.description} />
									</li>
									: null;
							})
						}
						{
							props.hero.settingIDs.length === 0 ?
								<li key='empty'>
									None
								</li>
								: null
						}
					</ul>
					<div className='ds-text'>
						If you have a homebrew sourcebook you'd like to use for this hero, you should include it here.
					</div>
					<Button block={true} onClick={() => setSourcebookSelectOpen(true)}>
						Select Sourcebooks
					</Button>
				</SelectablePanel>
			</div>
			<Drawer open={sourcebookSelectOpen} onClose={() => setSourcebookSelectOpen(false)} closeIcon={null} width='500px'>
				<SourcebookSelectModal
					selectedIDs={props.hero.settingIDs}
					sourcebooks={props.sourcebooks}
					onSelect={props.setSettingIDs}
					onImport={props.importSourcebook}
					onClose={() => setSourcebookSelectOpen(false)}
				/>
			</Drawer>
		</div>
	);
};
