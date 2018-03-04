import ws from 'ws';

export class WebRcon {
    private _connection: ws | undefined;
    private _address: string;
    private _password: string;

    static connect = async (address: string, password: string): Promise<WebRcon> => {
        const webRcon = new WebRcon(address, password);
        return await webRcon.connect();
    }

    constructor(address: string, password: string) {
        this._address = address;
        this._password = password;
        this._connection = undefined;
    }

    connect = async (): Promise<WebRcon> => {
        return new Promise<WebRcon>((resolve, reject) => {
            this._connection = new ws(`${this._address}/${this._password}`);
            this._connection.on('open', () => {
                resolve(this);
            });
        });
    }
}