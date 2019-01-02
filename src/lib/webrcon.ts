import * as ws from 'ws';
import { ResolveArray, WebRconSendPacket, WebRconReceivePacket } from './interfaces';
import { EventEmitter } from 'events';

export class WebRcon extends EventEmitter {
    private _connection: ws | undefined;
    private _address: string;
    private _password: string;
    private _seq: number;
    private _resolves: ResolveArray<string>;

    static connect = async (address: string, password: string): Promise<WebRcon> => {
        const webRcon = new WebRcon(address, password);
        return await webRcon.connect();
    }

    constructor(address: string, password: string) {
        super();
        this._address = address;
        this._password = password;
        this._connection = undefined;
        this._seq = 1;
        this._resolves = [];
    }

    connect = (): Promise<WebRcon> => {
        return new Promise<WebRcon>((resolve, reject) => {
            this._connection = new ws(`ws://${this._address}/${this._password}`);
            this._connection.on('error', (data) => {
                this.emit('error', data);
            });
            this._connection.on('open', () => {
                resolve(this);
            });
            this._connection.on('message', this._handleMessage);
            this._connection.on('close', () => this.emit('close'));
        });
    }

    close = (): void => this._connection!.close();

    reconnect = async (): Promise<void> => {
        if(this._connection!.readyState === ws.OPEN) {
            this.close();
        }
        this._connection = undefined;
        await this.connect();
    }

    command = (command: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const identifier = this._seq++;
            this._resolves[identifier] = resolve;

            const packet: WebRconSendPacket = {
                Identifier: identifier,
                Message: command,
                Name: 'WebRcon'
            };

            this._connection!.send(JSON.stringify(packet));
        });
    }

    private _handleMessage = (data: ws.Data) => {
        const packet = this._parsePacket(data as string);
        
        if (!this._resolves[packet.Identifier]) {
            if (packet.Type === 'Chat') {
                this.emit('chat', JSON.parse(packet.Message))
            }
            return this.emit('message', packet);
        }

        return this._resolves[packet.Identifier](packet.Message);
    }

    private _parsePacket = (data: string): WebRconReceivePacket => JSON.parse(data);
}