const TokenDecoder = require("../models/token_decoder");
const User = require("../models/user");
const multer = require("multer");

// Configure multer storage
//multer disk storage is used to configure the destination directory and the filename of the uploaded file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination directory to save the uploaded avatar images
    cb(null, "avatars");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    //
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    cb(null, "avatar-" + uniqueSuffix + "." + fileExtension);
  },
});

// Create multer upload instance
const upload = multer({ storage: storage });

const UsersController = {
  Create: (req, res) => {
    upload.single("avatar")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(500).json({
          message: "Error uploading avatar image",
        });
      } else if (err) {
        res.status(500).json({
          message: "Error processing request",
        });
      }
      console.log("req.body.email", req.body.email)

      User.findOne({email: req.body.email}, (err, userCheck) => {
        if (userCheck) {
          return res.status(400).json({ message: "Email already exists" });
        }
        console.log("userCheck", userCheck)

        const user = new User(req.body);
        console.log("user", user)

        if (req.file) {
          user.avatar = `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`;
        }
        user.save((err) => {
          if (err) {
            res.status(400).json({ message: "Bad request" });
          } else {
            res.status(201).json({ message: "OK" });
          }
        });

      
      })
    });
  },

  Update: (req, res) => {
    const UserId = TokenDecoder.decode(req.cookies.token).user_id;
    console.log("decoded_user_id", UserId);

    console.log("Request data:", req.body);
    const { email, username, password, firstName, lastName } = req.body;

    const updateFields = {};
    if (email) updateFields.email = email;
    if (username) updateFields.username = username;
    if (password) updateFields.password = password;
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;

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

  FindAvatar: (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ message: "OK", avatar: user.avatar });
      }
    });
  },

  FindUserGroups: (req, res) => {
    User.findOne({ username: req.params.username })
      .populate("groups")
      .exec(async (err, user) => {
        if (err) {
          res.status(400).json({ message: "Bad request" });
        } else if (!user) {
          res.status(404).json({ message: "User not found" });
        } else {
          res.status(200).json({ message: "OK", groups: user.groups });
        }
      });
  },
  FindUserProfile: (req, res) => {
    User.findById(req.params.id, { password: 0 })
    .populate("groups")
    .exec(async (err, user) => { 
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ message: "OK", user });
      }
    })
  }
  
 
};

module.exports = UsersController;
