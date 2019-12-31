#!/usr/bin/env node
import * as cmder from 'commander';
import { WebRcon } from '../index';

// Load version
const version = require('../../package.json').version;

let ip: string;
let password: string;
let command: string;

cmder
    .version(version)
    .arguments('<ip> <password> [command]')
    .action((_ip, _password, _command) => {
        ip = _ip;
        password = _password;
        command = _command;
    })
    .parse(process.argv);

if (ip! === undefined || password! === undefined) {
    console.error('Invalid arguments given. Use "webrcon-cli -h" to get help');
    process.exit(1);
}

(async () => {
    const con = await WebRcon.connect(`${ip!}`, password!);
    if (command! === undefined) {
        con.on('message', (data) => {
            console.log(data.Message);
        });
    } else {
        const result = await con.command(command!, !command!.startsWith("say"));
        con.close();
        console.log(result);
    }
})();
