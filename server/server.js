require('./index.html');
require('./style.css');
require('./favicon.png');

import { GameServer } from './game-server';

let gameServer = new GameServer(true/* debug */);

const ev = document.getElementById("ev");
function loop() {
    ev.textContent = "sendCustomMessage";
    try {
        gameServer.context.sendCustomMessage(namespace, undefined, "hola hamijos");
        ev.textContent = "" + new Date();
    } catch (error) {
        ev.textContent = "" + error;
    }

    let s = gameServer.context.getSenders().length
    ev.textContent = "" + s;
    setTimeout(loop, 500);


    for (let i in gameServer.context.getSenders()) {
        let s = gameServer.context.getSenders()[i];
        console.warn(s);
    }
}

ev.textContent = "runningLoop";
loop();