let pipes = require('amqplib/callback_api');

class linkcirculation {

    constructor(linkname, heartname, mq) {
        this.linkname = linkname;
        this.heartname = heartname;
        this.mq = mq;
    };

    requeststrings() {
        let heartstring = {
            name: this.heartname + '_venacava',
            designator: this.linkname,
            designee: this.heartname,
            directive: {
                type: 'heartstrings'
            }
        };

        pipes.connect(this.mq.url, {auth: this.mq.auth}, (err, conn) => {
            conn.createChannel((err, ch) => {
                let q = heartstring.name;

                let sanguination = Buffer.from(JSON.stringify(heartstring));

                ch.assertQueue(q, {durable: true});
                ch.sendToQueue(q, new Buffer(sanguination), {persistent: true});
            });
        });

        console.log('heartstrings request sent');
    }

    inject(directive) {
        pipes.connect(this.mq.url, {auth: this.mq.auth}, (err, conn) => {
            conn.createChannel((err, ch) => {
                let q = this.linkname + '_vein';

                let resource = {
                    name: q,
                    designator: this.linkname,
                    designee: this.heartname,
                    directive: directive
                };

                let sanguination = Buffer.from(JSON.stringify(resource));

                ch.assertQueue(q, {durable: true});
                ch.sendToQueue(q, new Buffer(sanguination), {persistent: true});
            });
        });
    };

    let(callback) {
        pipes.connect(this.mq.url, {auth: this.mq.auth}, (err, conn) => {
            conn.createChannel((err, ch) => {
                let q = this.linkname + '_artery';

                ch.assertQueue(q, {durable: true});
                ch.consume(q, (msg) => {
                    callback(ch, msg.content.toString());
                }, {noAck: true});
            });
        });
    };
};

module.exports = linkcirculation;
