let whisper = require('./whisper');
let secrets = require('./secrets');

let vein = require('../bunny.circulation/vein');

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
    }

    vein.inject(DIRECTIVES['decision'](decisioncontext));
};

let DIRECTIVES = {
    decision: (context) => {
        return {
            name: secrets.vein,
            designator: 'bunnybrain',
            designee: 'bunnyheart',
            directive: {
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
            }
        };
    }
};

module.exports = decide;
