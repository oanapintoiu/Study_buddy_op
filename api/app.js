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
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));


app.post('/ai', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {  //better to find out how to use the open ai library in future
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: message,
        max_tokens: 60
      })
    });

    if (!response.ok) throw new Error(`Server response: ${response.status}`);

    const data = await response.json();

    
    res.json(data.choices[0].text.replace(/(\r\n|\n|\r)/gm, ""));
  } catch (error) {
    console.error(error);
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
