import { Collections } from '@/utils/collections';
import { Converter } from 'showdown';
import { Random } from '@/utils/random';
import { SheetPageSize } from '@/enums/sheet-page-size';
import { domToImage } from 'modern-screenshot';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

export class Utils {
	static showdownConverter = new Converter({ simpleLineBreaks: true, tables: true });

	static isDev = () => {
		return window.location.hostname === 'localhost';
	};

	static guid = () => {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
		let id = '';
		while (id.length < 16) {
			const n = Random.randomNumber(letters.length);
			id += letters[n];
		}
		return id;
	};

	static hashCode = (str: string): number => {
		let h = 0;
		for (let i = 0; i < str.length; ++i) {
			h = (31 * h) + str.charCodeAt(i);
		}
		return h & 0xFFFFFFFF;
	};

	static copy = <T>(object: T) => {
		return JSON.parse(
			JSON.stringify(object)
		) as T;
	};

	static debounce = (func: () => void, delay = 500) => {
		let timeout: number;
		return () => {
			clearTimeout(timeout);
			timeout = setTimeout(func, delay);
		};
	};

	static textMatches = (sources: string[], searchTerm: string) => {
		if (!searchTerm) {
			return true;
		}

		const tokens = searchTerm
			.toLowerCase()
			.split(' ');

		return sources.some(text => tokens.every(token => text.toLowerCase().includes(token)));
	};

	static intersects = (light: { a: { x: number, y: number }, b: { x: number, y: number } }, wall: { a: { x: number, y: number }, b: { x: number, y: number } }) => {
		const det = (light.b.x - light.a.x) * (wall.b.y - wall.a.y) - (wall.b.x - wall.a.x) * (light.b.y - light.a.y);
		if (det === 0) {
			return false;
		} else {
			const lambda = ((wall.b.y - wall.a.y) * (wall.b.x - light.a.x) + (wall.a.x - wall.b.x) * (wall.b.y - light.a.y)) / det;
			const gamma = ((light.a.y - light.b.y) * (wall.b.x - light.a.x) + (light.b.x - light.a.x) * (wall.b.y - light.a.y)) / det;
			return (0 <= lambda && lambda <= 1) && (0 <= gamma && gamma <= 1);
		}
	};

	static export = (elementIDs: string[], name: string, obj: unknown, ext: string, format: 'image' | 'pdf' | 'json') => {
		switch (format) {
			case 'json':
				Utils.saveFile(obj, name, ext);
				break;
			case 'image':
			case 'pdf':
				Utils.takeScreenshot(elementIDs, name, format);
				break;
		}
	};

	static takeScreenshot = (elementIDs: string[], name: string, format: 'image' | 'pdf') => {
		const elements = elementIDs
			.map(id => document.getElementById(id))
			.filter(element => !!element);

		if (elements.length === 0) {
			return;
		}

		const originalBackgroundColors: { [id: string]: string } = {};
		elements.forEach(element => {
			originalBackgroundColors[element.id] = element.style.backgroundColor;
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				element.style.backgroundColor = 'rgb(55, 55, 55)';
			}
		});

		switch (format) {
			case 'image':
				html2canvas(elements[0])
					.then(canvas => {
						Utils.saveImage(`${name}.png`, canvas);
						elements[0].style.backgroundColor = originalBackgroundColors[elements[0].id];
					});
				break;
			case 'pdf':
				Promise.all(elements.map(e => this.elementToImage(e, 1)))
					.then(images => {
						Utils.savePDF(`${name}.pdf`, images);
						elements.forEach(element => element.style.backgroundColor = originalBackgroundColors[element.id]);
					});
				break;
		}
	};

	static elementToImage = (element: HTMLElement, scale: number): Promise<HTMLImageElement> => {
		const width = element.clientWidth;
		const height = element.clientHeight;

		return domToImage(element, {
			width: width,
			height: height,
			scale: scale
		});
	};

	static elementsToPdf = async (elementIDs: string[], filename: string, pdfPaperSize: SheetPageSize, resolution: 'standard' | 'high') => {
		const elements = elementIDs
			.map(id => document.getElementById(id))
			.filter(element => !!element);

		if (elements.length === 0) {
			return;
		}
		let dpi = 150;
		let scale = 1;
		if (resolution === 'high') {
			dpi = 600;
			scale = 4;
		} else {
			dpi = 300;
			scale = 2;
		}

		return Promise.all(elements.map(e => this.elementToImage(e, scale)))
			.then(images => {
				Utils.savePdfPages(`${filename}.pdf`, images, pdfPaperSize, dpi);
			});
	};

	static saveFile = (data: unknown, name: string, type: string) => {
		const json = JSON.stringify(data, null, '\t');
		const blob = new Blob([ json ], { type: 'application/json' });

		const a = document.createElement('a');
		a.download = `${name}.ds-${type}`;
		a.href = window.URL.createObjectURL(blob);
		a.click();
	};

	static saveImage = (filename: string, canvas: HTMLCanvasElement) => {
		const a = document.createElement('a');
		a.download = filename;
		a.href = canvas.toDataURL('image/png').replace(/^data:image\/png/, 'data:application/octet-stream');
		a.click();
	};

	static savePDF = (filename: string, canvases: HTMLImageElement[]) => {
		const width = Collections.max(canvases.map(c => c.width), c => c) || 0;
		const height = Collections.max(canvases.map(c => c.height), c => c) || 0;

		const orientation = (height >= width) ? 'portrait' : 'landscape';

		const pdf = new jspdf(orientation, 'pt', [ width, height ]);
		canvases.forEach((canvas, n) => {
			const page = (n === 0) ? pdf : pdf.addPage([ width, height ], orientation);
			page.addImage(canvas, 'PNG', 0, 0, canvas.width, canvas.height);
		});

		pdf.save(filename);
	};

	static savePdfPages = async (filename: string, pageCanvases: HTMLImageElement[], pdfPaperSize: SheetPageSize, dpi: number) => {
		const width1 = pageCanvases[0].width || 0;
		const height1 = pageCanvases[0].height || 0;
		const documentOrientation = (height1 >= width1) ? 'portrait' : 'landscape';
		const paperSize = pdfPaperSize.toString().toLowerCase();

		// @ts-expect-error Undocumented
		const pdf = new jspdf({
			orientation: documentOrientation,
			unit: (72 / dpi), // undocumented feature to set arbitrary dpi, see: https://github.com/parallax/jsPDF/issues/1204#issuecomment-1291015995
			format: paperSize,
			hotfixes: [ 'px_scaling' ]
		});
		pageCanvases.forEach((canvas, n) => {
			const orientation = (canvas.height >= canvas.width) ? 'portrait' : 'landscape';
			const page = (n === 0) ? pdf : pdf.addPage(paperSize, orientation);
			page.addImage(canvas, 'PNG', 0, 0, canvas.width, canvas.height, undefined, 'FAST');
		});
		pdf.setDocumentProperties({
			title: filename.slice(0, -4),
			subject: 'Forge Steel Hero sheet',
			creator: 'Forge Steel'
		});
		pdf.save(filename);
	};

	static isNullOrEmpty = (str: string | undefined) => {
		return (str === null || str === undefined || str.trim() === '');
	};

	static valueOrDefault = (value: string | number | undefined, defaultValue: string): string => {
		let result = defaultValue;

		if (value && !Utils.isNullOrEmpty(value.toString())) {
			result = value.toString();
		}

		return result;
	};
}
