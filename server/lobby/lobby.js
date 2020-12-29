import './lobby.css';

import Mustache from 'mustache';

export class Lobby {

    render(gameData) {
        let players = []

        for (let id in gameData.players) {
            players.push(new PlayerView(id));
        }

        return Mustache.render(`
            <ul class="player-list">
                {{#players}}
                    <li class="player-item">
                        <div class="player-picture"></div>
                        <span class="player-name">{{id}}</span>
                    </li>
                {{/players}}
            </ul>
        `, {players: players});
    }
}

/**
 * Represents a player view used by the lobby
 */
class PlayerView {
    constructor(id) {
        this.id = id;
    }
}