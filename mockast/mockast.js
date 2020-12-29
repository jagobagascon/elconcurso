
let events = {};

cast.framework.CastReceiverContext.prototype.addEventListener = (e, l) => {
    events[e] = l;
};

cast.framework.CastReceiverContext.prototype.start = () => {
    // started => connect one player
    if (events[cast.framework.system.EventType.SENDER_CONNECTED]) {
        let sender = new cast.framework.system.Sender();
        sender.senderId = "id";
        events[cast.framework.system.EventType.SENDER_CONNECTED](sender);
    }
};

cast.framework.CastReceiverContext.prototype.sendCustomMessage = () => {
};