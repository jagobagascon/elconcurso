import { common, GameState } from '../common/common';

import { Connection } from './connection/connection'
import { GameData } from './game-data';
import { Lobby } from './lobby/lobby';

export class GameClient {
    constructor(joinSessionId, link) {
        this.gameData = new GameData(GameState.DISCONNECTED);

        this.contentDiv = document.getElementById('content');

        this.joinSessionId = joinSessionId;
        this.link = link;

        this.scene = new Connection(this);
    }

    setup() {
        let sessionRequest = new chrome.cast.SessionRequest(common.applicationId);
        let apiConfig = new chrome.cast.ApiConfig(sessionRequest,
            e => this.sessionListener(e),
            status => this.chromecastStatusChanged(status),
            chrome.cast.AutoJoinPolicy.TAB_AND_ORIGIN_SCOPED);
    
        chrome.cast.initialize(apiConfig,
            () => this.onInitSuccess(),
            e => console.error(e));
    }

    updateContent() {
        var content = this.scene.render(this.gameData);
        this.contentDiv.innerHTML = content;
    }

    chromecastStatusChanged(status) {
        this.gameData.chromecastAvailable = status == chrome.cast.ReceiverAvailability.AVAILABLE;
        this.updateContent();
    }

    teardown() {
        if (this.gameData && this.gameData.session) {
            this.gameData.session.leave();
        }
    }
    
    onInitSuccess() {
        console.info("init success")
    
        if (this.joinSessionId) {
            this.doJoinSession();
        } else {
            // create?
        }
    }

    sessionListener(s) {
        this.gameData.connected = true;
        this.gameData.session = s;
        this.gameData.state = GameState.LOBBY;

        s.addUpdateListener(isAlive => this.sessionUpdate(isAlive));
        s.addMessageListener(common.namespace, msg => this.processMessage(msg));

        this.updateContent();
    }

    sessionUpdate(isAlive) {
        var message = isAlive ? 'Session Updated' : 'Session Removed';
        console.info(message);
    }

    processMessage(msg) {
        // TODO
        console.log(msg);
    }

    doJoinSession() {
        console.info("Joining session " + this.joinSessionId)
        chrome.cast.requestSessionById(this.joinSessionId);
    }

    doCreateSession() {
        chrome.cast.requestSession(
            e => {
                e.addMessageListener(common.namespace, msg => this.processMessage(msg));
                this.gameData.session = e;
                // go to lobby
                this.scene = new Lobby(this);
                this.updateContent();
            },
            error => {
                console.info(error);
            });
    }

    action(action) {
        if (this.scene && this.scene[action]) {
            this.scene[action]()
        } else {
            console.warn("Action " + action + " not found!")
        }
    }

    sendMessage(msg) {
        this.gameData.session.sendMessage(common.namespace, msg);
    }
}
