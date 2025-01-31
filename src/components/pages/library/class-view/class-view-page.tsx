import { Button, Popover } from 'antd';
import { AppHeader } from '../../../panels/app-header/app-header';
import { ClassPanel } from '../../../panels/elements/class-panel/class-panel';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { HeroClass } from '../../../../models/class';
import { PanelMode } from '../../../../enums/panel-mode';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './class-view-page.scss';

interface Props {
	sourcebooks: Sourcebook[];
	showAbout: () => void;
	createHomebrew: (heroClass: HeroClass, sourcebook: Sourcebook | null) => void;
	export: (heroClass: HeroClass, format: 'image' | 'pdf' | 'json') => void;
	delete: (heroClass: HeroClass) => void;
}

export const ClassViewPage = (props: Props) => {
	const navigation = useNavigation();
	const { elementID } = useParams<{ elementID: string }>();
	const heroClass = props.sourcebooks.flatMap(sb => sb.classes).find(c => c.id === elementID) as HeroClass;
	const sourcebook = SourcebookLogic.getClassSourcebook(props.sourcebooks, heroClass) as Sourcebook;

	try {
		return (
			<div className='class-view-page'>
				<AppHeader breadcrumbs={[ { label: 'Class' } ]} showAbout={props.showAbout}>
					<Button onClick={() => navigation.goToLibraryList('class')}>
						Close
					</Button>
					{
						sourcebook.isHomebrew ?
							<Button onClick={() => navigation.goToLibraryEdit('class', sourcebook.id, heroClass.id)}>
								Edit
							</Button>
							:
							<Popover
								trigger='click'
								placement='bottom'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										{
											props.sourcebooks
												.filter(sb => sb.isHomebrew)
												.map(cs => <Button key={cs.id} onClick={() => props.createHomebrew(heroClass, cs)}>In {cs.name || 'Unnamed Collection'}</Button>)
										}
										<Button onClick={() => props.createHomebrew(heroClass, null)}>In a new collection</Button>
									</div>
								)}
							>
								<Button>
									Create Homebrew Version
								</Button>
							</Popover>
					}
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button onClick={() => props.export(heroClass, 'image')}>Export As Image</Button>
								<Button onClick={() => props.export(heroClass, 'pdf')}>Export As PDF</Button>
								<Button onClick={() => props.export(heroClass, 'json')}>Export as Data</Button>
							</div>
						)}
					>
						<Button>
							Export
						</Button>
					</Popover>
					{sourcebook.isHomebrew ? <DangerButton onConfirm={() => props.delete(heroClass)} /> : null}
				</AppHeader>
				<div className='class-view-page-content'>
					<ClassPanel
						heroClass={heroClass}
						sourcebooks={props.sourcebooks}
						mode={PanelMode.Full}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
