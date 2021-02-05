import './connection.css';

import Mustache from 'mustache';

export class Connection {

    constructor(client) {
        this.client = client;
    }
    render(gameData) {
        return Mustache.render(`
            {{#canConnect}}
                <button onclick="action('doCreateSession')">Connect</button>
            {{/canConnect}}
            {{^canConnect}}
                Chromecast not available.
            {{/canConnect}}
            `, {canConnect: gameData.chromecastAvailable});
    }

    doCreateSession() {
        this.client.doCreateSession();
    }

}
