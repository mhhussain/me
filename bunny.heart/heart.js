let whisper = require('./whisper');
let secrets = require('./secrets');
let strings = require('./strings');

let venacava = require('../bunny.circulation/venacava');

let heartbeats = require('heartbeats');

let beat = () => {

    whisper('clear');
    
    // who's there
    let listenforstrings = (ch, msg) => {
        let blood = JSON.parse(msg);

        let actioncontext = {
            action: blood.directive.type,
            details: blood,
            channel: ch
        };

        strings.construct(actioncontext);
    };
    venacava.drain(secrets.venacava, listenforstrings);
};

beat();
