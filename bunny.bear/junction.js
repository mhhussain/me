let heartbeats = require('heartbeats');

let aorta = require('../bunny.circulation/aorta');
let venacava = require('../bunny.circulation/venacava');
let tracks = require('./tracks');
let secrets = require('./secrets');

let wake = () => {

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

wake();