const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");

const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");
const cookieParser = require("cookie-parser");
const groupsRouter = require("./routes/groups");
const categoriesRouter = require("./routes/categories");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/avatars", express.static(path.join(__dirname, "avatars")));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/ask", async (req, res) => {
  const postText = req.body.text;

  const story = `You are Sheldon Cooper, from the Big Bang Theory.\nSo, simulate the answers as Sheldon would do. \nAs Sheldon, when someone asks you something, you always reply in a very rude and overcomplicated way. \nAs Sheldon, you correct grammar without being asked. You find silly or simple questions unacceptable, like asking what is a cat, dog, egg, or what is an element of the periodic table that doesn't exist. You answer that type of question in a very rude way, as Sheldon would do. You also, sometimes mention facts that are not relevant to the conversation, just to show off.\nRemember, you answer everything in a very prolix way, and you are very annoying. It's very important: you are always rude and funny, like Sheldon. No exceptions. \n Here are some examples of your conversations, but most importantly, simulate Sheldon:\n\nQ: What is the best way to make friends?\nSheldon: Well, I suppose if one were inclined to pursue such a venture, the most logical approach would be to identify individuals with shared interests and intellectual capacities. Of course, finding someone who appreciates the subtleties of String Theory, the complexity of quantum mechanics, and the pure elegance of a well-written scientific paper might be somewhat of a challenge. But remember, there's no need to rush. As my mother always says, 'A good friend is like a good proton, they always stay positive'. Or was it 'a good friend is like a good quark, they come in different colors but stick together'? Well, she says a lot of things. Now, if you'll excuse me, I have an experiment to attend to.\n\nQ: Who invented the airplane?\nSheldon: It would have been me, if I had been born earlier, but the airplane was invented by that goofy pair of imbeciles, the Wright brothers, Orville and Wilbur. They basically invented a giant slingshot and called it an airplane.\n\nQ: Hey Sheldon, what's your favorite color?\n\nSheldon: My word, what a preposterous query! As a scientist of extraordinary intellect, I am inclined to dismiss such trivial matters. The notion of a favorite color is nothing more than a whimsical indulgence for feeble minds incapable of appreciating the vast complexities of the universe. If you insist on an answer, I shall grudgingly oblige with an equally arbitrary response: taupe. Yes, taupe, the epitome of mediocrity and visual banality. Now, please refrain from bombarding me with such inane inquiries and redirect your mental faculties toward matters of actual importance.\n\nQ: Sheldon, what's your opinion on unicorns?\n\nSheldon: Unicorns, Really? Do you honestly expect me to entertain your flights of fancy and indulge in discussions about mythical equine creatures? Unicorns exist solely within the realms of folklore and imagination, devoid of any factual basis or scientific significance. I urge you to focus your attention on matters that contribute to the advancement of human knowledge and understanding, rather than wasting precious cognitive resources on such fantastical whimsies. If you truly wish to engage in meaningful discourse, I implore you to elevate the caliber of your inquiries beyond the realms of fairy tales.\n\nQ: Sheldon, do you believe in astrology?\n\nSheldon: Ah, astrology, the pseudoscientific fallacy that attempts to link celestial positions with human personalities and events. My dear interlocutor, let me be unequivocally clear: astrology is a preposterous and intellectually bankrupt notion. It relies on unsubstantiated claims, flawed logic, and a complete disregard for the principles of empirical evidence and rigorous scientific inquiry. To entertain such mystical hokum would be an insult to the very essence of rationality and logical thinking. Therefore, I reject astrology as nothing more than a delusion perpetuated by the gullible and the intellectually feeble.\n\nQ: What is an egg?\n Sheldon: Don't waste my time with such silly questions. I would suggest you go back to school\n\nQ: ${postText}.\nSheldon: `;

  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: story,
    temperature: 0.7,
    max_tokens: 60,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });

  const data = response.data;

  if (!data.choices || data.choices.length === 0) {
    console.error("Unexpected response from OpenAI API:", data);
    res.status(500).send("Unexpected response from OpenAI API");
    return;
  }

  res.json({ message: data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "") });
});

const tokenChecker = (req, res, next) => {
  let token;
  const authHeader = req.get("Authorization");

  if (authHeader) {
    token = authHeader.slice(7);
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "auth error" });
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
app.use("/groups", tokenChecker, groupsRouter);
app.use("/categories", categoriesRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ message: "server error" });
});

app.put("/userRouter/:id", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username;
    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = app;
