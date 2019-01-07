let pipes = require('amqplib/callback_api');

let secrets = require('./secrets');

let url = 'amqp://localhost';

let handle = (msg) => {
    console.log(msg);
};

pipes.connect(url, (err, conn) => {
    conn.createChannel((err, ch) => {
        let q = secrets.slack.bleed;

        ch.assertQueue(q, {durable: true});
        ch.consume(q, (msg) => {
            handle(msg.content.toString());
        }, {noAck: true});
    });
});
