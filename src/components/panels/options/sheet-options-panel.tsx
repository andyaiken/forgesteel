import { Segmented, Space } from 'antd';
import { Options } from '../../../models/options';
import { PdfTemplateEnum } from '../../../models/pdf-export-models';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Toggle } from '../../controls/toggle/toggle';

import { HeaderText } from '../../controls/header-text/header-text';
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
			pdfTemplate: value,
		});
	};

	const setKeepFillable = (value: boolean) => {
		props.setOptions({
			...props.options,
			keepPdfFillable: value,
		});
	};

	const setIncludePlayState = (value: boolean) => {
		console.log('panel setting include state to', value);
		props.setOptions({
			...props.options,
			includePlayState: value,
		});
	};

	const getContent = () => {
		switch (props.mode) {
			case 'hero':
				return (
					<>
						<HeaderText
							level={2}>
							PDF Options
						</HeaderText>
						<Space direction="vertical">
							<Segmented
								options={[
									{ value: PdfTemplateEnum.HTML, label: 'HTML' },
									{ value: PdfTemplateEnum.Portrait, label: 'Portrait template' },
									{ value: PdfTemplateEnum.Landscape, label: 'Landscape template' },
								]}
								value={props.options.pdfTemplate}
								onChange={setTemplate}
							/>
							{[PdfTemplateEnum.Portrait, PdfTemplateEnum.Landscape].includes(props.options.pdfTemplate) ? (
								<Toggle label='Keep PDF template fillable'
									value={props.options.keepPdfFillable}
									onChange={setKeepFillable} />
							) : undefined}
						</Space>
						{props.options.pdfTemplate === PdfTemplateEnum.HTML ?
							<>
								<HeaderText
									level={2}>
									Character Display Options
								</HeaderText>
								<Toggle label='Include current play state'
									value={props.options.includePlayState}
									onChange={setIncludePlayState} />
							</>
							: undefined}
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
