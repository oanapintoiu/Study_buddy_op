const mongoose = require("mongoose");

require("../mongodb_helper");
const Group = require("../../models/group");

describe("Group model", () => {
  // beforeEach((done) => {
  //   mongoose.connection.collections.group.drop(() => {
  //     done();
  //   });
  // });

  it("can save a group", () => {
    const group = new Group({ name: "Test Group" });

    expect(group).toMatchObject({ name: "Test Group" });
  });
});
