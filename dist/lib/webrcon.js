"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ws = require("ws");
var WebRcon = /** @class */ (function () {
    function WebRcon(address, password) {
        var _this = this;
        this.connect = function () {
            return new Promise(function (resolve, reject) {
                _this._connection = new ws("ws://" + _this._address + "/" + _this._password);
                _this._connection.on('open', function () {
                    resolve(_this);
                });
                _this._connection.on('message', _this._handleMessage);
            });
        };
        this.close = function () { return _this._connection.close(); };
        this.command = function (command) {
            return new Promise(function (resolve, reject) {
                var identifier = _this._seq++;
                _this._resolves[identifier] = resolve;
                var packet = {
                    Identifier: identifier,
                    Message: command,
                    Name: 'WebRcon'
                };
                _this._connection.send(JSON.stringify(packet));
            });
        };
        this._handleMessage = function (data) {
            var packet = _this._parsePacket(data);
            if (!_this._resolves[packet.Identifier]) {
                // Some other message...
                return;
            }
            _this._resolves[packet.Identifier](packet.Message);
        };
        this._parsePacket = function (data) { return JSON.parse(data); };
        this._address = address;
        this._password = password;
        this._connection = undefined;
        this._seq = 1;
        this._resolves = [];
    }
    WebRcon.connect = function (address, password) { return __awaiter(_this, void 0, void 0, function () {
        var webRcon;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    webRcon = new WebRcon(address, password);
                    return [4 /*yield*/, webRcon.connect()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return WebRcon;
}());
exports.WebRcon = WebRcon;
