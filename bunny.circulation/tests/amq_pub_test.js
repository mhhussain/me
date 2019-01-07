let pipes = require('amqplib/callback_api');

let url = 'amqp://localhost';
let name = 'bunnyslack_out'

pipes.connect(url, (err, conn) => {
    conn.createChannel((err, ch) => {
        let q = name;

        ch.assertQueue(q, {durable: true});
        ch.sendToQueue(q, new Buffer('hello world 1'), {persistent: true});
        ch.sendToQueue(q, new Buffer('hello world 2'), {persistent: true});
        ch.sendToQueue(q, new Buffer('hello world 3'), {persistent: true});
        ch.sendToQueue(q, new Buffer('hello world 4'), {persistent: true});
    });
});

return;