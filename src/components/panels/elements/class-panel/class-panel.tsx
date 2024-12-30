import { AbilityPanel } from '../ability-panel/ability-panel';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Space } from 'antd';
import { SubclassPanel } from '../subclass-panel/subclass-panel';
import { Utils } from '../../../../utils/utils';

import './class-panel.scss';

interface Props {
	heroClass: HeroClass;
	hero?: Hero;
	mode?: PanelMode;
}

export const ClassPanel = (props: Props) => {
	try {
		return (
			<div className='class-panel' id={props.mode === PanelMode.Full ? props.heroClass.id : undefined}>
				<HeaderText level={1}>{props.heroClass.name || 'Unnamed Class'}</HeaderText>
				{props.heroClass.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.heroClass.description) }} /> : null}
				<Field label='Heroic Resource' value={props.heroClass.heroicResource} />
				{props.heroClass.subclasses.length > 0 ? <Field label={`${props.heroClass.subclassName}s`} value={props.heroClass.subclasses.map(c => c.name).join(', ')} /> : null}
				<Field label='Primary Characteristics' value={props.heroClass.primaryCharacteristics.join(', ')} />
				{
					props.mode === PanelMode.Full ?
						props.heroClass.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
							<Space key={lvl.level} direction='vertical'>
								<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
								{...lvl.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} mode={PanelMode.Full} />)}
							</Space>
						))
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.heroClass.abilities.length > 0) ?
						<Space direction='vertical'>
							<HeaderText level={1}>Abilities</HeaderText>
							{...props.heroClass.abilities.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} /></SelectablePanel>)}
						</Space>
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.heroClass.subclasses.length > 0) ?
						<Space direction='vertical'>
							<HeaderText level={1}>Subclasses</HeaderText>
							{...props.heroClass.subclasses.map(sc => <SubclassPanel key={sc.id} subclass={sc} hero={props.hero} mode={PanelMode.Full} />)}
						</Space>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
