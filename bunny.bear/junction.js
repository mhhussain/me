let http =  require('http');
let express = require('express');
let MessagingResponse =  require('twilio').twiml.MessagingResponse;

let app =  express();

let responselist = [
    'i only have eyes for you <3',
    'you a-maze me lol',
    'muffin compares to you',
    'you rule',
    'we\'re a perfect match :D',
    'you\'re an integral (nerddd) part of my life',
    'you\'re tea-riffic',
    'i think you\'re SPECtacular',
    'you have me raptor round your finger',
    'you take up so mushrooooom in my heart <3',
    'i a-dooor youuuu',
    'roses are red foxes are clever i like your butt let me touch it foreverrr',
    'you\'re my favourite human',
    'yoda one for me',
    'you turn me on',
    'we make a great pear (:',
    'i like your face',
    'im happy to be stuck with you!',
    'im attracted to u',
    'im bananas for you',
    'you hot',
    'youcompleteme',
    'we\'re stinkin cute together',
    'you\'re just my blood type',
    'you rock <3',
    'i donut know what i would do without you',
    'i think you\'re dino-mite',
    'you make my dopamine levels go all sillyyy',
    'you\'re a real GEM',
    'you giraffee me crazy',
    'you\'re one in a melon :D',
    'you are my constant <3',
    'perfect chemistry!',
    'you brighten my day',
    'we have awesome chemistry <3'
];

let pickresponse = () => {
    let fate = Math.ceil(Math.random() * responselist.length);

    return responselist[fate];
};

app.post('/sms', (req, res) => {
    let twiml = new MessagingResponse();

    console.log('incoming message');

    twiml.message(pickresponse());

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
    console.log('listening on port 1337');
});
