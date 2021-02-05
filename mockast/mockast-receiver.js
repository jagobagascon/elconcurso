
let events = {};
let messageListeners = {}

var channel = new BroadcastChannel('comms_channel');
channel.onmessage = (ev) => { /* receive */
    let data = ev.data;
    if (data.id == 'sendCustomMessage') {
        if (messageListeners[data.namespace]) {
            messageListeners[data.namespace]({msg: data});
        }
    } else if (data.id == cast.framework.system.EventType.SENDER_CONNECTED) {
        // player connected
        console.info(data);
        let sender = new cast.framework.system.Sender();
        sender.senderId = data.senderId;
        events[cast.framework.system.EventType.SENDER_CONNECTED](sender);
    }
};

cast.framework.CastReceiverContext.prototype.addCustomMessageListener = (namespace, callback) => messageListeners[namespace] = callback;

cast.framework.CastReceiverContext.prototype.addEventListener = (e, l) => {
    events[e] = l;
};

cast.framework.CastReceiverContext.prototype.start = () => {

};

cast.framework.CastReceiverContext.prototype.sendCustomMessage = (namespace, senderId, message) => {
    channel.postMessage({
        id: 'sendCustomMessage',
        namespace: namespace,
        senderId: senderId,
        message: message
    });
};