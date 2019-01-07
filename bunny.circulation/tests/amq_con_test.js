let pipes = require('amqplib/callback_api');

let name = 'bunnyslack_out';
let url = 'amqp://localhost';

console.log('1');
pipes.connect(url, (err, conn) => {
    
    console.log('2');

    conn.createChannel((err, ch) => {
        let q = name;
    
        console.log('3');
    
        ch.assertQueue(q, {durable: true});

        console.log('4');

        ch.consume(q, (msg) => {
            console.log(msg.content.toString());
        }, {noAck: true});
    });
});

return;