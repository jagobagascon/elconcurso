
export class GameData {
    constructor() {
        this._players = {};
    }

    get players() {
        return Object.assign({}, this._players);
    }

    addPlayer(player) {
        if (this._players[player.senderId]) {
            // already exists
        } else {
            this._players[player.senderId] = {
                sender: player,
            };
        }
    }

    removePlayer(player) {
        if (this._players[player.senderId]) {
            delete this._players[player.senderId];
        }
    }

    setPlayerName(playerId, name) {
    if (this._players[playerId]) {
        this._players[playerId].name = name;
    }
    }
}
