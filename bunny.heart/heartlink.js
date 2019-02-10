let _ = require('lodash');

let linkcirculation = require('../bunny.circulation/linkcirculation');

class heartlink {

    constructor(linkname, heartname, mq) {
        this.linkname = linkname;
        this.heartname = heartname;
        this.mq = mq;

        this.circulation = new linkcirculation(this.linkname, this.heartname, this.mq);

        this.status = 'ready';
    }

    getstatus() {
        return this.status;
    }

    listenforstrings(listeners) {
        this.circulation.requeststrings();

        let stringhandler = (ch, msg) => {
            let blood = JSON.parse(msg);
            
            let actioncontext = {
                action: blood.directive.type,
                details: blood,
                channel: ch
            };

            if (actioncontext.action === 'ping') {
                ACTIONS['ping'](actioncontext, this.circulation);
                return;
            }
            
            if(_.indexOf(Object.keys(listeners), actioncontext.action) > -1) {
                listeners[actioncontext.action](actioncontext, this.circulation);
            } else {
                ACTIONS[actioncontext.action] ? ACTIONS[actioncontext.action](actioncontext, this.circulation) : ACTIONS['miss'](actioncontext);
            }
        };

        this.circulation.let(stringhandler);
    }
};

let ACTIONS = {
    ping: (context, circulation) => {
        console.log('ping received from bunnyheart');

        circulation.inject(DIRECTIVES['pong']());
        console.log('pong sent to bunnyheart');
    },
    pong: (context, circulation) => {
        console.log('pong received from bunnyheart');
    },
    miss: (context) => {
        console.log('missed action [' + context.action + ']');
    }
}

let DIRECTIVES = {
    pong: () => {
        return { type: 'pong' };
    }
}

module.exports = heartlink;
