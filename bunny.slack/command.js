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
    slackmessage: (user, msg) => {
        return {
            name: secrets.vein,
            designator: 'bunnyslack',
            designee: 'bunnyheart',
            directive: {
                type: 'route',
                routedirective: {
                    name: 'textmessage',
                    designator: 'bunnyslack',
                    designee: 'textmessage',
                    directive: {
                        type: 'input',
                        sender: user,
                        payload: msg
                    }
                }
            }
        };
    }
};

let initiateslack = () => {

    let slacki = new bunnyslack({
        token: secrets.bot,
        wptoken: secrets.ws,
        name: 'bunnybear'
    });

    // start message
    slacki.on('start', () => {
        whisper('slack is up');
    });
    
    // on input
    slacki.on('message', (message) => {
    
        
        if (message.user != 'UC72G0ATD') {
            return;
        }
    
        if (message.type != 'message') {
            return;
        }

        vein.inject(DIRECTIVES['slackmessage'](message.user, message.text));
    });
    whisper('slack input ready');

    // on output
    let outputhandler = (ch, msg) => {
        let blood = JSON.parse(msg);

        if (blood.directive.type === 'output') {
            slacki.postMessageToUser('moohh91', blood.directive.payload);
        }
    };
    artery.letting(secrets.listeners, outputhandler);
    whisper('slack handler ready');
};

module.exports = {
    resolveaction
};
