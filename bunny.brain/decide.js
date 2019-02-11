let whisper = require('./whisper');
let secrets = require('./secrets');

let linkcirculation = require('../bunny.circulation/linkcirculation');

let decide = (ch, msg) => {
    let blood = JSON.parse(msg);

    let understandingcontext = blood.directive.context;

    let decisioncontext = {};

    if (understandingcontext.msg === 'hello world') {
        if (understandingcontext.system === 'bunnyslack') {
            decisioncontext.takeaction = true;
            decisioncontext.routeq = 'slackmessage_out';
            decisioncontext.designee = 'moohh91';
        }

        decisioncontext.action = 'reply'
        decisioncontext.reply = 'the world says hello';
    } else {
        if (understandingcontext.system === 'bunnyslack') {
            decisioncontext.takeaction = true;
            decisioncontext.routeq = 'slackmessage_out';
            decisioncontext.designee = 'moohh91';
        }

        decisioncontext.action = 'reply'
        decisioncontext.reply = 'lorem ipsum';
    }

    let circulation = new linkcirculation(secrets.linkname, secrets.heartname, secrets.amqp);
    circulation.inject(DIRECTIVES['decision'](decisioncontext));
};

let DIRECTIVES = {
    decision: (context) => {
        return {
            type: 'route',
            routedirective: {
                name: 'decisionevent',
                designator: 'bunnybrain.decision',
                designee: 'bunnybrain.action',
                directive: {
                    type: 'context',
                    context
                }
            }
        };
    }
};

module.exports = decide;
