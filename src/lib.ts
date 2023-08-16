import { Command } from 'commander';
import fs from 'fs';
import iconv from 'iconv-lite';
import path from 'path';
import { CommandParameters, isCommandParameters } from './types';

/**
 * メイン処理
 * @param params
 */
export function main() {
    const params = parseArguments();

    if (!fs.existsSync(params.destination)) {
        fs.mkdirSync(params.destination, { recursive: true });
    }

    const files = fs.readdirSync(params.source).filter((file) => path.extname(file) === '.txt');

    files.forEach((file) => {
        const sourceFilePath = path.join(params.source, file);
        const destFilePath = path.join(params.destination, file);

        const [original, converted] = convert(sourceFilePath, params.from, destFilePath, params.to);
        compare(file, original, converted);
    });

    console.log('Conversion completed.');
}

/**
 * 引数をパースする
 * @returns
 */
function parseArguments(): CommandParameters {
    const program = new Command();

    program
        .option('-s, --source <path>', 'Source directory')
        .option('-d, --destination <path>', 'Destination directory')
        .option('-f, --from <charset>', 'Original charset')
        .option('-t, --to <charset>', 'Target charset')
        .parse(process.argv);

    const params = program.opts();

    if (!isCommandParameters(params)) {
        throw new Error('All parameters are required.');
    }

    if (params.source === params.destination) {
        throw new Error('Source and destination directories cannot be the same.');
    }

    return params;
}

/**
 * ファイルの文字コードを変換
 * @param sourceFilePath
 * @param sourceEncode
 * @param destFilePath
 * @param destEncode
 * @returns [元ファイルの内容, 変換後ファイルの内容]
 */
function convert(
    sourceFilePath: string,
    sourceEncode: string,
    destFilePath: string,
    destEncode: string
): [string, string] {
    const content = fs.readFileSync(sourceFilePath);
    const convertedContent = iconv.decode(content, sourceEncode);
    const finalContent = iconv.encode(convertedContent, destEncode);

    fs.writeFileSync(destFilePath, finalContent);

    const convertedFinalContent = iconv.decode(finalContent, destEncode);
    return [convertedContent, convertedFinalContent];
}

/**
 * 比較結果
 */
interface CompareResult {
    line: number;
    original: string;
    converted: string;
}

/**
 * 変換前後を比較する
 * @param fileName
 * @param original
 * @param converted
 */
function compare(fileName: string, original: string, converted: string) {
    const result: CompareResult[] = [];

    const originalLines = original.split('\n');
    const convertedLines = converted.split('\n');

    originalLines.forEach((line, index) => {
        if (line.length !== convertedLines[index].length) {
            result.push({ line: index + 1, original: line, converted: convertedLines[index] });
        }
    });

    if (result.length > 0) {
        console.log(`File: ${fileName}`);
        result.forEach((r) => {
            console.log(`  #${r.line}`);
            console.log(`    original : ${r.original}`);
            console.log(`    converted: ${r.converted}`);
        });
    }
}
