import { Button, Divider } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';

import './respite-modal.scss';

interface Props {
	onTakeRespite: () => void;
	onClose: () => void;
}

export const RespiteModal = (props: Props) => {
	return (
		<ErrorBoundary>
			<Modal
				content={
					<div className='respite-modal'>
						<HeaderText>Respite</HeaderText>
						<div className='ds-text'>
							Taking a respite has the following effects:
						</div>
						<ul>
							<li>
								Your Stamina and Recoveries are reset (and any temporary Stamina goes away)
							</li>
							<li>
								Your Victories are turned into XP
							</li>
							<li>
								Any conditions affecting you are removed
							</li>
						</ul>
						<div className='ds-text'>
							During a respite you can take one respite action. Standard respite actions are:
						</div>
						<ul>
							<li>
								Make a project roll
							</li>
							<li>
								Change your kit / prayer / enchantment / augmentation / ward
							</li>
							<li>
								Attract followers (for every 3 renown, you can have 1 follower)
							</li>
						</ul>
						<Divider />
						<Button
							key='take-respite'
							block={true}
							className='tall-button'
							onClick={props.onTakeRespite}
						>
							<div>
								<div>Take a Respite</div>
								<div className='subtext'>
									24 hours of rest
								</div>
							</div>
						</Button>
					</div>
				}
				onClose={props.onClose}
			/>
		</ErrorBoundary>
	);
};
