import { CommandRunner } from 'nest-commander';
interface FileCommandOptions {
    seek?: any;
    duration?: any;
    size?: any;
    scale?: any;
    input: string;
    output: string;
}
export declare class FileCommand implements CommandRunner {
    run(inputs: string[], options: FileCommandOptions): Promise<void>;
    parseInputFile(val: string): any;
    parseOutputFolder(val: string): any;
    parseScaleOption(val: number): any;
    parseSizeOption(val: any): any;
    parseSeekOption(val: any): any;
    parseDurationOption(val: any): any;
}
export {};
