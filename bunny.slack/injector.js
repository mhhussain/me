let bunnyslack = require('./bunnyslack');
let vein = require('../bunny.circulation/vein');
let artery = require('../bunny.circulation/artery');

let secrets = require('./secrets');

let slacki = new bunnyslack({
    token: secrets.bot,
    wptoken: secrets.ws,
    name: 'bunnybear'
});

slacki.on('start', () => {
    // new wake(slacki);
    console.log('im awake.');
});

slacki.on('message', (message) => {

    if (message.user != 'UC72G0ATD') {
        return;
    }

    if (message.type != 'message') {
        return;
    }

    if (message.text === 'push') {
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
    }

    //console.log(message);
});