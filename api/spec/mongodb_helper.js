var mongoose = require("mongoose");

beforeAll(function (done) {
  mongoose.connect("mongodb://0.0.0.0/study_buddy_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.on("open", function () {
    console.log("### Connection open", db);
    done();
  });
});

afterAll(function (done) {
  mongoose.connection.close(true, function () {
    done();
  });
});
