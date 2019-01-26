let pipes = require('amqplib/callback_api');

let secrets = require('./secrets');
let name = 'bunnyslack_out';
let url = 'amqp://localhost';

pipes.connect(secrets.amqp.url, {auth: secrets.amqp.auth}, (err, conn) => {
    conn.createChannel((err, ch) => {
        let q = 'bunnyheart_venacava';

        ch.assertQueue(q, {durable: true});
        ch.consume(q, (msg) => {
            console.log(msg.content.toString());
        }, {noAck: true});
    });
});

return;