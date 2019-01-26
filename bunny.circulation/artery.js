let pipes = require('amqplib/callback_api');

let secrets = require('./secrets');

function artery(name) {
    this.name = name;
    this.amqp_url = secrets.amqp.url;
    this.auth = secrets.amqp.auth;
};

artery.prototype.let = function(callback) {
    // console.log(this.name);
    pipes.connect(this.amqp_url, {auth: this.auth}, (err, conn) => {
        conn.createChannel((err, ch) => {
            let q = this.name;

            ch.assertQueue(q, {durable: true});
            ch.consume(q, (msg) => {
                callback(msg.content.toString());
            }, {noAck: true});
        });
    });
};

artery.prototype.hyperlet = function(callback) {
    // console.log(this.name);
    pipes.connect(this.amqp_url, {auth:this.auth}, (err, conn) => {
        conn.createChannel(callback);
    });
};

module.exports = artery;