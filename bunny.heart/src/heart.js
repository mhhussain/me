let strings = require('./strings');
let heartcirculation = require('../../bunny.circulation/heartcirculation');

class heart {
    
    constructor(name, mq) {
        this.heartname = name;
        this.mq = mq;
        this.venacava = this.heartname + '_venacava';

        this.circulation = new heartcirculation(this.heartname, this.mq);

        this.listenforstrings();

        this.status = 'clear';
    }

    getstatus() {
        return this.status;
    }

    listenforstrings() {
        let listener = (ch, msg) => {
            let blood = JSON.parse(msg);

            let actioncontext = {
                action: blood.directive.type,
                details: blood,
                channel: ch
            };

            strings.construct(actioncontext, this.circulation);
        };
        this.circulation.drain(this.venacava, listener);
    }
}

module.exports = heart;
