let pipes = require('amqplib/callback_api');

let secrets = require('./secrets');

function vein(name) {
    this.name = name;
    this.amqp_url = secrets.amqp.url;
    this.auth = secrets.amqp.auth;
};

vein.prototype.inject = function(resource) {
    // console.log(resource);
    pipes.connect(this.amqp_url, {auth: this.auth}, (err, conn) => {
        conn.createChannel((err, ch) => {
            let q = this.name;

            ch.assertQueue(q, {durable: true});
            ch.sendToQueue(q, new Buffer(JSON.stringify(resource)), {persistent: true});
        });
    });
};

module.exports = vein;