import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { PanelMode } from '../../../../enums/panel-mode';
import { Space } from 'antd';
import { SubClass } from '../../../../models/subclass';
import { Utils } from '../../../../utils/utils';

import './subclass-panel.scss';

interface Props {
	subclass: SubClass;
	hero?: Hero;
	mode?: PanelMode;
}

export const SubclassPanel = (props: Props) => {
	try {
		return (
			<div className='subclass-panel' id={props.mode === PanelMode.Full ? props.subclass.id : undefined}>
				<HeaderText level={1}>{props.subclass.name || 'Unnamed Subclass'}</HeaderText>
				{props.subclass.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.subclass.description) }} /> : null}
				{
					props.mode === PanelMode.Full ?
						props.subclass.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
							<Space key={lvl.level} direction='vertical'>
								<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
								{...lvl.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />)}
							</Space>
						))
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
