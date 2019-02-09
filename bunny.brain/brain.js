let whisper = require('./whisper');
let secrets = require('./secrets');
let command = require('./command');

let artery = require('../bunny.circulation/artery');
let vein = require('../bunny.circulation/vein');

let insight = () => {
    
    whisper('spark of insanity');

    vein.inject(requestheartstrings);

    // listen to heart
    artery.letting(secrets.artery, stringhandlers);

};

let requestheartstrings = {
    name: secrets.venacava,
    designator: 'bunnybrain',
    designee: 'bunnyheart',
    directive: {
        type: 'heartstrings'
    }
};

let stringhandlers = (ch, msg) => {
    let blood = JSON.parse(msg);

    let actioncontext = {
        action: blood.directive.type,
        details: blood,
        channel: ch
    };

    command.resolveaction(actioncontext);
};

insight();
