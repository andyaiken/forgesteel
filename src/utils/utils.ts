import { Converter } from 'showdown';
import { Random } from './random';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export class Utils {
	static guid = (): string => {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
		let id = '';
		while (id.length < 16) {
			const n = Random.randomNumber(letters.length);
			id += letters[n];
		}
		return id;
	};

	static debounce = (func: () => void, delay = 500) => {
		let timeout: number;
		return () => {
			clearTimeout(timeout);
			timeout = setTimeout(func, delay);
		};
	};

	static showdownConverter = new Converter({ simpleLineBreaks: true, tables: true });

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

	static export = (id: string, name: string, obj: unknown, ext: string, format: 'image' | 'pdf' | 'json') => {
		switch (format) {
			case 'json':
				Utils.saveFile(obj, name, ext);
				break;
			case 'image':
			case 'pdf':
				Utils.takeScreenshot(id, name, format);
				break;
		}
	};

	static takeScreenshot = (elementID: string, name: string, format: 'image' | 'pdf') => {
		const element = document.getElementById(elementID);
		if (element) {
			html2canvas(element)
				.then(canvas => {
					switch (format) {
						case 'image':
							Utils.saveImage(`${name}.png`, canvas);
							break;
						case 'pdf':
							Utils.savePDF(`${name}.pdf`, canvas);
							break;
					}
				});
		}
	};

	static saveFile = (data: unknown, name: string, type: string) => {
		const json = JSON.stringify(data, null, '\t');
		const blob = new Blob([ json ], { type: 'application/json' });

		const a = document.createElement('a');
		a.download = `${name}.drawsteel.${type}`;
		a.href = window.URL.createObjectURL(blob);
		a.click();
	};

	static saveImage = (filename: string, canvas: HTMLCanvasElement) => {
		const a = document.createElement('a');
		a.download = filename;
		a.href = canvas.toDataURL('image/png').replace(/^data:image\/png/, 'data:application/octet-stream');
		a.click();
	};

	static savePDF = (filename: string, canvas: HTMLCanvasElement) => {
		const pdf = new jsPDF('p', 'pt', [ canvas.width, canvas.height ]);
		pdf.addImage(canvas, 'PNG', 0, 0, canvas.width, canvas.height);
		pdf.save(filename);
	};
}
