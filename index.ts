import * as fs from 'fs';
import { sortBy, filter } from 'lodash';

const [source, outputTo]: string[] = getArgs();
fs.readFile(source, (readError, data) => {
	if (readError) {
		throw readError;
	}

	const words = toWords(data.toString());
	const sorted = alphabetize(words);
	fs.writeFile(outputTo, toFileString(sorted), writeError => {
		if (writeError) {
			throw writeError;
		}

		console.log(`${source} -> alphabetize -> ${outputTo}`);
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
