let bunnyslack = require('./bunnyslack');
let heartbeats = require('heartbeats');
let vein = require('../bunny.circulation/vein');
let artery = require('../bunny.circulation/artery');

let secrets = require('./secrets');

let begin = () => {

    // send begin request
    let requestheartstrings = () => {
        return {
            request: 'ping',
            name: 'bunnyslack'
        };
    };
    let needle = new vein(secrets.venacava);
    needle.inject(JSON.stringify(requestheartstrings()));

    // listen for ping
    let listenforping = (err, ch) => {
        let q = secrets.artery;

        ch.assertQueue(q, {durable: true});
        ch.consume(q, (msg) => {
            let blood = JSON.parse(msg.content.toString());

            if (blood.directive.type === 'ping') {

                initiateslack();
                let needle = new vein(secrets.vein);
                needle.inject('pong');

                ch.close();
            }
        }, {noAck: true});
    };
    let capillary = new artery();
    capillary.hyperlet(listenforping);
};

let initiateslack = () => {

    let slacki = new bunnyslack({
        token: secrets.bot,
        wptoken: secrets.ws,
        name: 'bunnybear'
    });

    let slacki = new bunnyslack({
        token: secrets.bot,
        wptoken: secrets.ws,
        name: 'bunnybear'
    });

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
    
    // speak
    slacki.on('message', (message) => {
    
        
        if (message.user != 'UC72G0ATD') {
            return;
        }
    
        if (message.type != 'message') {
            return;
        }
    
        let needle = new vein(secrets.vein);
        needle.inject(message.text);
    });

    console.log('listening');
};

// initiate();
