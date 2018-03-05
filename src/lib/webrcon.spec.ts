// Required for testin
import { expect } from 'chai';
import * as sinon from 'sinon';

import * as ws from 'ws';
import { WebRcon } from './webrcon';

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

    it('should connect to WebSocket server', async () => {
        const connection = await WebRcon.connect(
            `localhost:${socketServerOptions.port}`,
            password
        );
        connection.close();
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

    it('should send command to the server', (done) => {
        new Promise(async (resolve, reject) => {
            server.once('connection', (socket, request) => {
                socket.once('message', (data) => {
                    const parsedData = JSON.parse(data);
                    expect(parsedData.Message).to.equal('users');
                    done();
                });
            });
    
            const connection = await WebRcon.connect(
                `localhost:${socketServerOptions.port}`,
                password
            );
            await connection.command('users');
            connection.close();
        });
    });
});