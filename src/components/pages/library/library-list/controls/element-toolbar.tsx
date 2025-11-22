import { Alert, Button, Popover } from 'antd';
import { CopyOutlined, DownOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { DestinationSelector } from '@/components/pages/library/library-list/controls/destination-selector';
import { Element } from '@/models/element';
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
	deleteElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	exportElementData: (category: string, element: Element) => void;
	exportElementImage: (category: string, element: Element) => void;
	exportElementPdf: (category: string, element: Element, resolution: 'standard' | 'high') => void;
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

	const getCreateHomebrew = () => {
		if ((props.category === 'monster-group') && props.showMonsters) {
			return (
				<Popover
					trigger='click'
					content={(
						<Alert
							type='info'
							showIcon={true}
							message='To create a homebrew version of this monster, switch to Group view.'
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
		return sourcebook.type === SourcebookType.Homebrew ?
			<Button icon={<EditOutlined />} onClick={() => navigation.goToLibraryEdit(props.category, sourcebook.id, props.element.id)}>
				Edit
			</Button>
			: null;
	};

	const getCopy = () => {
		return sourcebook.type === SourcebookType.Homebrew ?
			<Popover
				trigger='click'
				content={(
					<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
						<DestinationSelector sourcebooks={props.sourcebooks} sourcebookID={props.sourcebookID} setSourcebookID={props.setSourcebookID} />
						<Button type='primary' onClick={() => props.createElement(props.category, props.sourcebookID, props.element)}>In a new sourcebook</Button>
					</div>
				)}
			>
				<Button icon={<CopyOutlined />}>
					Copy
					<DownOutlined />
				</Button>
			</Popover>
			: null;
	};

	const getExport = () => {
		let content = null;
		switch (props.category) {
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
			case 'perk':
			case 'project':
			case 'subclass':
			case 'terrain':
			case 'title':
				content = (
					<div style={{ width: '310px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
						{
							props.view !== 'classic' ?
								<Alert
									type='info'
									showIcon={true}
									message='If you want to export as a PDF, switch to Classic view.'
									action={<Button onClick={() => props.setView('classic')}>Classic</Button>}
								/>
								: null
						}
						{
							props.view === 'classic' ?
								<>
									<Button onClick={() => props.exportElementImage(((props.category === 'monster-group') && props.showMonsters) ? 'monster' : props.category, props.element)}>Export As Image</Button>
									<Button onClick={() => props.exportElementPdf(((props.category === 'monster-group') && props.showMonsters) ? 'monster' : props.category, props.element, 'standard')}>Export As PDF</Button>
									<Button onClick={() => props.exportElementPdf(((props.category === 'monster-group') && props.showMonsters) ? 'monster' : props.category, props.element, 'high')}>Export As PDF (high res)</Button>
								</>
								: null
						}
						<Button onClick={() => props.exportElementData(((props.category === 'monster-group') && props.showMonsters) ? 'monster' : props.category, props.element)}>Export as Data</Button>
					</div>
				);
				break;
			case 'encounter':
			case 'montage':
			case 'negotiation':
				content = (
					<div style={{ width: '310px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
						{
							props.view !== 'classic' ?
								<Alert
									type='info'
									showIcon={true}
									message='If you want to export as a PDF, switch to Classic view.'
									action={<Button onClick={() => props.setView('classic')}>Classic</Button>}
								/>
								: null
						}
						{
							props.view === 'classic' ?
								<>
									<Button onClick={() => props.exportElementPdf(props.category, props.element, 'standard')}>Export As PDF</Button>
									<Button onClick={() => props.exportElementPdf(props.category, props.element, 'high')}>Export As PDF (high res)</Button>
								</>
								: null
						}
						<Button onClick={() => props.exportElementData(props.category, props.element)}>Export as Data</Button>
					</div>
				);
				break;
			case 'adventure':
			case 'tactical-map':
				content = (
					<div style={{ width: '310px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
						<Button onClick={() => props.exportElementData(props.category, props.element)}>Export as Data</Button>
					</div>
				);
				break;
		}

		return (
			<Popover
				trigger='click'
				content={content}
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
			{getCreateHomebrew()}
			{getEdit()}
			{getCopy()}
			{getExport()}
			{getDelete()}
		</>
	);
};
