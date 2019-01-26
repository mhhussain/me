let whisper = require('./whisper');
let secrets = require('./secrets');
let command = require('./command');

let artery = require('../bunny.circulation/artery');
let vein = require('../bunny.circulation/vein');


let begin = () => {

    whisper('im up');

    // listen to heart
    let listenforping = (err, ch) => {
        let q = secrets.artery;

        ch.assertQueue(q, {durable: true});
        ch.consume(q, (msg) => {
            let blood = JSON.parse(msg.content.toString());

            let actioncontext = {
                action: blood.directive.type,
                details: blood,
                channel: ch
            };

            command.resolveaction(actioncontext);

        }, {noAck: true});
    };
    let capillary = new artery();
    capillary.hyperlet(listenforping);
    whisper('im listening');

    let requestheartstrings = {
        name: secrets.venacava,
        designator: 'bunnyslack',
        designee: 'bunnyhear',
        directive: {
            type: 'heartstrings'
        }
    };
    let needle = new vein(requestheartstrings.name);
    whisper('find me');
    needle.inject(requestheartstrings);
};

begin();
