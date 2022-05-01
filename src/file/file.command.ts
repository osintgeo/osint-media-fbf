import { Command, CommandRunner, Option } from 'nest-commander';
import { existsSync } from 'fs';
import { join as pathJoin, resolve as pathResolve } from 'path';
import * as Ffmpeg from 'fluent-ffmpeg';
/**
 * @description
 * @interface FileCommandOptions
 */
interface FileCommandOptions {
  seek?: any;
  duration?: any;
  size?: any;
  scale?: any;
  input: string;
  output: string;
}
/**
 * @description
 * @export
 * @class FileCommand
 * @implements {CommandRunner}
 */
@Command({ name: 'file', options: { isDefault: false } })
export class FileCommand implements CommandRunner {
  /**
   * @description
   * @param {string[]} inputs
   * @param {FileCommandOptions} options
   * @return {*}  {Promise<void>}
   * @memberof FileCommand
   */
  async run(inputs: string[], options: FileCommandOptions): Promise<void> {
    if (options.input && options.output) {
      try {
        const ffmpeg = new Ffmpeg();
        ffmpeg.addInput(options.input);
        ffmpeg.noAudio();
        if (options.seek) {
          ffmpeg.seek(options.seek);
        }
        if (options.duration) {
          ffmpeg.duration(options.duration);
        }
        if (options.size) {
          ffmpeg.size(options.size).autopad();
        } else if (options.scale) {
          ffmpeg.size(options.scale * 100 + '%').autopad();
        }
        ffmpeg.output(pathJoin(options.output, '%04d.png'));
        ffmpeg.run();
      } catch (ffmpegErr) {
        console.log(ffmpegErr);
      }
    }
  }

  /**
   * @description
   * @param {string} val
   * @return {*}
   * @memberof FileCommand
   */
  @Option({
    flags: '-i, --input <path>',
    description: 'Input file path.',
    required: true,
  })
  parseInputFile(val: string): any {
    if (existsSync(pathResolve(val))) {
      return pathResolve(val);
    } else {
      return false;
    }
  }
  /**
   * @description
   * @param {string} val
   * @return {*}
   * @memberof FileCommand
   */

  @Option({
    flags: '-o, --output <path>',
    description: 'Output folder path.',
    required: true,
  })
  parseOutputFolder(val: string): any {
    if (existsSync(pathResolve(val))) {
      return pathResolve(val);
    } else {
      console.log('Output folder target not writable');
      return;
    }
  }

  /**
   * @description
   * @param {number} val
   * @return {*}
   * @memberof FileCommand
   */
  @Option({
    flags: '-x, --scale [number]',
    description: 'Scale up picture in size vs video resolution.',
    required: false,
  })
  parseScaleOption(val: number): any {
    if (Number.isInteger(val * 1) && val * 1 > 0 && val * 1 < 10) {
      return val * 1;
    } else {
      console.log('Scaling option is not an Integer or between 1-10.');
      return;
    }
  }

  /**
   * @description
   * @param {*} val
   * @return {*}
   * @memberof FileCommand
   */
  @Option({
    flags: '-s, --size [string]',
    description:
      'Set different size resolution for picture vs video resolution.',
    required: false,
  })
  parseSizeOption(val: any): any {
    const splitX = val.split('x');
    if (Number.isInteger(splitX[0]) && Number.isInteger(splitX[1])) {
      return val;
    } else if (Number.isInteger(splitX[0]) && !splitX[0]) {
      return val;
    } else if (Number.isInteger(val * 1)) {
      return val * 1;
    } else {
      return;
    }
  }

  /**
   * @description
   * @param {*} val
   * @return {*}
   * @memberof FileCommand
   */
  @Option({
    flags: '-ss, --seek [string]',
    description: 'Seek to timestamp in video before starting.',
    required: false,
  })
  parseSeekOption(val: any): any {
    const splitX = val.split(':');
    if (Number.isInteger(splitX[0]) && Number.isInteger(splitX[1])) {
      return val;
    } else if (Number.isInteger(splitX[0]) && !splitX[0]) {
      return val;
    } else if (Number.isInteger(val * 1)) {
      return val * 1;
    } else {
      return;
    }
  }

  /**
   * @description
   * @param {*} val
   * @return {*}
   * @memberof FileCommand
   */
  @Option({
    flags: '-d, --duration [string]',
    description: 'Render until certain duration in video after starting.',
    required: false,
  })
  parseDurationOption(val: any): any {
    const splitX = val.split(':');
    if (Number.isInteger(splitX[0]) && Number.isInteger(splitX[1])) {
      return val;
    } else if (Number.isInteger(splitX[0]) && !splitX[0]) {
      return val;
    } else if (Number.isInteger(val * 1)) {
      return val * 1;
    } else {
      return;
    }
  }
}
