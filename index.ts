import * as fs from 'fs';
import { sortBy, filter } from 'lodash';

fs.readFile('data.txt', (readError, data) => {
	if (readError) {
		throw readError;
	}

	const words = toWords(data.toString());
	const sorted = alphabetize(words);
	fs.writeFile('data.sorted.txt', toFileString(sorted), writeError => {
		if (writeError) {
			throw writeError;
		}
	});
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

function getArgs(): string[] {
	return process.argv.slice(2);
}
