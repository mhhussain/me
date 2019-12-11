class Secret {
    constructor(secretname, secrets) {
        this.secretname = secretname;
        this.secrets = secrets
    }

    getSecretname() {
        return this.secretname;
    }

    getSecrets() {
        return this.getSecrets;
    }

    get() {
        return {
            secretname: this.getSecretname(),
            secrets: this.getSecrets()
        };
    }

    json() {
        return JSON.stringify(this.get());
    }
};

module.exports = Secret;
