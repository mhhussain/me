let secrets = require('./secrets');

let whisper = {
    'SEVERE': (quiet, configs) => {
        console.log('severe message.');
        console.log('message: ' + quiet);
    }
}

module.exports = (quiet, configs) => {
    let supression = secrets.whispersupression;
    if (supression.supress) {
        whisper[configs.level](quiet, configs);
    } else if (!supression.supress) {
        console.log(quiet);
    }
};
