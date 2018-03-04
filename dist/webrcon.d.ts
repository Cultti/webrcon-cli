export declare class WebRcon {
    private _connection;
    private _address;
    private _password;
    private _seq;
    private _resolves;
    static connect: (address: string, password: string) => Promise<WebRcon>;
    constructor(address: string, password: string);
    connect(): Promise<WebRcon>;
    command: (command: string) => Promise<string>;
    private _handleMessage;
    private _parsePacket;
}
