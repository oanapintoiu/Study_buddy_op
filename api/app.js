const openai = require('openai');
require('dotenv').config();
openai.apiKey = process.env.OPENAI_API_KEY;


const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");

const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");
const cookieParser = require("cookie-parser");
const groupsRouter = require("./routes/groups");  // require the groups router
const categoriesRouter = require("./routes/categories");

const app = express();

// setup for receiving JSON
app.use(express.json())
app.use(cookieParser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post('/ai', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.ChatCompletion.create({
      model: 'text-davinci-003',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    res.json(response.data.choices[0].message.content);
  } catch (error) {
    res.status(500).send(error);
  }
});

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {

  let token;
  const authHeader = req.get("Authorization")

  if(authHeader) {
    token = authHeader.slice(7)
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if(err) {
      console.log(err)
      res.status(401).json({message: "auth error"});
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};

// route setup
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);
app.use("/groups", tokenChecker, groupsRouter);  // use the groups router
app.use("/categories", categoriesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({message: 'server error'})
});

app.put('/userRouter/:id', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.username = username;
    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = app;
