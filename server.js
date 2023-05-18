import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3002 });
// When a client connects
wss.on('connection', client => {
    // When a client sends a message
    client.on('message', (message, isBinary) => {
        message = isBinary ? message.toString() : message;
        if (`${message}`.trim().length !== 0) {

            // Send the message to all other clients
            [...wss.clients]
                .filter(c => c !== client)
                .forEach(c => c.send(message));
        }
    });
});