let pipes = require('amqplib/callback_api');

let secrets = require('./secrets');

let pump = (resource) => {
    pipes.connect(secrets.amqp.url, {auth: secrets.amqp.auth}, (err, conn) => {
        conn.createChannel((err, ch) => {
            let q = resource.name;

            let sanguination = Buffer.from(JSON.stringify(resource));

            ch.assertQueue(q, {durable: true});
            ch.sendToQueue(q, new Buffer(sanguination), {persistent: true});
        });
    });
};

module.exports = {
    pump
};
