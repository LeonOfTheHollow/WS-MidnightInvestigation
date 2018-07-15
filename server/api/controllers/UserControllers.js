const User = require('../models/User');

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = { username, password, email };
  const user = new User(newUser);
  user.save((err, createdUser) => {
    if (err) {
      console.log('There was a problem saving the user to the database!')
      res.status(422);
      res.send({'Error inserting into users: ': err.message});
      return;
    }
    res.json(createdUser);
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const formattedUsername = username.toLowerCase();
  try {
    const currentUser = await User.findOne({ username: formattedUsername });
    if (currentUser === null) {
      res.status(422).json({ error: "Couldn't find that user in the database" });
      return;
    }
    const userIsValidated = await currentUser.checkPassword(password);
    if (userIsValidated) {
      res.status(200).json(currentUser)
    } else {
      res.status(422).json({ error: "Couldn't validate user's password" });
    }
  } catch(e) {
    console.log("There was an error logging in: ", e);
  }
}

module.exports = {
  register,
  login,
}