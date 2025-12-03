import { Alert, Button, Divider, Popover } from 'antd';
import { ArrowRightOutlined, CopyOutlined, DownOutlined, EditOutlined, PlayCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { DestinationSelector } from '@/components/pages/library/library-list/controls/destination-selector';
import { Element } from '@/models/element';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { LibraryLogic } from '@/logic/library-logic';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { useNavigation } from '@/hooks/use-navigation';

interface Props {
	element: Element;
	category: SourcebookElementKind;
	sourcebooks: Sourcebook[];
	showMonsters: boolean;
	sourcebookID: string;
	view: string;
	setShowMonsters: (value: boolean) => void;
	setSourcebookID: (value: string) => void;
	setView: (value: string) => void;
	createElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element | null) => void;
	importElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	moveElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	deleteElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	exportElementData: (category: string, element: Element) => void;
	exportElementImage: (category: string, element: Element) => void;
	exportElementPdf: (category: string, element: Element, resolution: 'standard' | 'high') => void;
	startElement: (category: string, element: Element) => void;
}

export const ElementToolbar = (props: Props) => {
	const navigation = useNavigation();

	const sourcebook = LibraryLogic.getSourcebook(props.element, props.category, props.sourcebooks, props.showMonsters);
	if (!sourcebook) {
		if (props.category === 'subclass') {
			const c = SourcebookLogic.getClasses(props.sourcebooks).find(c => c.subclasses.some(sc => sc.id === props.element.id));
			if (c) {
				return (
					<Button onClick={() => navigation.goToLibrary('class', c.id)}>
						Open {c.name}
					</Button>
				);
			}
		}

		return null;
	}

	const getStart = () => {
		switch (props.category) {
			case 'encounter':
			case 'montage':
			case 'negotiation':
			case 'tactical-map':
				return (
					<Button icon={<PlayCircleOutlined />} onClick={() => props.startElement(props.category, props.element)}>
						Start
					</Button>
				);
		}

		return null;
	};

	const getCreateHomebrew = () => {
		if ((props.category === 'monster-group') && props.showMonsters) {
			return (
				<Popover
					trigger='click'
					content={(
						<Alert
							type='info'
							showIcon={true}
							title='To create a homebrew version of this monster, switch to Group view.'
							action={<Button style={{ marginLeft: '5px' }} onClick={() => props.setShowMonsters(false)}>Switch</Button>}
						/>
					)}
				>
					<Button icon={<CopyOutlined />}>
						Create Homebrew Version
						<DownOutlined />
					</Button>
				</Popover>
			);
		}

		if (sourcebook.type !== SourcebookType.Homebrew) {
			return (
				<Popover
					trigger='click'
					content={(
						<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
							<DestinationSelector sourcebooks={props.sourcebooks} sourcebookID={props.sourcebookID} setSourcebookID={props.setSourcebookID} />
							<Button type='primary' onClick={() => props.createElement(props.category, props.sourcebookID, props.element)}>Create</Button>
						</div>
					)}
				>
					<Button icon={<CopyOutlined />}>
						Create Homebrew Version
						<DownOutlined />
					</Button>
				</Popover>
			);
		}

		return null;
	};

	const getEdit = () => {
		if (sourcebook.type !== SourcebookType.Homebrew) {
			return null;
		}

		return (
			<Button icon={<EditOutlined />} onClick={() => navigation.goToLibraryEdit(props.category, sourcebook.id, props.element.id)}>
				Edit
			</Button>
		);
	};

	const getCopy = () => {
		if (sourcebook.type !== SourcebookType.Homebrew) {
			return null;
		}

		return (
			<Popover
				trigger='click'
				content={(
					<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
						<DestinationSelector sourcebooks={props.sourcebooks} sourcebookID={props.sourcebookID} setSourcebookID={props.setSourcebookID} />
						<Button type='primary' onClick={() => props.createElement(props.category, props.sourcebookID, props.element)}>Create a Copy</Button>
					</div>
				)}
			>
				<Button icon={<CopyOutlined />}>
					Copy
					<DownOutlined />
				</Button>
			</Popover>
		);
	};

	const getMove = () => {
		if (sourcebook.type !== SourcebookType.Homebrew) {
			return null;
		}

		return (
			<Popover
				trigger='click'
				content={(
					<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
						<div>This currently lives in <b>{sourcebook.name || 'Unnamed Sourcebook'}</b>.</div>
						<DestinationSelector sourcebooks={props.sourcebooks} sourcebookID={props.sourcebookID} setSourcebookID={props.setSourcebookID} />
						<Button type='primary' disabled={sourcebook.id === props.sourcebookID} onClick={() => props.moveElement(props.category, props.sourcebookID, props.element)}>Move</Button>
					</div>
				)}
			>
				<Button icon={<ArrowRightOutlined />}>
					Move
					<DownOutlined />
				</Button>
			</Popover>
		);
	};

	const getExport = () => {
		const category = ((props.category === 'monster-group') && props.showMonsters) ? 'monster' : props.category;

		let canExportAsImage = false;
		let canExportAsPDF = false;
		switch (category) {
			case 'ancestry':
			case 'career':
			case 'class':
			case 'complication':
			case 'culture':
			case 'domain':
			case 'imbuement':
			case 'item':
			case 'kit':
			case 'monster-group':
			case 'monster':
			case 'perk':
			case 'project':
			case 'subclass':
			case 'terrain':
			case 'title':
				canExportAsImage = true;
				canExportAsPDF = true;
				break;
			case 'encounter':
			case 'montage':
			case 'negotiation':
				canExportAsImage = false;
				canExportAsPDF = true;
				break;
		}

		const imageOrPDF = canExportAsImage || canExportAsPDF ?
			props.view === 'classic' ?
				<>
					{
						canExportAsImage ?
							<>
								<Button onClick={() => props.exportElementImage(category, props.element)}>
									Export As Image
								</Button>
							</>
							: null
					}
					{canExportAsImage && canExportAsPDF ? <Divider /> : null}
					{
						canExportAsPDF ?
							<>
								<Button onClick={() => props.exportElementPdf(category, props.element, 'standard')}>
									Export As PDF
								</Button>
								<Button onClick={() => props.exportElementPdf(category, props.element, 'high')}>
									Export As PDF (high res)
								</Button>
							</>
							: null
					}
				</>
				:
				<Alert
					type='info'
					showIcon={true}
					title='If you want to export as a PDF, switch to Classic view.'
					action={<Button onClick={() => props.setView('classic')}>Classic</Button>}
				/>
			: null;

		const externalContent = LibraryLogic.getExternalContent(props.element, props.category, props.sourcebooks);

		return (
			<Popover
				trigger='click'
				content={
					<div style={{ width: '310px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
						{imageOrPDF}
						{imageOrPDF ? <Divider /> : null}
						{
							externalContent.length > 0 ?
								<Alert
									type='warning'
									title={
										<>
											<HeaderText level={3}>External Content</HeaderText>
											<div>Some homebrew content used in this {category} is located in a different sourcebook.</div>
											<div>The exported file won't contain the following items:</div>
											<ul>
												{externalContent.map(ec => <li key={ec.element.id}><b>{ec.element.name}</b> in {ec.sourcebook.name}</li>)}
											</ul>
										</>
									}
								/>
								: null
						}
						<Button onClick={() => props.exportElementData(category, props.element)}>
							Export as Data
						</Button>
					</div>
				}
			>
				<Button icon={<UploadOutlined />}>
					Export
					<DownOutlined />
				</Button>
			</Popover>
		);
	};

	const getDelete = () => {
		return sourcebook.type === SourcebookType.Homebrew ?
			<DangerButton
				mode='block'
				disabled={SourcebookLogic.getUsedIn(props.sourcebooks, props.element.id).length !== 0}
				onConfirm={() => props.deleteElement(props.category, sourcebook.id, props.element)}
			/>
			: null;
	};

	return (
		<>
			{getStart()}
			{getCreateHomebrew()}
			{getEdit()}
			{getCopy()}
			{getMove()}
			{getExport()}
			{getDelete()}
		</>
	);
};
