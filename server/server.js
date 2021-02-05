
require('./index.html');
require('../favicon.png');

import { GameServer } from './game-server';

let gameServer = new GameServer(true/* debug */);

window.server = gameServer;
