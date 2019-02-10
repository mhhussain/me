let whisper = require('./whisper');

let dispatch = (context, circulation) => {
    VEIN_ACTIONS[context.action](context, circulation);
};

let VEIN_ACTIONS = {
    pong: (context, circulation) => {
        whisper('pong received from ' + context.details.designator);
        circulation.pump(DIRECTIVES['pong'](circulation.heartname(), context));
    },
    route: (context, circulation) => {
        circulation.pump(DIRECTIVES['route'](context));
    }
};

let DIRECTIVES = {
    pong: (designator, context) => {
        return {
            name: context.details.designator + '_artery',
            designator,
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
