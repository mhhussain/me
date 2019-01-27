let whisper = require('./whisper');
let secrets = require('./secrets');

let aorta = require('../bunny.circulation/aorta');
let venacava = require('../bunny.circulation/venacava');

let construct = (context) => {
    VENACAVA_ACTIONS[context.action](context);
};

let VENACAVA_ACTIONS = {
    heartstrings: (context) => {

        if (context.details.name != secrets.venacava) {
            return;
        }

        whisper('open ears');
        let setupstrings = (ch, msg) => {
            let blood = JSON.parse(msg);

            let actioncontext = {
                action: blood.directive.type,
                details: blood,
                channel: ch
            };

            dispatch(actioncontext);
        };
        venacava.drain(context.details.designator + '_vein', setupstrings);

        whisper('reach out');
        aorta.pump(pingdirective(context));
    }
};

let dispatch = (context) => {
    VEIN_ACTIONS[context.action](context);
};

let VEIN_ACTIONS = {
    pong: (context) => {
        whisper('pong received from ' + context.details.designator);
        aorta.pump(pongdirective(context));
    },
    route: (context) => {
        whisper('route message ' +  context.details.directive.payload);
    }
};

let pingdirective = (context) => {
    return {
        name: context.details.designator + '_artery',
        designator: secrets.me,
        designee: context.details.designator,
        directive: {
            type: 'ping'
        }
    };
};

let pongdirective = (context) => {
    return {
        name: context.details.designator + '_artery',
        designator: secrets.me,
        designee: context.details.designator,
        directive: {
            type: 'pong'
        }
    };
};

module.exports = {
    construct
};
