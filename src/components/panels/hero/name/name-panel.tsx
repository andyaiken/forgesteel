import { Button, Divider, Popover, Space } from 'antd';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { EllipsisOutlined } from '@ant-design/icons';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroModalType } from '@/enums/hero-modal-type';
import { HeroToken } from '../../token/token';
import { useIsSmall } from '@/hooks/use-is-small';
import { useOptions } from '@/contexts/data-context';
import { useState } from 'react';

interface Props {
	hero: Hero;
	onShowState: (type: HeroModalType) => void;
}

export const NamePanel = (props: Props) => {
	const isSmall = useIsSmall();
	const options = useOptions();
	const [ open, setOpen ] = useState(false);

	return (
		<HeaderText
			style={{ margin: '0 5px 10px 5px' }}
			level={options.compactView ? 2 : 1}
			ribbon={props.hero.picture ? <HeroToken hero={props.hero} size={options.compactView ? 21 : 34} /> : null}
			tags={props.hero.folder ? [ props.hero.folder ] : []}
			extra={
				isSmall ?
					<Popover
						content={
							<Space orientation='vertical'>
								<Button block={true} type='text' onClick={() => props.onShowState(HeroModalType.Resources)}>Resources</Button>
								<Button block={true} type='text' onClick={() => props.onShowState(HeroModalType.Vitals)}>Vitals</Button>
								<Button block={true} type='text' onClick={() => props.onShowState(HeroModalType.Inventory)}>Inventory</Button>
								<Button block={true} type='text' onClick={() => props.onShowState(HeroModalType.Projects)}>Projects</Button>
								<Button block={true} type='text' onClick={() => props.onShowState(HeroModalType.Titles)}>Titles</Button>
								<Button block={true} type='text' onClick={() => props.onShowState(HeroModalType.Respite)}>Respite</Button>
								<Divider />
								<Button block={true} type='text' onClick={() => props.onShowState(HeroModalType.Customize)}>Customize</Button>
								<Button block={true} type='text' onClick={() => props.onShowState(HeroModalType.Conditional)}>Conditional Features</Button>
								<Button block={true} type='text' onClick={() => props.onShowState(HeroModalType.Sourcebooks)}>Sourcebooks</Button>
							</Space>
						}
					>
						<Button>Tools</Button>
					</Popover>
					:
					<ButtonGroup
						buttons={[
							{ type: 'button', label: 'Resources', onClick: () => props.onShowState(HeroModalType.Resources) },
							{ type: 'button', label: 'Vitals', onClick: () => props.onShowState(HeroModalType.Vitals) },
							{ type: 'button', label: 'Inventory', onClick: () => props.onShowState(HeroModalType.Inventory) },
							{ type: 'button', label: 'Projects', onClick: () => props.onShowState(HeroModalType.Projects) },
							{ type: 'button', label: 'Titles', onClick: () => props.onShowState(HeroModalType.Titles) },
							{ type: 'button', label: 'Respite', onClick: () => props.onShowState(HeroModalType.Respite) },
							{
								type: 'control',
								control: (
									<Popover
										trigger='click'
										content={
											<Space orientation='vertical' style={{ width: '150px' }}>
												<Button type='text' block={true} onClick={() => { props.onShowState(HeroModalType.Customize); setOpen(false); }}>Customize</Button>
												<Button type='text' block={true} onClick={() => { props.onShowState(HeroModalType.Conditional); setOpen(false); }}>Conditional Features</Button>
												<Button type='text' block={true} onClick={() => { props.onShowState(HeroModalType.Sourcebooks); setOpen(false); }}>Sourcebooks</Button>
											</Space>
										}
										open={open}
										onOpenChange={setOpen}
									>
										<Button type='text' icon={<EllipsisOutlined />} />
									</Popover>
								)
							}
						]}
					/>
			}
		>
			{props.hero.name || 'Unnamed Hero'}
		</HeaderText>
	);
};
