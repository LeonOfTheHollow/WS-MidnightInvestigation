module.exports = app => {
  const UserControllers = require('../controllers/UserControllers');
  const GameControllers = require('../controllers/GameControllers');

  app.route('/register')
    .post(UserControllers.register);

  app.route('/login')
    .post(UserControllers.login);

  app.route('/new-game')
    .post(GameControllers.buildNewGame);
}