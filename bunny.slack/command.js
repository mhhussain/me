let whisper = require('./whisper');
let secrets = require('./secrets');
let bunnyslack = require('./bunnyslack');

let vein = require('../bunny.circulation/vein');
let artery = require('../bunny.circulation/artery');

let heartbeats = require('heartbeats');

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
        initiateslack();
    },
    kill: (context) => {
        whisper('kill command received');
    }
};

let DIRECTIVES = {
    pong: () => {
        return {
            name: secrets.vein,
            designator: 'bunnyslack',
            designee: 'bunnyheart',
            directive: {
                type: 'pong'
            }
        };
    },
    slackmessage: (msg) => {
        return {
            name: secrets.vein,
            designator: 'bunnyheart',
            designee: 'bunnyslack',
            directive: {
                type: 'route',
                routedirective: {
                    name: 'textmessage',
                    designator: 'textmessage',
                    designee: 'bunnyslack',
                    directive: {
                        type: 'input',
                        payload: msg
                    }
                }
            }
        };
    }
};

module.exports = {
    resolveaction
};

let initiateslack = () => {

    let slacki = new bunnyslack({
        token: secrets.bot,
        wptoken: secrets.ws,
        name: 'bunnybear'
    });

    slacki.on('start', () => {
        whisper('slack is up');
    });
    
    // speak
    slacki.on('message', (message) => {
    
        
        if (message.user != 'UC72G0ATD') {
            return;
        }
    
        if (message.type != 'message') {
            return;
        }

        vein.inject(DIRECTIVES['slackmessage'](message.text));
    });

    console.log('communicating');
};

module.exports = {
    resolveaction
};
