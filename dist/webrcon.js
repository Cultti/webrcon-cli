"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
class WebRcon {
    constructor() {
        this._connection = new ws_1.default("ws://rust1.aukko.net:28016/abba2017");
        console.log(this._connection);
    }
}
exports.WebRcon = WebRcon;
