export declare class WebRcon {
    private _connection;
    private _address;
    private _password;
    static connect: (address: string, password: string) => Promise<WebRcon>;
    constructor(address: string, password: string);
    connect: () => Promise<WebRcon>;
}
