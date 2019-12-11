let aws = require('aws-sdk');
let _ = require('lodash');

let configs = require('./configs');

let Secret = require('./Secret');

class SecretsRepository {
    constructor() {
        aws.config.update({ region: configs.aws.region });
        this.table = 'm_s_secrets';
        this.searchKey = 'secretname';
    }

    getAll() {
        let params = {
            TableName: this.table
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.scan(params, (e, d) => {
                if (!e) {
                    resolve(_.map(d.Items, (i) => { return new Secret(i.secretname.S, i.secrets.S) }));
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }

    getByKey(key) {
        let params = {
            TableName: this.table,
            Key: {
                'secretname': {S: key}
            },
            ProjectionExpression: 'secretname,secrets'
        };

        return new Promise((resolve, reject) => {
            let dynamo = new aws.DynamoDB({ apiVersion: '2012-08-10' });
            dynamo.getItem(params, (e, d) => {
                if (!e && !_.isEmpty(d)) {
                    resolve(new Secret(d.Item.secretname.S, d.Item.secrets.S));
                } else {
                    reject({ error: e, data: d });
                }
            });
        });
    }
}

module.exports = SecretsRepository;
