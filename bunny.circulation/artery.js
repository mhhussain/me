let pipes = require('amqplib/callback_api');
let secrets = require('./secrets');

function artery(name) {
    this.name = name;
    this.amqp_url = 'amqp://localhost';
}

artery.prototype.let = function(callback) {
    // console.log(this.name);
    pipes.connect(this.amqp_url, (err, conn) => {
        conn.createChannel((err, ch) => {
            let q = this.name;

            ch.assertQueue(q, {durable: true});
            ch.consume(q, (msg) => {
                callback(msg.content.toString());
            }, {noAck: true});
        });
    });
};

module.exports = artery;