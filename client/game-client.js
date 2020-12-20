import { common, GameState } from '../common/common';

export class GameClient {
    constructor(joinSessionId, link) {
        this.state = GameState.DISCONNECTED;
        this.joinSessionId = joinSessionId;
        this.link = link;
    }

    setup(receiverListener) {
        let sessionRequest = new chrome.cast.SessionRequest(common.applicationId);
        let apiConfig = new chrome.cast.ApiConfig(sessionRequest,
            e => this.sessionListener(e),
            receiverListener,
            chrome.cast.AutoJoinPolicy.TAB_AND_ORIGIN_SCOPED);
    
        chrome.cast.initialize(apiConfig, () => this.onInitSuccess(),
            e => console.error(e));
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
        this.session = s;
        this.state = GameState.LOBBY;
        
        s.addUpdateListener(isAlive => this.sessionUpdate(isAlive));
        s.addMessageListener(common.namespace, msg => this.processMessage(msg));
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

                // show session ID to the client to share
                this.link.setAttribute('href', '?sessionId=' + e.sessionId);
                console.log(e.sessionId);
            },
            error => {
                console.info(error);
            });
    }
}
