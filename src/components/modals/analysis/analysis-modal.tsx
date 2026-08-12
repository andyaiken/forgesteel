import { Alert, notification } from 'antd';
import { AnalysisLogic } from '@/logic/analysis-logic';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { CopyOutlined } from '@ant-design/icons';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';

import './analysis-modal.scss';

interface Props {
	sourcebooks: Sourcebook[];
	onClose: () => void;
}

export const AnalysisModal = (props: Props) => {
	const abilities = props.sourcebooks
		.flatMap(sb => [
			...sb.ancestries.flatMap(SourcebookLogic.getAbilitiesFromAncestry),
			...sb.classes.flatMap(c => SourcebookLogic.getAbilitiesFromClass(c, true, true, true, true, true, true)),
			...sb.subclasses.flatMap(sc => SourcebookLogic.getAbilitiesFromSubclass(sc, true, true)),
			...sb.domains.flatMap(SourcebookLogic.getAbilitiesFromDomain),
			...sb.kits.flatMap(SourcebookLogic.getAbilitiesFromKit),
			...sb.complications.flatMap(SourcebookLogic.getAbilitiesFromComplication)
		])
		.map(AnalysisLogic.convertAbility);

	const [ notify, notifyContext ] = notification.useNotification();

	const copyAbilitiesJson = () => {
		navigator.clipboard.writeText(JSON.stringify(abilities, null, 4));

		notify.info({
			title: 'Copied',
			description: `${abilities.length} parsed abilities have been copied to your clipboard as JSON.`,
			placement: 'top'
		});
	};

	return (
		<Modal
			content={
				<div className='analysis-modal'>
					<HeaderText
						extra={
							<ButtonGroup
								buttons={[
									{ type: 'button', icon: <CopyOutlined />, onClick: copyAbilitiesJson }
								]}
							/>
						}
					>
						Analysis
					</HeaderText>
					<Alert
						type='info'
						showIcon={true}
						title='This tool attempts to analyze how abilities are constructed.'
					/>
					{notifyContext}
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
