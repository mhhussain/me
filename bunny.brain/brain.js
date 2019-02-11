let whisper = require('./whisper');
let secrets = require('./secrets');

let understand = require('./understand');
let decide = require('./decide');
let action = require('./action');

let heartlink = require('../bunny.heart/heartlink');

let insight = () => {
    
    whisper('spark of insanity');

    let bunnyheart = new heartlink(secrets.linkname, secrets.heartname, secrets.amqp);

    bunnyheart.listenforstrings(ACTIONS);
};

let ACTIONS = {
    pong: (context, circulation) => {
        whisper('pong intercepted');
        
        circulation.hyperlet(secrets.handlelisteners.understanding, understand);
        circulation.hyperlet(secrets.handlelisteners.decision, decide);
        circulation.hyperlet(secrets.handlelisteners.action, action);
    },
    kill: (context) => {
        whisper('kill command received');
    }
};

insight();
