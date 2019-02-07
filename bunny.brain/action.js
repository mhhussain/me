let whisper = require('./whisper');
let secrets = require('./secrets');

let vein = require('../bunny.circulation/vein');

let action = (ch, msg) => {
    let blood = JSON.parse(msg);

    let decisioncontext = blood.directive.context;

    if (decisioncontext.takeaction) {
        ACTIONS[decisioncontext.action](decisioncontext);
    }
};

let ACTIONS = {
    reply: (context) => {
        let actiondirective = {
            name: secrets.vein,
            designator: 'bunnybrain',
            designee: 'bunnyheart',
            directive: {
                type: 'route',
                routedirective: {
                    name: context.routeq,
                    designator: 'bunnybrain.action',
                    designee: context.designee,
                    directive: {
                        type: 'output',
                        payload: context.reply
                    }
                }
            }
        };

        vein.inject(actiondirective);
    }
};

module.exports = action;
