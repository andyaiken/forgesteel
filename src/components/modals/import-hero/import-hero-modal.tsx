import { Button, Upload } from 'antd';
import { Hero } from '../../../models/hero';
import { UploadOutlined } from '@ant-design/icons';

import './import-hero-modal.scss';

interface Props {
	accept: (hero: Hero) => void;
}

export const ImportHeroModal = (props: Props) => {
	try {
		return (
			<div className='import-hero-modal'>
				<Upload
					accept='.drawsteel.hero'
					beforeUpload={info => {
						info.text().then(json => {
							const hero = (JSON.parse(json) as Hero);
							props.accept(hero);
						});
						return false;
					}}
				>
					<Button icon={<UploadOutlined />}>Upload a Hero</Button>
				</Upload>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
