import { SharedElement, SharedElementKind, SharingLogic } from '@/logic/sharing-logic';
import { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Item } from '@/models/item';
import { ItemPanel } from '@/components/panels/elements/item-panel/item-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Monster } from '@/models/monster';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';

import './import-code-modal.scss';

const describe = (kind: SharedElementKind) => {
	switch (kind) {
		case 'item':
			return 'an item';
		case 'title':
			return 'a title';
		case 'monster':
			return 'a monster';
	}
};

interface Props {
	kind: SharedElementKind;
	// Only needed to preview a title; a monster or an item reads the same for anyone
	hero?: Hero;
	sourcebooks: Sourcebook[];
	// Returns a reason to turn the code away, for somewhere that only takes some of a kind -
	// the retainer picker will read any monster code, but only a retainer is any use to it
	validate?: (element: SharedElement) => string | null;
	onClose: () => void;
	onImport: (element: Item | Title | Monster) => void;
};

export const ImportCodeModal = (props: Props) => {
	const { kind, validate } = props;
	const [ code, setCode ] = useState<string>('');
	const [ decoded, setDecoded ] = useState<SharedElement | null>(null);
	const [ error, setError ] = useState<string | null>(null);

	useEffect(() => {
		let current = true;

		if (!code.trim()) {
			setDecoded(null);
			setError(null);
			return;
		}

		SharingLogic.decode(code)
			.then(result => {
				if (!current) {
					return;
				}

				if (result.kind !== kind) {
					setDecoded(null);
					setError(`That is a code for ${describe(result.kind)}, not for ${describe(kind)}.`);
					return;
				}

				const reason = validate ? validate(result) : null;
				if (reason) {
					setDecoded(null);
					setError(reason);
					return;
				}

				setDecoded(result);
				setError(null);
			})
			.catch((ex: Error) => {
				if (!current) {
					return;
				}

				setDecoded(null);
				setError(ex.message);
			});

		return () => {
			current = false;
		};
	}, [ code, kind, validate ]);

	const getPreview = () => {
		if (error) {
			return (
				<Alert type='warning' showIcon={true} title={error} />
			);
		}

		if (!decoded) {
			return null;
		}

		if (decoded.item) {
			return (
				<SelectablePanel onSelect={() => props.onImport(decoded.item as Item)}>
					<ItemPanel item={decoded.item} sourcebooks={props.sourcebooks} wielder={props.hero} mode={PanelMode.Full} />
				</SelectablePanel>
			);
		};

		if (decoded.title) {
			return (
				<SelectablePanel onSelect={() => props.onImport(decoded.title as Title)}>
					<TitlePanel title={decoded.title} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
				</SelectablePanel>
			);
		};

		if (decoded.monster) {
			return (
				<SelectablePanel onSelect={() => props.onImport(decoded.monster as Monster)}>
					<MonsterPanel monster={decoded.monster} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
				</SelectablePanel>
			);
		};
	};

	return (
		<Modal
			content={
				<div className='import-code-modal'>
					<HeaderText>Import A Code</HeaderText>
					<div className='ds-text'>
						If your director has sent you a code, paste it below.
					</div>
					<MultiLine
						value={code}
						placeholder={`FS1.${props.kind}...`}
						inputStyle={{ fontFamily: 'monospace' }}
						onChange={setCode}
					/>
					{getPreview()}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
