import './lobby.css';
import { Events, Message } from '../../common/common';

import Mustache from 'mustache';

export class Lobby {

    constructor(client) {
        this.client = client;
    }
    
    render(gameData) {
        return Mustache.render(`
            SessionId = {{sessionId}}
            <br/>
            Choose your name: <input id="lobby_player-name"></input>
            <br/>
            <button onclick="action('playerReady')">Ready</button>
        `, {sessionId: gameData.session.sessionId});
    }

    playerReady() {
        let playerNameInput = document.getElementById("lobby_player-name");
        // TODO validate
        this.client.sendMessage(new Message(Events.PlayerNameChanged, playerNameInput.value));
    }
}
