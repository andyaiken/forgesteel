import { Button, Flex, Popover, Segmented, Space, Upload } from 'antd';
import { DownloadOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { Empty } from '@/components/controls/empty/empty';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Modal } from '@/components/modals/modal/modal';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookEditorPanel } from '@/components/panels/elements/sourcebook-panel/sourcebook-panel';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SourcebookUpdateLogic } from '@/logic/update/sourcebook-update-logic';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './sourcebooks-modal.scss';

interface Props {
	officialSourcebooks: Sourcebook[];
	homebrewSourcebooks: Sourcebook[];
	hiddenSourcebookIDs: string[];
	heroes: Hero[];
	onClose: () => void;
	onHomebrewSourcebookChange: (Sourcebooks: Sourcebook[]) => void;
	onHiddenSourcebookIDsChange: (ids: string[]) => void;
}

export const SourcebooksModal = (props: Props) => {
	const [ page, setPage ] = useState<SourcebookType>(SourcebookType.Official);
	const [ homebrewSourcebooks, setHomebrewSourcebooks ] = useState<Sourcebook[]>(Utils.copy(props.homebrewSourcebooks));
	const [ hiddenSourcebookIDs, setHiddenSourcebookIDs ] = useState<string[]>(Utils.copy(props.hiddenSourcebookIDs));

	const setVisibility = (sourcebook: Sourcebook, visible: boolean) => {
		if (visible) {
			const copy = Utils.copy(hiddenSourcebookIDs.filter(id => id !== sourcebook.id));
			setHiddenSourcebookIDs(copy);
			props.onHiddenSourcebookIDsChange(copy);
		} else {
			const copy = Utils.copy(hiddenSourcebookIDs);
			copy.push(sourcebook.id);
			setHiddenSourcebookIDs(copy);
			props.onHiddenSourcebookIDsChange(copy);
		}
	};

	const getContent = () => {
		switch (page) {
			case SourcebookType.Official: {
				const officialSourcebooks = props.officialSourcebooks.filter(s => s.type === SourcebookType.Official);
				return (
					<>
						<HeaderText level={1}>
							Official Sourcebooks
						</HeaderText>
						<Space orientation='vertical' style={{ width: '100%' }}>
							{
								officialSourcebooks.map(s => (
									<SelectablePanel key={s.id}>
										<SourcebookEditorPanel
											sourcebook={s}
											sourcebooks={[ ...props.officialSourcebooks, ...homebrewSourcebooks ]}
											visible={!hiddenSourcebookIDs.includes(s.id)}
											heroes={props.heroes}
											onSetVisible={setVisibility}
										/>
									</SelectablePanel>
								))
							}
							{
								officialSourcebooks.length === 0 ?
									<Empty />
									: null
							}
						</Space>
					</>
				);
			}
			case SourcebookType.ThirdParty: {
				const thirdPartySourcebooks = props.officialSourcebooks.filter(s => s.type === SourcebookType.ThirdParty);
				return (
					<>
						<HeaderText
							level={1}
							extra={
								<Popover
									content={
										<Markdown text={'If you\'d like your company\'s content to be featured here, [get in touch](mailto:andy.aiken@live.co.uk).'} />
									}
								>
									<Button type='text' icon={<InfoCircleOutlined />} />
								</Popover>
							}
						>
							Third-Party Sourcebooks
						</HeaderText>
						<Space orientation='vertical' style={{ width: '100%' }}>
							{
								Collections.sort(thirdPartySourcebooks, sb => sb.name).map(s => (
									<SelectablePanel key={s.id}>
										<SourcebookEditorPanel
											sourcebook={s}
											sourcebooks={[ ...props.officialSourcebooks, ...homebrewSourcebooks ]}
											visible={!hiddenSourcebookIDs.includes(s.id)}
											heroes={props.heroes}
											onSetVisible={setVisibility}
										/>
									</SelectablePanel>
								))
							}
							{
								thirdPartySourcebooks.length === 0 ?
									<Empty />
									: null
							}
						</Space>
					</>
				);
			}
			case SourcebookType.Community: {
				const communitySourcebooks = props.officialSourcebooks.filter(s => s.type === SourcebookType.Community);
				return (
					<>
						<HeaderText
							level={1}
							extra={
								<Popover
									content={
										<Markdown text={'If you\'d like your creations to be featured here, just fill in [this form](https://forms.cloud.microsoft/r/mmxqfnFzx4).'} />
									}
								>
									<Button type='text' icon={<InfoCircleOutlined />} />
								</Popover>
							}
						>
							Community Sourcebooks
						</HeaderText>
						<Space orientation='vertical' style={{ width: '100%' }}>
							{
								Collections.sort(communitySourcebooks, sb => sb.name).map(s => (
									<SelectablePanel key={s.id}>
										<SourcebookEditorPanel
											sourcebook={s}
											sourcebooks={[ ...props.officialSourcebooks, ...homebrewSourcebooks ]}
											visible={!hiddenSourcebookIDs.includes(s.id)}
											heroes={props.heroes}
											onSetVisible={setVisibility}
										/>
									</SelectablePanel>
								))
							}
							{
								communitySourcebooks.length === 0 ?
									<Empty />
									: null
							}
						</Space>
					</>
				);
			}
			case SourcebookType.Homebrew: {
				const createSourcebook = () => {
					const copy = Utils.copy(homebrewSourcebooks);
					const sourcebook = FactoryLogic.createSourcebook();
					copy.push(sourcebook);
					setHomebrewSourcebooks(copy);
					props.onHomebrewSourcebookChange(copy);
				};

				const changeSourcebook = (sourcebook: Sourcebook) => {
					const copy = Utils.copy(homebrewSourcebooks);
					const index = copy.findIndex(s => s.id === sourcebook.id);
					if (index !== -1) {
						copy[index] = sourcebook;
						setHomebrewSourcebooks(copy);
						props.onHomebrewSourcebookChange(copy);
					}
				};

				const deleteSourcebook = (sourcebook: Sourcebook) => {
					const copy = Utils.copy(homebrewSourcebooks.filter(s => s.id !== sourcebook.id));
					setHomebrewSourcebooks(copy);
					props.onHomebrewSourcebookChange(copy);
				};

				const importSourcebook = (sourcebook: Sourcebook) => {
					const copy = Utils.copy(homebrewSourcebooks);
					copy.push(sourcebook);
					setHomebrewSourcebooks(copy);
					props.onHomebrewSourcebookChange(copy);
				};

				return (
					<>
						<HeaderText
							level={1}
							extra={
								<Flex>
									<Button type='text' title='Create a new sourcebook' icon={<PlusOutlined />} onClick={createSourcebook} />
									<Upload
										style={{ width: '100%' }}
										accept='.drawsteel-sourcebook,.ds-sourcebook'
										showUploadList={false}
										beforeUpload={file => {
											file
												.text()
												.then(json => {
													const sourcebook = JSON.parse(json) as Sourcebook;
													sourcebook.id = Utils.guid();
													SourcebookUpdateLogic.updateSourcebook(sourcebook);
													importSourcebook(sourcebook);
												});
											return false;
										}}
									>
										<Button type='text' title='Import a sourcebook' icon={<DownloadOutlined />} />
									</Upload>
								</Flex>
							}
						>
							Homebrew Sourcebooks
						</HeaderText>
						<Space orientation='vertical' style={{ width: '100%' }}>
							{
								Collections.sort(homebrewSourcebooks, sb => sb.name).map(s => (
									<SelectablePanel key={s.id}>
										<SourcebookEditorPanel
											sourcebook={s}
											sourcebooks={[ ...props.officialSourcebooks, ...homebrewSourcebooks ]}
											visible={!hiddenSourcebookIDs.includes(s.id)}
											heroes={props.heroes}
											onSetVisible={setVisibility}
											onChange={changeSourcebook}
											onDelete={deleteSourcebook}
										/>
									</SelectablePanel>
								))
							}
							{
								homebrewSourcebooks.length === 0 ?
									<Empty />
									: null
							}
						</Space>
					</>
				);
			}
		}
	};

	return (
		<Modal
			toolbar={
				<Segmented
					style={{ width: '100%' }}
					block={true}
					options={[
						{ value: SourcebookType.Official, label: 'Official' },
						{ value: SourcebookType.ThirdParty, label: 'Third Party' },
						{ value: SourcebookType.Community, label: 'Community' },
						{ value: SourcebookType.Homebrew, label: 'Homebrew' }
					]}
					value={page}
					onChange={setPage}
				/>
			}
			content={
				<div className='sourcebooks-modal'>
					{getContent()}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
