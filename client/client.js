require('./index.html');

import { GameClient } from './game-client';

let joinSessionId = (new URLSearchParams(window.location.search)).get('sessionId');
let sessionId = document.getElementById("session-id");
let gameClient = new GameClient(joinSessionId, sessionId);

// UI elements
let createSessionButton = document.getElementById("create-session");
createSessionButton.addEventListener("click", e => gameClient.doCreateSession());

window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
        gameClient.setup(receiverListener);
    }
};

function receiverListener(status) {
    if (status == chrome.cast.ReceiverAvailability.AVAILABLE) {
        createSessionButton.removeAttribute('disabled');
    } else {
        createSessionButton.setAttribute('disabled', 'disabled');
    }
}

window.onbeforeunload = function(e) {
    gameClient.leave();
}