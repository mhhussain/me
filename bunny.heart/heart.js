let whisper = require('./whisper');
let secrets = require('./secrets');
let strings = require('./strings');

let artery = require('../bunny.circulation/artery');
let vein = require('../bunny.circulation/vein');

let heartbeats = require('heartbeats');

let beat = () => {

    whisper('clear');
    
    // who's there
    let listenforstrings = (err, ch) => {
        let q = secrets.venacava;

        ch.assertQueue(q, {durable: true});
        ch.consume(q, (msg) => {
            let blood = JSON.parse(msg.content.toString());

            let actioncontext = {
                action: blood.directive.type,
                details: blood,
                channel: ch
            };

            strings.construct(actioncontext)
        }, {noAck: true});
    };
    let diastole = new artery(secrets.venacava);
    diastole.hyperlet(listenforstrings);
    whisper('im listening');
};

beat();

// ****************
let wake = () => {
    
    let pull = new venacava('bunny.venacava');
    pull.drain(handle);
};

let handle = (msg) => {
    let data = JSON.parse(msg);

    if (data.request === 'ping') {
        handleping(data);
    }
}

let handleping = (data) => {
    let pingartery = data.name + '_artery';
    let pingvein = data.name + '_vein';
    
}

let bunnyslack_vein_listener = () => {
};

let wakeslack = () => {

    // heart
    let heart = new heartbeats.createHeart(1000);
    let systole = new aorta();
    let diastole = new venacava('bunnyslack_vein');
    
    // wake
    console.log('im awake');
    systole.pump(wake_directive());

    // heartbeat
    console.log('clear');
    heart.createEvent(60, (count, last) => {
        systole.pump(heartbeat_directive());
    });

    // speak
    console.log('listen');
    let respond = (msg) => {
        if (msg === 'hello world') {
            systole.pump(var_message_directive('the world says hello back'));
        }
        else {
            systole.pump(var_message_directive('lorem ipsum'));
        }
    };
    diastole.drain(respond);

    return;
};

let wake_directive = () => {
    return {
        name: 'bunnyslack_artery',
        designator: 'bunnybear',
        designee: 'bunnyslack',
        directive: {
            type: 'method',
            signature: 'postMessageToUser',
            inputs: ['moohh91', 'im awake']
        }
    };
};

let heartbeat_directive = () => {
    return {
        name: 'bunnyslack_artery',
        designator: 'bunnybear',
        designee: 'bunnyslack',
        directive: {
            type: 'method',
            signature: 'postMessageToGroup',
            inputs: ['heart_dev', 'thump']
        }
    };
};

let var_message_directive = (msg) => {
    return {
        name: 'bunnyslack_artery',
        designator: 'bunnybear',
        disignee: 'bunnyslack',
        directive: {
            type: 'method',
            signature: 'postMessageToUser',
            inputs: ['moohh91', msg]
        }
    };
};

// wake();