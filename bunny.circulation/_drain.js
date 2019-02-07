let pipes = require('amqplib/callback_api');

let secrets = require('./secrets');

pipes.connect(secrets.amqp.url, {auth: secrets.amqp.auth}, (err, conn) => {
    conn.createChannel((err, ch) => {
        let q = 'slackmessage_out';

        ch.assertQueue(q, {durable: true});
        ch.consume(q, (msg) => {
            console.log(msg.content.toString());
        }, {noAck: true});
    });
});

return;