# WebRcon command line interface [![Build Status](https://travis-ci.org/Cultti/webrcon-cli.svg?branch=master)](https://travis-ci.org/Cultti/webrcon-cli) [![Coverage Status](https://coveralls.io/repos/github/Cultti/webrcon-cli/badge.svg)](https://coveralls.io/github/Cultti/webrcon-cli)
Cli and library to control servers that support webrcon. Eg. Rust.
### Basic usage:
Remember to enable webrcon in rust server by setting `rcon.web 1`
```
webrcon-cli 127.0.0.1:28016 p4ssw0rd "say Hello World"
```
### Install:
```
$ npm -g install webrcon-cli
```
### Help:
```
$ webrcon-cli -h

  Usage: webrcon-cli [options] <ip> <password> [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information
```
## Library
This package also includes asynchronous library to be used with node. Typings are included for typescript.
### Install:
```
$ npm install --save webrcon-cli
```
### Usage:
```typescript
import { WebRcon } from "webrcon-cli"

(async () => {
    const connection = await WebRcon.connect("localhost:28016", "p4ssw0rd");
    await connection.command("say Hello World");

    connection.on('message', (data) => {
        console.log(data);
    });

    connection.on('chat', (data) => {
        console.log(data);
    });
})
```
## License
Copyright 2020 Timo Salola

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
