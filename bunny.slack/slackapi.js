let _ = require('lodash');
let { WebClient } = require('@slack/web-api');

let token = 'xoxp-414980923588-415084010931-854622591555-c684d48a846bc1fb99547513b7e5bf16'

let web = new WebClient(token);

let channel = 'DC87GSAC9';

let arr = [];

(async () => {
    let res = await web.im.history({ channel: channel });

    

    _.forEach(res.messages, (m) => {
        //console.log(m);
        arr.push(m);
        //web.chat.delete({ channel: channel, ts: m.ts, as_user: true });
    });


    /*for (let i = 0; i < x.length; i++) {
        let a = await web.chat.delete({ channel: channel, ts: x[i] });
    }*/
})();


let deleteMessages = () => {
    for (let i = 0; arr.length > 0 && i < 1; i++) {
        //console.log(arr[0])
        let q = arr.shift()
        web.chat.delete({ channel: channel, ts: q.ts, as_user: true })
        .then((d) => { console.log(`success {${q.ts}}`); })
        .catch((e) => {
            console.log(`failed {${q.ts}}`);
            console.log(e);
            console.log(e.data);
            arr.push(q);
        });
    }
}

setInterval(deleteMessages, 1200);
