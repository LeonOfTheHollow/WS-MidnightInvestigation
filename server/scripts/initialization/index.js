const createGame = (options) => {
  console.log("Going to create game with following options: ", options);
  const game = {};
  game.players = Array(parseInt(options.numberOfPlayers));
  game.title = "Hastur's Opening Night";
  return game;
}

module.exports = {
  createGame
}