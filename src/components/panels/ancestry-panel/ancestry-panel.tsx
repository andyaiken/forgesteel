import { Ancestry } from '../../../models/ancestry';

import './ancestry-panel.scss';

interface Props {
	ancestry: Ancestry
}

export const AncestryPanel = (props: Props) => {
	return (
		<div className='ancestry-panel'>
			{props.ancestry.name}
		</div>
	);
};
