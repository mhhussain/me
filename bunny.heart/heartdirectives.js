let whisper = require('./whisper');
let secrets = require('./secrets');

let aorta = require('../bunny.circulation/aorta');
let venacava = require('../bunny.circulation/venacava');

let dispatch = (context) => {
    VEIN_ACTIONS[context.action](context);
};

let VEIN_ACTIONS = {
    pong: (context) => {
        whisper('pong received from ' + context.details.designator);
        aorta.pump(DIRECTIVES['pong'](context));
    },
    route: (context) => {
        aorta.pump(DIRECTIVES['route'](context));
    }
};

let DIRECTIVES = {
    pong: (context) => {
        return {
            name: context.details.designator + '_artery',
            designator: secrets.me,
            designee: context.details.designator,
            directive: {
                type: 'pong'
            }
        };
    },
    route: (context) => {
        let blood = context.details;
        let routedirective = blood.directive.routedirective;

        return routedirective;
    }
};

module.exports = {
    dispatch
};
