const mongoose = require("mongoose");

require("../mongodb_helper");
const OpenAI = require("../../models/openAI");

describe("OpenAI model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.openais.drop(() => {
      done();
    });
  });

  it("can create an OpenAI chat", () => {
    const chat = new OpenAI({
      question: "How does AI work?",
      response: "AI works by simulating human intelligence using algorithms and data.",
      userId: mongoose.Types.ObjectId(),
      groupId: mongoose.Types.ObjectId(),
    });

    expect(chat).toMatchObject({
      question: "How does AI work?",
      response: "AI works by simulating human intelligence using algorithms and data.",
    });
  });

  it("can save an OpenAI chat", (done) => {
    const chat = new OpenAI({
      question: "How does AI work?",
      response: "AI works by simulating human intelligence using algorithms and data.",
      userId: mongoose.Types.ObjectId(),
      groupId: mongoose.Types.ObjectId(),
    });

    chat.save((err) => {
      expect(err).toBeNull();

      OpenAI.find((err, chats) => {
        expect(err).toBeNull();

        expect(chats[0]).toMatchObject({
          question: "How does AI work?",
          response: "AI works by simulating human intelligence using algorithms and data.",
        });
        done();
      });
    });
  });

  it("should require question, response, userId, and groupId fields", (done) => {
    const invalidChat = new OpenAI();

    invalidChat.validate((err) => {
      expect(err).toBeDefined();
      expect(err.errors).toHaveProperty("question");
      expect(err.errors).toHaveProperty("response");
      expect(err.errors).toHaveProperty("userId");
      expect(err.errors).toHaveProperty("groupId");
      done();
    });
  });
});
