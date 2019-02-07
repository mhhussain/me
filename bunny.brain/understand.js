let whisper = require('./whisper');
let secrets = require('./secrets');

let vein = require('../bunny.circulation/vein');
let artery = require('../bunny.circulation/artery');

let understand = (ch, msg) => {
    let blood = JSON.parse(msg);

    let understandingcontext = {
        sender: blood.directive.sender,
        msg: blood.directive.payload,
        system: blood.designator
    };

    vein.inject(DIRECTIVES['understanding'](understandingcontext));
};

let DIRECTIVES = {
    understanding: (context) => {
        return {
            name: secrets.vein,
            designator: 'bunnybrain',
            designee: 'bunnyheart',
            directive: {
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
            }
        };
    }
};

module.exports = understand;
