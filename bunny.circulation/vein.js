let pipes = require('amqplib/callback_api');
let secrets = require('./secrets');

function vein(name) {
    this.name = name;
    this.amqp_url = secrets.url;
}

vein.prototype.inject = function(resource) {
    // console.log(resource);
    pipes.connect(this.amqp_url, (err, conn) => {
        conn.createChannel((err, ch) => {
            let q = this.name;

            ch.assertQueue(q, {durable: true});
            ch.sendToQueue(q, new Buffer(resource), {persistent: true});
        });
    });
};

module.exports = vein;