const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./api/routes/routes');
const port = process.env.PORT || 5050;
const wss = new WebSocket.Server({ port: 8989 });
const mongoose = require('mongoose');

const Initializer = require('./scripts/initialization/index');

const corsOptions = {
  "origin": "*",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

server.use(helmet());
server.use(bodyParser.json());
server.use(cors(corsOptions));
server.use(express.static(path.join(__dirname, 'client/build')));

const users = [];

routes(server);

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});

mongoose
  .connect("mongodb://localhost/games")
  // .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`)
  .then(conn => {
    console.log("Successfully connected to database!");
  })
  .catch(err => {
    console.log("Database connection failed. . .");
  });


const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) { 
      client.send(JSON.stringify(data));
    }
  })
}

wss.on('connection', (ws) => {
  let index;
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log("Got a message on the socket: ", data.type);
    switch(data.type) {
      case 'ADD_USER': {
        index = users.length;
        users.push({ name: data.name, id: index + 1});
        ws.send(JSON.stringify({
          type: 'USERS_LIST',
          users
        }))
        broadcast({
          type: 'USERS_LIST',
          users
        }, ws)
        break;
      }
      case 'ADD_MESSAGE': 
        broadcast({
          type: 'ADD_MESSAGE',
          message: data.message,
          author: data.author
        }, ws)
        break;
      case 'CREATE_GAME':
        console.log("About to broadcast existence of new game...");
        const gameOptions = {
          numberOfPlayers: data.size
        };
        const broadcastPayload = {
          type: 'NEW_GAME_EXISTS',
          game: Initializer.createGame(gameOptions)
        };
        broadcast(broadcastPayload, ws)
        console.log(`Broadcast complete: `, broadcastPayload);
      default:
        break;
    }
  })

  ws.on('close', () => {
    users.splice(index, 1);
    broadcast({
      type: 'USERS_LIST',
      users
    }, ws)
  })
})