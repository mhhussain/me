let pipes = require('amqplib/callback_api');

let secrets = require('./secrets');

pipes.connect(secrets.amqp.url, {auth: secrets.amqp.auth}, (err, conn) => {
    conn.createChannel((err, ch) => {
        let q = 'bunnyheart_venacava';

        ch.assertQueue(q, {durable: true});
        ch.sendToQueue(q, new Buffer('hello world'), {persistent: true});
    });
});

return;