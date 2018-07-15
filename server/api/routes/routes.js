module.exports = app => {
  const UserControllers = require('../controllers/UserControllers');

  app.route('/register')
    .post(UserControllers.register);

  app.route('/login')
    .post(UserControllers.login);

}