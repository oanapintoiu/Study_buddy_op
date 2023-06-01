const mongoose = require("mongoose");
const User = require("../../models/user");
const Group = require("../../models/group");

describe("Group model", () => {
  // beforeEach((done) => {
  //   mongoose.connection.collections.groups.drop(() => {
  //     done();
  //   });
  // });

  it("has a name", () => {
    let user = new User({ name: "Test User", email: "test@test.com", password: "password123" });
    let group = new Group({ name: "Test Group", members: [user._id] });
    expect(group.name).toEqual("Test Group");
  });
});