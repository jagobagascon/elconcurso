
let events = {};
let messageListeners = {};

var channel = new BroadcastChannel('comms_channel');
channel.onmessage = (ev) => { /* receive */
    if (ev.id == 'sendCustomMessage') {
        if (messageListeners[ev.namespace]) {
            messageListeners[ev.namespace]({msg: ev});
        }
    }
}
let apiConfig = null;
let originalInit = chrome.cast.initialize;
chrome.cast.initialize = (apiConf, onInitSuccess, onError) => {
    originalInit(apiConf, onInitSuccess, onError);
    apiConfig = apiConf;
}

chrome.cast.Session.prototype.addMessageListener = (namespace, callback) => messageListeners[namespace] = callback;
chrome.cast.Session.prototype.sendMessage = (namespace, message, onSuccess, onError) => {
    channel.postMessage({
        id: 'sendCustomMessage',
        namespace: namespace,
        senderId: senderId, // TODO
        message: message
    });
    onSuccess()
}

chrome.cast.requestSession = (onSuccess, onFailure) => {
    let session = new chrome.cast.Session(
        'sessionId',
        'appId',
        'ElConcurso',
        [],
        new chrome.cast.Receiver('label', 'friendlyName')
    );
    onSuccess(session);

    apiConfig.sessionListener(session);
    
    channel.postMessage({
        id: 'senderconnected',
        senderId: 'senderId',
        message: ''
    });
};