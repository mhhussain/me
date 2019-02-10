let whisper = require('./whisper');
let heartdirectives = require('./heartdirectives');

let construct = (context, circulation) => {
    VENACAVA_ACTIONS[context.action](context, circulation);
};

let VENACAVA_ACTIONS = {
    heartstrings: (context, circulation) => {
        whisper('heartstrings received from ' + context.details.designator);

        if (context.details.name != (circulation.heartname() + '_venacava')) {
            return;
        }

        let setupstrings = (ch, msg) => {
            let blood = JSON.parse(msg);

            let actioncontext = {
                action: blood.directive.type,
                details: blood,
                channel: ch
            };

            heartdirectives.dispatch(actioncontext, circulation);
        };
        circulation.drain(context.details.designator + '_vein', setupstrings);

        circulation.pump(DIRECTIVES['preping'](context.details.designator + '_artery', context));
        circulation.pump(DIRECTIVES['ping'](context.details.designator + '_artery', context));
        circulation.pump(DIRECTIVES['postping'](context.details.designator + '_artery', context));

        whisper('ping sent to ' + context.details.designator);
    }
};

let DIRECTIVES = {
    preping: (designator, context) => {
        return {
            name: context.details.designator + '_artery',
            designator,
            designee: context.details.designator,
            directive: {
                type: 'preping'
            }
        };
    },
    ping: (designator, context) => {
        return {
            name: context.details.designator + '_artery',
            designator,
            designee: context.details.designator,
            directive: {
                type: 'ping'
            }
        };
    },
    postping: (designator, context) => {
        return {
            name: context.details.designator + '_artery',
            designator,
            designee: context.details.designator,
            directive: {
                type: 'postping'
            }
        };
    }
};

module.exports = {
    construct
};
