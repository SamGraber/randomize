import * as fs from 'fs';
import { sortBy, filter } from 'lodash';

fs.readFile('data.txt', (error, data) => {
	const words = toWords(data.toString());
	const sorted = alphabetize(words);
	fs.writeFile('data.sorted.txt', toFileString(sorted));
});

const newline = '\r\n';

function toWords(text: string): string[] {
	return text.split(newline);
}

function alphabetize(words: string[]): string[] {
	return sortBy(filter(words, word => !!word));
}

function toFileString(words: string[]): string {
	return [...words, ''].join(newline);
}
