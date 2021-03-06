"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var events_1 = require("events");
var WebRcon = /** @class */ (function (_super) {
    __extends(WebRcon, _super);
    function WebRcon(address, password) {
        var _this = _super.call(this) || this;
        _this.connect = function () {
            return new Promise(function (resolve, reject) {
                _this._connection = new ws("ws://" + _this._address + "/" + _this._password);
                _this._connection.on('error', function (data) {
                    _this.emit('error', data);
                });
                _this._connection.on('open', function () {
                    resolve(_this);
                });
                _this._connection.on('message', _this._handleMessage);
                _this._connection.on('close', function () { return _this.emit('close'); });
            });
        };
        _this.close = function () { return _this._connection.close(); };
        _this.reconnect = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._connection.readyState === ws.OPEN) {
                            this.close();
                        }
                        this._connection = undefined;
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.command = function (command, wait) {
            if (wait === void 0) { wait = true; }
            return new Promise(function (resolve, reject) {
                var identifier = _this._seq++;
                var packet = {
                    Identifier: identifier,
                    Message: command,
                    Name: 'WebRcon'
                };
                _this._connection.send(JSON.stringify(packet));
                if (!wait) {
                    return resolve("Command executed: " + command);
                }
                _this._resolves[identifier] = resolve;
            });
        };
        _this._handleMessage = function (data) {
            var packet = _this._parsePacket(data);
            if (!_this._resolves[packet.Identifier]) {
                if (packet.Type === 'Chat') {
                    _this.emit('chat', JSON.parse(packet.Message));
                }
                return _this.emit('message', packet);
            }
            return _this._resolves[packet.Identifier](packet.Message);
        };
        _this._parsePacket = function (data) { return JSON.parse(data); };
        _this._address = address;
        _this._password = password;
        _this._connection = undefined;
        _this._seq = 1;
        _this._resolves = [];
        return _this;
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
}(events_1.EventEmitter));
exports.WebRcon = WebRcon;
