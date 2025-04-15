import { ArrowUpOutlined } from '@ant-design/icons';

import './radial.scss';

interface Props {
	onChange: (dx: number, dy: number) => void;
}

export const Radial = (props: Props) => {
	try {
		return (
			<div className='radial'>
				<div className='row'>
					<div className='cell diagonal' onClick={() => props.onChange(-1, -1)}><ArrowUpOutlined rotate={-45} /></div>
					<div className='cell' onClick={() => props.onChange(0, -1)}><ArrowUpOutlined /></div>
					<div className='cell diagonal' onClick={() => props.onChange(1, -1)}><ArrowUpOutlined rotate={45} /></div>
				</div>
				<div className='row'>
					<div className='cell' onClick={() => props.onChange(-1, 0)}><ArrowUpOutlined rotate={-90} /></div>
					<div className='cell empty' />
					<div className='cell' onClick={() => props.onChange(1, 0)}><ArrowUpOutlined rotate={90} /></div>
				</div>
				<div className='row'>
					<div className='cell diagonal' onClick={() => props.onChange(-1, 1)}><ArrowUpOutlined rotate={-135} /></div>
					<div className='cell' onClick={() => props.onChange(0, 1)}><ArrowUpOutlined rotate={180} /></div>
					<div className='cell diagonal' onClick={() => props.onChange(1, 1)}><ArrowUpOutlined rotate={135} /></div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
