import { EllipsisOutlined } from '@ant-design/icons';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroModalType } from '@/enums/hero-modal-type';
import { HeroToken } from '../../token/token';
import { Menu } from 'antd';
import { useOptions } from '@/contexts/data-context';

interface Props {
	hero: Hero;
	onShowState: (type: HeroModalType) => void;
}

export const NamePanel = (props: Props) => {
	const options = useOptions();

	return (
		<HeaderText
			style={{ margin: '0 5px 10px 5px' }}
			level={options.compactView ? 2 : 1}
			ribbon={props.hero.picture ? <HeroToken hero={props.hero} size={options.compactView ? 21 : 34} /> : null}
			tags={props.hero.folder ? [ props.hero.folder ] : []}
			extra={
				<Menu
					mode='horizontal'
					items={
						[
							HeroModalType.Resources,
							HeroModalType.Vitals,
							HeroModalType.Inventory,
							HeroModalType.Projects,
							HeroModalType.Titles,
							HeroModalType.Notes,
							HeroModalType.Respite,
							HeroModalType.Customize,
							HeroLogic.getConditionalFeatures(props.hero).length > 0 ? HeroModalType.Conditional : null,
							HeroModalType.Settings
						]
							.filter(item => item !== null)
							.map(a => ({ key: a, label: a }))
					}
					onClick={item => props.onShowState(item.key as HeroModalType)}
					selectable={false}
					overflowedIndicator={<EllipsisOutlined />}
				/>
			}
		>
			{props.hero.name || 'Unnamed Hero'}
		</HeaderText>
	);
};
