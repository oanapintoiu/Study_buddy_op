const TokenDecoder = require("../models/token_decoder");
const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
          //  console.log('Error during user save:', err);
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },

  Update: (req, res) => {
    const UserId = TokenDecoder.decode(req.cookies.token).user_id;
    console.log("decoded_user_id", UserId);

    console.log("Request data:", req.body);
    const { email, username, password, firstName, lastName, } = req.body;

    const updateFields = {};
    if (email) updateFields.email = email;
    if (username) updateFields.username = username;
    if (password) updateFields.password = password;
    if (firstName) updateFields.firstName = firstName;
   // if (lastName) updateFields.lastName = lastName;

    User.findByIdAndUpdate(
      UserId,
      updateFields,
      { new: true, strict: false },
      (err, user) => {
        if (err) {
          console.log("UserUpdates error", err);
          res.status(400).json({ message: "Bad request" });
        } else {
          res.status(200).json({ message: "OK", user });
        }
      }
    );
  },
};



module.exports = UsersController;
