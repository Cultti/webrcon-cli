"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
class WebRcon {
    constructor(address, password) {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._connection = new ws_1.default(`${this._address}/${this._password}`);
                this._connection.on('open', () => {
                    resolve(this);
                });
            });
        });
        this._address = address;
        this._password = password;
        this._connection = undefined;
    }
}
WebRcon.connect = (address, password) => __awaiter(this, void 0, void 0, function* () {
    const webRcon = new WebRcon(address, password);
    return yield webRcon.connect();
});
exports.WebRcon = WebRcon;
