export type Resolve<T> = (value?: T | PromiseLike<T> | undefined) => void;

export interface ResolveArray<T> extends Array<Resolve<T>> {
    [id: number]: Resolve<T>;
}

export interface WebRconSendPacket {
    Identifier: number;
    Message: string;
    Name: string;
}

export interface WebRconReceivePacket {
    Identifier: number;
    Message: string;
    Type: string;
    Stacktrace: string;
}