let secrets = require('./secrets');

let pipes = require('amqplib/callback_api');


let drain = (name, callback) => {
    pipes.connect(secrets.amqp.url, {auth: secrets.amqp.auth}, (err, conn) => {
        conn.createChannel((err, ch) => {
            let q = name;

            ch.assertQueue(q, {durable: true});
            ch.consume(q, (msg) => {
                callback(ch, msg.content.toString());
            }, {noAck: true});
        });
    });
};

let hyperdrain = (callback) => {
    pipes.connect(secrets.amqp.url, {auth: secrets.amqp.auth}, (err, conn) => {
        conn.createChannel(callback);
    });
};

module.exports = {
    drain,
    hyperdrain
};
