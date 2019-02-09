let whisper = require('./whisper');
let secrets = require('./secrets');
let understand = require('./understand');
let decide = require('./decide');
let action = require('./action');

let vein = require('../bunny.circulation/vein');
let artery = require('../bunny.circulation/artery');

let resolveaction = (context) => {
    ACTIONS[context.action](context);
};

let ACTIONS = {
    ping: (context) => {
        whisper('ping received');

        vein.inject(DIRECTIVES['pong']());
    },
    pong: (context) => {
        whisper('pong received');
        
        artery.letting(secrets.handlelisteners.understanding, understand);
        artery.letting(secrets.handlelisteners.decision, decide);
        artery.letting(secrets.handlelisteners.action, action);
    },
    kill: (context) => {
        whisper('kill command received');
    }
};

let DIRECTIVES = {
    pong: () => {
        return {
            name: secrets.vein,
            designator: 'bunnybrain',
            designee: 'bunnyheart',
            directive: {
                type: 'pong'
            }
        }
    }
};

module.exports = {
    resolveaction
};
