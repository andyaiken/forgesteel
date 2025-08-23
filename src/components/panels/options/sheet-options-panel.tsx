import { Segmented, Space, Tag } from 'antd';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Options } from '../../../models/options';
import { PdfTemplateEnum } from '../../../models/pdf-export-models';
import { Toggle } from '../../controls/toggle/toggle';

import './sheet-options-panel.scss';

interface Props {
	mode: 'hero';
	options: Options;
	setOptions: (options: Options) => void;
}

export const SheetOptionsPanel = (props: Props) => {
	const setTemplate = (value: PdfTemplateEnum) => {
		props.setOptions({
			...props.options,
			pdfTemplate: value
		});
	};

	const setKeepFillable = (value: boolean) => {
		props.setOptions({
			...props.options,
			keepPdfFillable: value
		});
	};

	const setIncludePlayState = (value: boolean) => {
		props.setOptions({
			...props.options,
			includePlayState: value
		});
	};

	const getContent = () => {
		switch (props.mode) {
			case 'hero':
				return (
					<>
						<Space direction='vertical'>
							<Segmented
								block={true}
								options={[
									{ value: PdfTemplateEnum.Portrait, label: <div>Portrait</div> },
									{ value: PdfTemplateEnum.Landscape, label: <div>Landscape</div> },
									{ value: PdfTemplateEnum.HTML, label: <div><Tag color='blue'>NEW</Tag>Fancy</div> }
								]}
								value={props.options.pdfTemplate}
								onChange={setTemplate}
							/>
							{
								[ PdfTemplateEnum.Portrait, PdfTemplateEnum.Landscape ].includes(props.options.pdfTemplate) ?
									<Toggle
										label='Keep PDF template fillable'
										value={props.options.keepPdfFillable}
										onChange={setKeepFillable}
									/>
									: undefined
							}
							{
								props.options.pdfTemplate === PdfTemplateEnum.HTML ?
									<>
										<Toggle
											label='Include current play state'
											value={props.options.includePlayState}
											onChange={setIncludePlayState}
										/>
									</>
									: undefined
							}
						</Space>
					</>
				);
		}
	};

	try {
		return (
			<ErrorBoundary>
				<div className='sheet-options-panel'>
					{getContent()}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
