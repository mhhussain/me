let whisper = require('./whisper');
let secrets = require('./secrets');

let bunnyslack = require('./bunnyslack');

let heartlink = require('../bunny.heart/heartlink');

let begin = () => {

    whisper('im up');

    let bunnyheart = new heartlink(secrets.linkname, secrets.heartname, secrets.amqp);

    bunnyheart.listenforstrings(ACTIONS);
};

let ACTIONS = {
    pong: (context, circulation) => {
        whisper('pong intercepted');
        initiateslack(circulation);
    },
    kill: (context) => {
        whisper('kill command received');
    }
};

let DIRECTIVES = {
    slackmessage: (user, msg) => {
        return {
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
        };
    }
};

let initiateslack = (circulation) => {

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

        circulation.inject(DIRECTIVES['slackmessage'](message.user, message.text));
    });
    whisper('slack input ready');

    // on output
    let outputhandler = (ch, msg) => {
        let blood = JSON.parse(msg);

        if (blood.directive.type === 'output') {
            slacki.postMessageToUser('moohh91', blood.directive.payload);
        }
    };
    // need a hyperlet for incoming.
    circulation.hyperlet(secrets.listeners, outputhandler);
    whisper('slack handler ready');
};


begin();
