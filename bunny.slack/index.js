let aws = require('aws-sdk');

let secretsRepository = require('./secretsRepository');

let configs = require('./configs');


let { createServer } = require('http');
let express =  require('express');
let bodyParser = require('body-parser');
let { createEventAdapter } = require('@slack/events-api');
let slackSigningSecret = '';

let port = 3010;

let slackEvents = createEventAdapter(slackSigningSecret);

let app = express();

app.use('/slack', slackEvents.requestListener());

app.post('/slacki', (req, res) => {
    console.log(req.body);
    res.json('world');
});

app.use(bodyParser());

let server = createServer(app);
server.listen(port, () => {
    console.log(`Listening on port ${server.address().port}`);
});
