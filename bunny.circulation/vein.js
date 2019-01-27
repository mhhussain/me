let pipes = require('amqplib/callback_api');

let secrets = require('./secrets');

let inject = (resource) => {
    pipes.connect(secrets.amqp.url, {auth: secrets.amqp.auth}, (err, conn) => {
        conn.createChannel((err, ch) => {
            let q = resource.name;

            ch.assertQueue(q, {durable: true});
            ch.sendToQueue(q, new Buffer(JSON.stringify(resource)), {persistent: true});
        });
    });
};

module.exports = {
    inject
};
