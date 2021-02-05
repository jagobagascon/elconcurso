
// Common config values
export var common = {
    applicationId: "D9DAAF03",
    namespace: "urn:x-cast:el-concurso:msg",
};

export const GameState = {
    DISCONNECTED: 0,
    LOBBY: 1,
    STARTED: 2,
}

export const Events = {
    PlayerNameChanged: 0,
}

export class Message {
    constructor(event, data){
        this.event = event;
        this.data = data;
    }
}