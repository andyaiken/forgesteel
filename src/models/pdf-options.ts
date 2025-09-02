export interface PdfOptions {
	mode: 'portrait' | 'landscape' | 'html',
	formFillable?: boolean,
	resolution?: 'standard' | 'high';
}
