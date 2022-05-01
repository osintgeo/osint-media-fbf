"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCommand = void 0;
const nest_commander_1 = require("nest-commander");
const fs_1 = require("fs");
const path_1 = require("path");
const Ffmpeg = require("fluent-ffmpeg");
let FileCommand = class FileCommand {
    async run(inputs, options) {
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
                }
                else if (options.scale) {
                    ffmpeg.size(options.scale * 100 + '%').autopad();
                }
                ffmpeg.output((0, path_1.join)(options.output, '%04d.png'));
                ffmpeg.run();
            }
            catch (ffmpegErr) {
                console.log(ffmpegErr);
            }
        }
    }
    parseInputFile(val) {
        if ((0, fs_1.existsSync)((0, path_1.resolve)(val))) {
            return (0, path_1.resolve)(val);
        }
        else {
            return false;
        }
    }
    parseOutputFolder(val) {
        if ((0, fs_1.existsSync)((0, path_1.resolve)(val))) {
            return (0, path_1.resolve)(val);
        }
        else {
            console.log('Output folder target not writable');
            return;
        }
    }
    parseScaleOption(val) {
        if (Number.isInteger(val * 1) && val * 1 > 0 && val * 1 < 10) {
            return val * 1;
        }
        else {
            console.log('Scaling option is not an Integer or between 1-10.');
            return;
        }
    }
    parseSizeOption(val) {
        const splitX = val.split('x');
        if (Number.isInteger(splitX[0]) && Number.isInteger(splitX[1])) {
            return val;
        }
        else if (Number.isInteger(splitX[0]) && !splitX[0]) {
            return val;
        }
        else if (Number.isInteger(val * 1)) {
            return val * 1;
        }
        else {
            return;
        }
    }
    parseSeekOption(val) {
        const splitX = val.split(':');
        if (Number.isInteger(splitX[0]) && Number.isInteger(splitX[1])) {
            return val;
        }
        else if (Number.isInteger(splitX[0]) && !splitX[0]) {
            return val;
        }
        else if (Number.isInteger(val * 1)) {
            return val * 1;
        }
        else {
            return;
        }
    }
    parseDurationOption(val) {
        const splitX = val.split(':');
        if (Number.isInteger(splitX[0]) && Number.isInteger(splitX[1])) {
            return val;
        }
        else if (Number.isInteger(splitX[0]) && !splitX[0]) {
            return val;
        }
        else if (Number.isInteger(val * 1)) {
            return val * 1;
        }
        else {
            return;
        }
    }
};
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-i, --input <path>',
        description: 'Input file path.',
        required: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], FileCommand.prototype, "parseInputFile", null);
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-o, --output <path>',
        description: 'Output folder path.',
        required: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], FileCommand.prototype, "parseOutputFolder", null);
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-x, --scale [number]',
        description: 'Scale up picture in size vs video resolution.',
        required: false,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], FileCommand.prototype, "parseScaleOption", null);
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-s, --size [string]',
        description: 'Set different size resolution for picture vs video resolution.',
        required: false,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], FileCommand.prototype, "parseSizeOption", null);
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-ss, --seek [string]',
        description: 'Seek to timestamp in video before starting.',
        required: false,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], FileCommand.prototype, "parseSeekOption", null);
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-d, --duration [string]',
        description: 'Render until certain duration in video after starting.',
        required: false,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], FileCommand.prototype, "parseDurationOption", null);
FileCommand = __decorate([
    (0, nest_commander_1.Command)({ name: 'file', options: { isDefault: false } })
], FileCommand);
exports.FileCommand = FileCommand;
//# sourceMappingURL=file.command.js.map