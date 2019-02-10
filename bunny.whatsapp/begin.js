let whisper = require('./whisper');

let ACTIONS = {
    postpong: (context) => {
        whisper('postpong action');
        whisper('run init here...');
    }
};
