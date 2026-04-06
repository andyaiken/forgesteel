import { Button, Divider, Popover, Space } from 'antd';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroModalType } from '@/enums/hero-modal-type';
import { HeroToken } from '../../token/token';
import { Options } from '@/models/options';
import { ToolOutlined } from '@ant-design/icons';
import { useIsSmall } from '@/hooks/use-is-small';

interface Props {
	hero: Hero;
	options: Options;
	onShowState: (type: HeroModalType) => void;
}

export const NamePanel = (props: Props) => {
	const isSmall = useIsSmall();

	return (
		<HeaderText
			style={{ margin: '0 5px 10px 5px' }}
			level={props.options.compactView ? 2 : 1}
			ribbon={props.hero.picture ? <HeroToken hero={props.hero} size={props.options.compactView ? 21 : 34} /> : null}
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
							{ type: 'button', icon: <ToolOutlined />, tooltip: 'Customize', onClick: () => props.onShowState(HeroModalType.Customize) }
						]}
					/>
			}
		>
			{props.hero.name || 'Unnamed Hero'}
		</HeaderText>
	);
};
