let pipes = require('amqplib/callback_api');
let secrets = require('./secrets');

function vein(name) {
    this.name = name;
    this.amqp_url = 'amqp://localhost';
}

vein.prototype.inject = function(information) {
    pipes.connect(this.amqp_url, (err, conn) => {
        conn.createChannel((err, ch) => {
            let q = this.name;

            ch.assertQueue(q, {durable: true});
            ch.sendToQueue(q, new Buffer(information.text), {persistent: true});
        });
    });
};

module.exports = vein;