// Required for testin
import { expect } from 'chai';
import * as sinon from 'sinon';

import * as ws from 'ws';
import { WebRcon } from './webrcon';
import { WebRconSendPacket, WebRconReceivePacket } from './interfaces';

describe('Class Webrcon', () => {
    const password = 'p4ssword';
    const port = 3001;
    const socketServerOptions: ws.ServerOptions = {
        port: port,
        path: `/${password}`,
    };

    let server: ws.Server;

    before(() => {
        server = new ws.Server(socketServerOptions);
    });

    after(() => {
        server.close();
    });

    it('should connect to WebSocket server', (done) => {
        server.once('connection', (socket, request) => {
            done();
        });

        WebRcon.connect(
            `localhost:${socketServerOptions.port}`,
            password
        ).then(connection => connection.close());
    });

    it('should subscribe message event once', async () => {
        const onSpy = sinon.spy(ws.prototype, 'on');

        const connection = await WebRcon.connect(
            `localhost:${socketServerOptions.port}`,
            password
        );
        connection.close();

        expect(onSpy.withArgs('message', sinon.match.func).callCount).to.equal(1);
    });

    it('should send message to server', (done) => {
        const testMessage = 'test';
        server.once('connection', (socket, request) => {
            socket.once('message', (data: string) => {
                var parsed = JSON.parse(data) as WebRconSendPacket;
                expect(parsed.Identifier).to.eq(1);
                expect(parsed.Message).to.eq(testMessage);
                expect(parsed.Name).to.eq('WebRcon');
                done();
            });
        });

        WebRcon.connect(
            `localhost:${socketServerOptions.port}`,
            password
        ).then(connection => {
           var result = connection.command(testMessage).then(x => connection.close());
        });
    });

    it('should listen for message reply', (done) => {
        const replyMessage = {
            Message: 'pong',
        } as WebRconReceivePacket;
        const testMessage = 'ping';
        
        server.once('connection', (socket: ws, request) => {
            socket.once('message', (data: string) => {
                var parsed = JSON.parse(data) as WebRconSendPacket;
                expect(parsed.Message).to.eq(testMessage);
                replyMessage.Identifier = parsed.Identifier;
                socket.send(JSON.stringify(replyMessage));
            });
        });

        WebRcon.connect(
            `localhost:${socketServerOptions.port}`,
            password
        ).then(async (connection) => {
           var result = await connection.command(testMessage);
           expect(result).to.eq(replyMessage.Message);
           connection.close();
           done();
        });
    });

    it('should relay unknown messages', (done) => {
        const replyMessage = {
            Message: 'pong',
        } as WebRconReceivePacket;

        var client;
        server.once('connection', (socket: ws, request) => {
            client = socket;
        });

        WebRcon.connect(
            `localhost:${socketServerOptions.port}`,
            password
        ).then(async (connection) => {
            connection.on('message', (data) => {
                expect(data.Message).to.eq(replyMessage.Message);
            });

            client.send(JSON.stringify(replyMessage));

            connection.close();
            done();
         });
    })
});