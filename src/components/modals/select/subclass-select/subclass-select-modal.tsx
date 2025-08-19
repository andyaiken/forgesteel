import { Alert, Divider, Input, Space } from 'antd';
import { Collections } from '../../../../utils/collections';
import { Empty } from '../../../controls/empty/empty';
import { Expander } from '../../../controls/expander/expander';
import { Modal } from '../../modal/modal';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { SearchOutlined } from '@ant-design/icons';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SubClass } from '../../../../models/subclass';
import { SubclassPanel } from '../../../panels/elements/subclass-panel/subclass-panel';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './subclass-select-modal.scss';

interface Props {
	subClasses: SubClass[];
	classID: string;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
	onSelect: (subClass: SubClass) => void;
}

export const SubClassSelectModal = (props: Props) => {
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	const customSubclasses = Collections.sort(
		props.sourcebooks
			.flatMap(sb => sb.subclasses),
		sc => sc.name);

	const otherSubclasses = Collections.sort(
		props.sourcebooks
			.flatMap(sb => sb.classes)
			.filter(c => c.id !== props.classID)
			.flatMap(c => c.subclasses),
		sc => sc.name);

	try {
		const subClasses = props.subClasses
			.filter(l => Utils.textMatches([
				l.name,
				l.description
			], searchTerm));

		return (
			<Modal
				toolbar={
					<>
						<Input
							name='search'
							placeholder='Search'
							allowClear={true}
							value={searchTerm}
							suffix={<SearchOutlined />}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</>
				}
				content={
					<div className='subclass-select-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							{
								subClasses.map(sc => (
									<SelectablePanel
										key={sc.id}
										onSelect={() => props.onSelect(sc)}
									>
										<SubclassPanel subclass={sc} options={props.options} mode={PanelMode.Compact} />
									</SelectablePanel>
								))
							}
							{
								subClasses.length === 0 ?
									<Empty />
									: null
							}
							{
								customSubclasses.length > 0 ?
									<>
										<Divider />
										<Space direction='vertical' style={{ width: '100%' }}>
											{
												customSubclasses.map(sc => (
													<SelectablePanel
														key={sc.id}
														onSelect={() => props.onSelect(sc)}
													>
														<SubclassPanel subclass={sc} options={props.options} mode={PanelMode.Compact} />
													</SelectablePanel>
												))
											}
										</Space>
									</>
									: null
							}
							{
								otherSubclasses.length > 0 ?
									<>
										<Divider />
										<Expander title='From other classes'>
											<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
												<Alert
													showIcon={true}
													message='Selecting a subclass from a different class is typically against the rules.'
												/>
												{
													otherSubclasses.map(sc => (
														<SelectablePanel
															key={sc.id}
															onSelect={() => props.onSelect(sc)}
														>
															<SubclassPanel subclass={sc} options={props.options} mode={PanelMode.Compact} />
														</SelectablePanel>
													))
												}
											</Space>
										</Expander>
									</>
									: null
							}
						</Space>
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
