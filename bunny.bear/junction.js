let pipes = require('amqplib/callback_api');

let vein = require('../bunny.circulation/vein');
let tracks = require('./tracks');
let secrets = require('./secrets');


let handle = (msg) => {

    let needle = new vein(tracks.slack.in);
    
    if (msg === 'hello world') {
        needle.inject('the world says hello back');
    } else {
        needle.inject('lorem ipsum');
    }
};

pipes.connect(secrets.amq_url, (err, conn) => {
    conn.createChannel((err, ch) => {
        let q = tracks.slack.out;

        ch.assertQueue(q, {durable: true});
        ch.consume(q, (msg) => {
            handle(msg.content.toString());
        }, {noAck: true});
    });
});
