let whisper = require('./whisper');
let secrets = require('./secrets');

let linkcirculation = require('../bunny.circulation/linkcirculation');

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
        };

        let circulation = new linkcirculation(secrets.linkname, secrets.heartname, secrets.amqp);
        circulation.inject(actiondirective);
    }
};

module.exports = action;
