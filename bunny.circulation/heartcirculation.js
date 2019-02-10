let pipes = require('amqplib/callback_api');

class heartcirculation {

    constructor(name, mq) {
        this.name = name;
        this.mq = mq;
    };

    heartname() {
        return this.name;
    };

    pump(resource) {
        pipes.connect(this.mq.url, {auth: this.mq.auth}, (err, conn) => {
            conn.createChannel((err, ch) => {
                let q = resource.name;

                let sanguination = Buffer.from(JSON.stringify(resource));

                ch.assertQueue(q, {durable: true});
                ch.sendToQueue(q, new Buffer(sanguination), {persistent: true});
            });
        });
    };

    drain(name, callback) {
        pipes.connect(this.mq.url, {auth: this.mq.auth}, (err, conn) => {
            conn.createChannel((err, ch) => {
                let q = name;

                ch.assertQueue(q, {durable: true});
                ch.consume(q, (msg) => {
                    callback(ch, msg.content.toString());
                }, {noAck: true});
            });
        });
    };
};

module.exports = heartcirculation;
