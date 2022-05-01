## Description

Render each frame of a video into pictures.

## Requirements

- NPM/Node.js - https://nodejs.org/
- FFMPEG - https://ffmpeg.org/

## Installation

```sh
$ npm -g i osint-media-fbf
```

## Command Line

```sh

$ osintfbf --help
Usage: main [options] [command]

Options:
  -h, --help      display help for command

Commands:
  file [options]
  help [command]  display help for command
```

```sh
$ osintfbf file --help

Usage: main file [options]

Options:
  -i, --input [path]       Input file path.
  -o, --output [path]      Output folder path.
  -x, --scale [number]     Scale up picture in size vs video resolution.
  -s, --size [string]      Set different size resolution for picture vs video resolution.
  -ss, --seek [string]     Seek to timestamp in video before starting.
  -d, --duration [string]  Render until certain duration in video after starting.
  -h, --help               display help for command
```

## Examples

### Upscale 3x

```sh

osintfbf file -i testfolder/test.mp4 -o testfolder/export -x 3

```

### Force resolution to 1080p

```sh

osintfbf file -i testfolder/test.mp4 -o testfolder/export -s 1920x1080

```

### start in video at 31 seconds
```sh
osintfbf file -i testfolder/test.mp4 -o testfolder/export -ss 31
```
### start in video at 31 seconds and render only 15 seconds after.
```sh
osintfbf file -i testfolder/test.mp4 -o testfolder/export -ss 31 -d 15
```
### render only first 20 seconds of video.
```sh
osintfbf file -i testfolder/test.mp4 -o testfolder/export -d 20
```