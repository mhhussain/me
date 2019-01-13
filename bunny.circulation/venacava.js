let pipes = require('amqplib/callback_api');

let secrets = require('./secrets');

function venacava(name) {
    this.name = name;
    this.ampq_url = secrets.amqp.url;
    this.auth = secrets.amqp.auth;
};

venacava.prototype.drain = function(callback) {
    pipes.connect(this.ampq_url, {auth: this.auth}, (err, conn) => {
        conn.createChannel((err, ch) => {
            let q = this.name;

            ch.assertQueue(q, {durable: true});
            ch.consume(q, (msg) => {
                callback(msg.content.toString());
            }, {noAck: true});
        });
    });
};

module.exports = venacava;