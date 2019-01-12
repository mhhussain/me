let pipes = require('amqplib/callback_api');
let secrets = require('./secrets');

function aorta() {
    this.amqp_url = secrets.amqp.url;
    this.auth = secrets.amqp.auth;
};

aorta.prototype.pump = function(resource) {
    pipes.connect(this.amqp_url, {auth: this.auth}, (err, conn) => {
        conn.createChannel((err, ch) => {
            let q = resource.name;

            let sanguination = Buffer.from(JSON.stringify(resource));

            ch.assertQueue(q, {durable: true});
            ch.sendToQueue(q, new Buffer(sanguination), {persistent: true});
        });
    });
};

module.exports = aorta;