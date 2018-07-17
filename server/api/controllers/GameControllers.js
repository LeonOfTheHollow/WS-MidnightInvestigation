const Game = require('../models/Game');
const Initializer = require('../../scripts/initialization/index');

const buildNewGame = async (req, res) => {
  const gameOptions = {
    numberOfPlayers: req.body.gameSize,
  }
  const newGame = Initializer.createGame(gameOptions);
  const game = new Game({game: newGame});
  try {
    const createdGame = await game.save();
    res.status(201).send(createdGame);
  } catch(e) {
    console.log(e);
  }
}

module.exports = {
  buildNewGame
}