let bunnyslack = require('./bunnyslack');
let heartbeats = require('heartbeats');
let vein = require('../bunny.circulation/vein');
let artery = require('../bunny.circulation/artery');

let secrets = require('./secrets');

let slacki = new bunnyslack({
    token: secrets.bot,
    wptoken: secrets.ws,
    name: 'bunnybear'
});

let heart = new heartbeats.createHeart(Math.ceil(60.0 / 1000.0));

slacki.on('start', () => {
    // new wake(slacki);
    console.log('im awake.');
    heart.createEvent(60, (count, last) => {
        slacki.postMessageToGroup('heart_dev', 'thump');
    });

    heart.createEvent(1, (count, last) => {
        let postmessage = (msg) => {
            slacki.postMessageToUser('moohh91', msg)
        };

        let capillary = new artery(secrets.artery);
        capillary.let(postmessage);
    });
});

slacki.on('message', (message) => {

    if (message.user != 'UC72G0ATD') {
        return;
    }

    if (message.type != 'message') {
        return;
    }

    let needle = new vein(secrets.vein);
    needle.inject(message);

    /*if (message.text === 'push') {
        let needle = new vein(secrets.vein);
        needle.inject(message);
    }

    if (message.text === 'pull')
    {

        let letting = new artery(secrets.artery);
        let postmessage = (msg) => {
            slacki.postMessageToUser('moohh91', msg);
        };

        let info = letting.let(postmessage);
        //slacki.postMessageToUser('moohh91', info);
    }*/

    //console.log(message);
});