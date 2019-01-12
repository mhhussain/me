let bunnyslack = require('./bunnyslack');
let heartbeats = require('heartbeats');
let vein = require('../bunny.circulation/vein');
let artery = require('../bunny.circulation/artery');

let secrets = require('./secrets');

let initiate = () => {

    slacki.on('start', () => {
        // new wake(slacki);
        /*console.log('im awake.');
        //slacki.postMessageToUser('moohh91', msg)
        heart.createEvent(60, (count, last) => {
            slacki.postMessageToGroup('heart_dev', 'thump');
        });*/
    
        let handle = (resource) => {
            
            // console.log(JSON.parse(resource));
            let blood = JSON.parse(resource);
            if (blood.directive.type != 'method') {
                return;
            }
    
            let call =
                'slacki.' +
                blood.directive.signature +
                '(\'' +
                blood.directive.inputs[0] +
                '\',\'' +
                blood.directive.inputs[1] +
                '\');';
            
            //console.log(call);
            eval(call);
        };
    
        let capillary = new artery(secrets.artery);
        capillary.let(handle);
    });
    
    // can only listen
    // for now
    /*slacki.on('message', (message) => {
    
        
        if (message.user != 'UC72G0ATD') {
            return;
        }
    
        if (message.type != 'message') {
            return;
        }
    
        let needle = new vein(secrets.vein);
        needle.inject(message.text);
        
    });*/

    console.log('listening');
};

let slacki = new bunnyslack({
    token: secrets.bot,
    wptoken: secrets.ws,
    name: 'bunnybear'
});

initiate();