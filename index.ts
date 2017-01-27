import * as fs from 'fs';
import { sortBy, map } from 'lodash';

let [source, outputTo]: string[] = getArgs();

if (!source) {
	throw new Error('You must enter a source file');
}

if (!outputTo) {
	outputTo = 'randomized.txt';
}

fs.readFile(source, (readError, data) => {
	if (readError) {
		throw readError;
	}

	const lines = toLines(data.toString());
	const randomizedLines = map(lines, line => {
		return line.replace(/random/g, random(1000, 1000000).toString());
	});
	fs.writeFile(outputTo, toFileString(randomizedLines), writeError => {
		if (writeError) {
			throw writeError;
		}

		console.log(`${source} -> randomize -> ${outputTo}`);
	});
});

const newline = '\r\n';

function toLines(text: string): string[] {
	return text.split(newline);
}

function random(from: number, to: number): number {
	const seed = Math.random();
	const largestWholeNumber = Math.floor(seed * (to - from + 1));
	return largestWholeNumber + from;
}

function toFileString(lines: string[]): string {
	return [...lines, ''].join(newline);
}

function getArgs(): string[] {
	return process.argv.slice(2);
}
