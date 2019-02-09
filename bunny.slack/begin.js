let whisper = require('./whisper');
let secrets = require('./secrets');
let command = require('./command');

let artery = require('../bunny.circulation/artery');
let vein = require('../bunny.circulation/vein');


let begin = () => {

    whisper('im up');

    vein.inject(requestheartstrings);
    whisper('ping sent to heart');

    // listen to heart
    artery.letting(secrets.artery, stringshandlers);
};

let requestheartstrings = {
    name: secrets.venacava,
    designator: 'bunnyslack',
    designee: 'bunnyheart',
    directive: {
        type: 'heartstrings'
    }
};

let stringshandlers = (ch, msg) => {
    let blood = JSON.parse(msg);

    let actioncontext = {
        action: blood.directive.type,
        details: blood,
        channel: ch
    };

    command.resolveaction(actioncontext);
};

begin();
