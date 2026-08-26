import { readFileSync } from 'fs';

const fileContents: string = readFileSync('postalcodes.csv', 'utf-8').trim();
const lines: string[] = fileContents.split('\n');

const query: string | undefined = process.argv.slice(2).join(' ').trim();

if (!query) {
    process.exit(0);
}

const isPostalCode = /^\d+$/.test(query);

if (isPostalCode) {
    for (const line of lines) {
        const [code, name] = line.split(',');
        if (code === query) {
            console.log(name);
            break;
        }
    }
} else {
    const queryLower = query.toLowerCase();
    const codes: string[] = [];

    for (const line of lines) {
        const [code, name] = line.split(',');
        if (name.toLowerCase() === queryLower) {
            codes.push(code);
        }
    }

    if (codes.length > 0) {
        codes.sort();
        console.log(codes.join(', '));
    }
}
