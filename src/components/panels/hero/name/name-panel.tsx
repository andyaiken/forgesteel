import { Button, Popover, Space } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroModalType } from '@/enums/hero-modal-type';
import { HeroToken } from '../../token/token';
import Overflow from 'rc-overflow';
import { useOptions } from '@/contexts/data-context';
import { useState } from 'react';

interface Props {
	hero: Hero;
	onShowState: (type: HeroModalType) => void;
}

export const NamePanel = (props: Props) => {
	const [ open, setOpen ] = useState(false);
	const options = useOptions();

	const actions = [
		HeroModalType.Resources,
		HeroModalType.Vitals,
		HeroModalType.Inventory,
		HeroModalType.Projects,
		HeroModalType.Titles,
		HeroModalType.Respite,
		HeroModalType.Customize,
		HeroLogic.getConditionalFeatures(props.hero).length > 0 ? HeroModalType.Conditional : null,
		HeroModalType.Settings
	].filter(item => !!item);

	return (
		<HeaderText
			style={{ margin: '0 5px 10px 5px' }}
			level={options.compactView ? 2 : 1}
			ribbon={props.hero.picture ? <HeroToken hero={props.hero} size={options.compactView ? 21 : 34} /> : null}
			tags={props.hero.folder ? [ props.hero.folder ] : []}
			extra={
				<>
					<Overflow
						data={actions}
						itemKey={item => item}
						maxCount='responsive'
						style={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end', gap: 5 }}
						renderItem={item => (
							<Button onClick={() => props.onShowState(item)}>
								{item}
							</Button>
						)}
						renderRest={omitted => (
							<Popover
								trigger='click'
								content={
									<Space orientation='vertical' style={{ width: '150px' }}>
										{
											omitted.map(item => <Button key={item} type='text' block={true} onClick={() => { setOpen(false); props.onShowState(item); }}>{item}</Button>)
										}
									</Space>
								}
								open={open}
								onOpenChange={setOpen}
							>
								<Button type='text' icon={<EllipsisOutlined />} />
							</Popover>
						)}
					/>
				</>
			}
		>
			{props.hero.name || 'Unnamed Hero'}
		</HeaderText>
	);
};
