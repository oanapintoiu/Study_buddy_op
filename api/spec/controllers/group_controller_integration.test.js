const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Group = require("../../models/group");
const User = require("../../models/user");
const Post = require("../../models/post");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("Group Controller Integration Test", () => {
  let testUser;
  let testGroup;

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  beforeAll(async () => {
    const user = new User({
      email: "test@test.com",
      username: "test",
      password: "12345678",
    });
    await user.save();

    token = JWT.sign(
      {
        user_id: user.id,
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );

    // Create a unique user for this test
    testUser = new User({
      email: "integration@test.com",
      username: "integration",
      password: "12345678",
    });
    await testUser.save();

    // Create a new group for this test
    testGroup = new Group({
      name: "Integration Test Group",
      members: [],
      posts: [],
    });
    await testGroup.save();
  });

  test("adds user to group and makes a post", async () => {
    // Add the user to the group
    await request(app)
      .post(`/groups/${testGroup._id}/members`)
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: testUser._id, user_id: token });

    let updatedGroup = await Group.findById(testGroup._id);
    expect(String(updatedGroup.members[0])).toEqual(String(testUser._id));

    // Add a post to the group
    const newPostMessage = "Integration Test Post";

    let response = await request(app)
      .post(`/groups/${testGroup._id}/posts`)
      .set("Authorization", `Bearer ${token}`)
      .send({ message: newPostMessage, user: "integration" });

    expect(response.status).toEqual(201);

    updatedGroup = await Group.findById(testGroup.id).populate("posts");
    expect(updatedGroup.posts.length).toEqual(1);
    expect(updatedGroup.posts[0].message).toEqual(newPostMessage);
  });
});
