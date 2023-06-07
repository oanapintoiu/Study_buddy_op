// const mongoose = require("mongoose");

// require("../mongodb_helper");
// const Group = require("../../models/group");

// describe("Group model", () => {
//   beforeEach((done) => {
//     mongoose.connection.collections.groups.drop(() => {
//       done();
//     });
//   });

//   it("can create a group", () => {
//     const group = new Group({ name: "Test Group" });

//     expect(group).toMatchObject({ name: "Test Group" });
//   });

//   it("can save a group", (done) => {
//     var group = new Group({ name: "some group" });

//     group.save((err) => {
//       expect(err).toBeNull();

//       Group.find((err, groups) => {
//         expect(err).toBeNull();

//         expect(groups[0]).toMatchObject({ name: "some group" });
//         done();
//       });
//     });
//   });
// });
