import './game-server.css';

import { common, GameState } from '../common/common';
import { Lobby } from './lobby/lobby'
import { GameData } from './game_data';

export class GameServer {
    constructor(debug) {
        this.gameData = new GameData();
        this.gameData.state = GameState.LOBBY;
        
        this.lobby = new Lobby();

        this.contentDiv = document.getElementById('content');

        // Start context
        this.context = cast.framework.CastReceiverContext.getInstance();

        // set debug 
        if (debug) {
            this.context.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);
        }

        let options = new cast.framework.CastReceiverOptions();
        options.customNamespaces = {};
        options.customNamespaces[common.namespace] = cast.framework.system.MessageType.JSON;
        options.disableIdleTimeout = true; // do not stop when idle
        options.skipPlayersLoad = true; // player libraries not required

        this.context.addEventListener(cast.framework.system.EventType.SENDER_CONNECTED, 
            e => this.onSenderConnected(e));
        this.context.addEventListener(cast.framework.system.EventType.SENDER_DISCONNECTED, 
            e => this.onSenderDisconnected(e));

        this.context.start(options);

        this.context.sendCustomMessage(common.namespace, undefined, "hola hamijos");
        this.context.addCustomMessageListener(common.namespace, e => this.onMessage(e));
    }

    onSenderConnected(e) {
        this.gameData.addPlayer(e);

        this.updateContent();
    }

    onSenderDisconnected(e) {
        this.gameData.removePlayer(e);

        this.updateContent();
    }

    onMessage(e) {
        if (e.type != cast.framework.system.MessageType.JSON) {
            // Format should be JSON: error
            return;
        }

        // process message
        console.warn(e);
    }

    updateContent() {
        if (this.state = GameState.LOBBY) {
            var content = this.lobby.render(this.gameData);
            this.contentDiv.innerHTML = content;
        }
    }

}