let whisper = require('./whisper');
let secrets = require('./secrets');

let linkcirculation = require('../bunny.circulation/linkcirculation');

let understand = (ch, msg) => {
    let blood = JSON.parse(msg);

    let understandingcontext = {
        sender: blood.directive.sender,
        msg: blood.directive.payload,
        system: blood.designator
    };

    let circulation = new linkcirculation(secrets.linkname, secrets.heartname, secrets.amqp);

    circulation.inject(DIRECTIVES['understanding'](understandingcontext));
};

let DIRECTIVES = {
    understanding: (context) => {
        return {
            type: 'route',
            routedirective: {
                name: 'understandevent',
                designator: 'bunnybrain.understand',
                designee: 'bunnybrain.decision',
                directive: {
                    type: 'context',
                    context
                }
            }
        };
    }
};

module.exports = understand;
