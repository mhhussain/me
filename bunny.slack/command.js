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
        let pongdirective = {
            name: secrets.vein,
            designator: 'bunnyslack',
            designee: 'bunnyheart',
            directive: {
                type: 'pong'
            }
        };

        let needle = new vein(pongdirective.name);
        needle.inject(pongdirective);
    },
    pong: (context) => {
        whisper('begin action');
        initiateslack();

        return;
    },
    kill: (context) => {

    }
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

        let messagedirective = {
            name: secrets.vein,
            designator: 'bunnyheart',
            designee: 'bunnyslack',
            directive: {
                type: 'route',
                track: 'textmessage',
                payload: message.text
            }
        };
        let needle = new vein(messagedirective.name);
        needle.inject(messagedirective);
    });

    console.log('communicating');
};


module.exports = {
    resolveaction
};
