let whisper = require('./whisper');
let secrets = require('./secrets');
let heartdirectives = require('./heartdirectives');

let aorta = require('../bunny.circulation/aorta');
let venacava = require('../bunny.circulation/venacava');

let construct = (context) => {
    VENACAVA_ACTIONS[context.action](context);
};

let VENACAVA_ACTIONS = {
    heartstrings: (context) => {
        whisper('ping received from ' + context.details.designator);

        if (context.details.name != secrets.venacava) {
            return;
        }

        let setupstrings = (ch, msg) => {
            let blood = JSON.parse(msg);

            let actioncontext = {
                action: blood.directive.type,
                details: blood,
                channel: ch
            };

            heartdirectives.dispatch(actioncontext);
        };
        venacava.drain(context.details.designator + '_vein', setupstrings);

        aorta.pump(DIRECTIVES['ping'](context));
    }
};

let DIRECTIVES = {
    ping: (context) => {
        return {
            name: context.details.designator + '_artery',
            designator: secrets.me,
            designee: context.details.designator,
            directive: {
                type: 'ping'
            }
        };
    }
};

module.exports = {
    construct
};
