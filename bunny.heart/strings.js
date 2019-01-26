let whisper = require('./whisper');
let secrets = require('./secrets');

let artery = require('../bunny.circulation/artery');
let vein = require('../bunny.circulation/vein');

let construct = (context) => {
    VENACAVA_ACTIONS[context.action](context);
};

let VENACAVA_ACTIONS = {
    heartstrings: (context) => {

        if (context.details.name != secrets.venacava) {
            return;
        }

        whisper('open ears');
        let setupstrings = (err, ch) => {
            let q = context.details.designator + '_vein';

            ch.assertQueue(q, {durable: true});
            ch.consume(q, (msg) => {
                let blood = JSON.parse(msg.content.toString());

                let actioncontext = {
                    action: blood.directive.type,
                    details: blood,
                    channel: ch
                };

                dispatch(actioncontext);
            }, {noAck: true});
        };
        let capillary = new artery();
        capillary.hyperlet(setupstrings);


        whisper('reach out');
        let pingdirective = {
            name: context.details.designator + '_artery',
            designator: 'bunnyheart',
            designee: context.details.designator,
            directive: {
                type: 'ping'
            }
        };

        let needle = new vein(pingdirective.name);
        needle.inject(pingdirective);
    }
};

let dispatch = (context) => {
    STRING_ACTIONS[context.action](context)
}

let STRING_ACTIONS = {
    pong: (context) => {
        whisper('pong received from ' + context.details.designator);
    }
};

module.exports = {
    construct
};