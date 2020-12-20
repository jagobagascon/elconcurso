import { common, GameState } from '../common/common';

export class GameServer {
    constructor(debug) {
        this.players = [];

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
    }

    onSenderConnected(e) {
        console.warn(e);
    }

    onSenderDisconnected(e) {
        console.warn(e)
    }
}