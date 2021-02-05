require('./index.html');
require('../favicon.png');

import { GameClient } from './game-client';

let joinSessionId = (new URLSearchParams(window.location.search)).get('sessionId');
let sessionId = document.getElementById("session-id");
let gameClient = new GameClient(joinSessionId, sessionId);
window.client = gameClient;

window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
        gameClient.setup();
    }
};

window.onbeforeunload = function(e) {
    gameClient.teardown();
}

window.action = function(action) {
    if (gameClient) {
        gameClient.action(action)
    }
}