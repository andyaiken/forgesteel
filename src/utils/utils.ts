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

	// From: https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
	static hashCode = (str: string, seed: number = 0): number => {
		let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
		for (let i = 0, ch; i < str.length; i++) {
			ch = str.charCodeAt(i);
			h1 = Math.imul(h1 ^ ch, 2654435761);
			h2 = Math.imul(h2 ^ ch, 1597334677);
		}
		h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
		h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
		h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
		h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
		return 4294967296 * (2097151 & h2) + (h1 >>> 0);
	};

	static copy = <T>(object: T) => {
		if (typeof structuredClone === 'function') {
			return structuredClone<T>(object);
		}

		return JSON.parse(JSON.stringify(object)) as T;
	};

	static wait = (ms: number = 1000) => {
		return new Promise<void>(resolve => setTimeout(resolve, ms));
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

	static exportData = (name: string, obj: unknown, ext: string) => {
		Utils.saveFile(obj, name, ext);
	};

	static exportImage = (elementIDs: string[], name: string) => {
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

		elements.forEach((element, n) => {
			html2canvas(element)
				.then(canvas => {
					const filename = (elements.length > 1) ? `${name} ${n + 1}.png` : `${name}.png`;
					Utils.saveImage(filename, canvas);
					element.style.backgroundColor = originalBackgroundColors[element.id];
				});
		});
	};

	static elementToImage = (element: HTMLElement, scale: number): Promise<HTMLImageElement> => {
		const width = element.clientWidth;
		const height = element.clientHeight;

		// see: https://github.com/qq15725/modern-screenshot/issues/104
		const fontScaleFix = (node: Node) => {
			if (node instanceof HTMLElement) {
				node.style.fontSize = node.style.fontSize.replace(/(\d+(\.\d+)?(e[+-]?\d+)?)/g, (match, number) => {
					const parsedNumber = parseFloat(number);
					return isNaN(parsedNumber) ? match : (parsedNumber * 0.999).toString();
				});
			}
		};

		return domToImage(element, {
			width: width,
			height: height,
			scale: scale,
			onCloneEachNode: fontScaleFix
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
		const blob = new Blob([ json ], { type: 'application/octet-stream' });

		const a = document.createElement('a');
		a.download = `${name}.ds-${type}`;
		a.href = window.URL.createObjectURL(blob);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	static saveImage = (filename: string, canvas: HTMLCanvasElement) => {
		const a = document.createElement('a');
		a.download = filename;
		a.href = canvas.toDataURL('image/png').replace(/^data:image\/png/, 'data:application/octet-stream');
		a.click();
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

	static isNullOrEmpty = (str: string | null | undefined) => {
		return (str === null || str === undefined || str.trim() === '');
	};

	// Returns the given default if the value is:
	//    - null
	//    - undefined
	//    - an empty string
	//    - ZERO (0)
	// Otherwise, returns the value as a string.
	static valueOrDefault = (value: string | number | null | undefined, defaultValue: string): string => {
		let result = defaultValue;

		if (value && !Utils.isNullOrEmpty(value.toString())) {
			result = value.toString();
		}

		return result;
	};

	static fixHostnameUrl = (value: string) => {
		return value.toLowerCase().replace(/\/+$/, '');
	};

	static getErrorMessage = (error: unknown): string => {
		if (error instanceof Error) {
			return error.message;
		}
		return String(error);
	};
}
