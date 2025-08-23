import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Converter } from 'showdown';
import { Collections } from './collections';
import { Random } from './random';

export class Utils {
	static showdownConverter = new Converter({ simpleLineBreaks: true, tables: true });

	static guid = (): string => {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
		let id = '';
		while (id.length < 16) {
			const n = Random.randomNumber(letters.length);
			id += letters[n];
		}
		return id;
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

	static export = (elementIDs: string[], name: string, obj: unknown, ext: string, format: 'image' | 'pdf' | 'json', overrideBgColors: boolean = true) => {
		switch (format) {
			case 'json':
				Utils.saveFile(obj, name, ext);
				break;
			case 'image':
			case 'pdf':
				Utils.takeScreenshot(elementIDs, name, format, overrideBgColors);
				break;
		}
	};

	static takeScreenshot = (elementIDs: string[], name: string, format: 'image' | 'pdf', overrideBgColors: boolean = true) => {
		const elements = elementIDs
			.map(id => document.getElementById(id))
			.filter(element => !!element);

		if (elements.length === 0) {
			return;
		}

		const originalBackgroundColors: { [id: string]: string } = {};
		if (overrideBgColors) {
			elements.forEach(element => {
				originalBackgroundColors[element.id] = element.style.backgroundColor;
				if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
					element.style.backgroundColor = 'rgb(55, 55, 55)';
				}
			});
		}

		switch (format) {
			case 'image':
				html2canvas(elements[0])
					.then(canvas => {
						Utils.saveImage(`${name}.png`, canvas);
						if (overrideBgColors) {
							elements[0].style.backgroundColor = originalBackgroundColors[elements[0].id];
						}
					});
				break;
			case 'pdf':
				Promise.all(elements.map(element => htmlToImage.toCanvas(element)))
					.then(canvases => {
						Utils.savePDF(`${name}.pdf`, canvases);
						if (overrideBgColors) {
							elements.forEach(element => element.style.backgroundColor = originalBackgroundColors[element.id]);
						}
					});
				break;
		}
	};

	static elementsToPdf(elementIDs: string[], filename: string) {
		const elements = elementIDs
			.map(id => document.getElementById(id))
			.filter(element => !!element);

		if (elements.length === 0) {
			return;
		}

		Promise.all(elements.map(element => htmlToImage.toCanvas(element)))
			.then(canvases => {
				Utils.savePdfPages(`${filename}.pdf`, canvases);
			});
	}

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

	static savePDF = (filename: string, canvases: HTMLCanvasElement[]) => {
		const width = Collections.max(canvases.map(c => c.width), c => c) || 0;
		const height = Collections.max(canvases.map(c => c.height), c => c) || 0;

		const orientation = (height >= width) ? 'portrait' : 'landscape';

		const pdf = new jsPDF(orientation, 'pt', [ width, height ]);
		canvases.forEach((canvas, n) => {
			const page = (n === 0) ? pdf : pdf.addPage([ width, height ], orientation);
			page.addImage(canvas, 'PNG', 0, 0, canvas.width, canvas.height);
		});

		pdf.save(filename);
	};

	static savePdfPages = (filename: string, pageCanvases: HTMLCanvasElement[]) => {
		const orientation = 'portrait';

		//@ts-ignore
		const pdf = new jsPDF({
			orientation: orientation,
			unit: (72 / 150), // undocumented feature, see: https://github.com/parallax/jsPDF/issues/1204#issuecomment-1291015995
			format: 'letter',
			hotfixes: ["px_scaling"],
		});
		pageCanvases.forEach((canvas, n) => {
			const page = (n === 0) ? pdf : pdf.addPage('letter', orientation);
			page.addImage(canvas, 'PNG', 0, 0, canvas.width, canvas.height);
		});

		pdf.save(filename);
	};

	static isNullOrEmpty = (str: string | undefined) => {
		return (str === null || str === undefined || str.trim() === '');
	}
}
