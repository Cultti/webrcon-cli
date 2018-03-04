import ws from "ws";

export class WebRcon {
    private _connection: ws;

    constructor() {
        this._connection = new ws("ws://rust1.aukko.net:28016/abba2017");
        console.log(this._connection);
    }
}