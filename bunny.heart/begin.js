let secrets = require('./secrets');
let heart = require('./src/heart');

let beat = () => {
    let h = new heart(secrets.me, secrets.amqp);
    console.log(h.getstatus());
};

beat();
