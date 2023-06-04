const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Group = require('../../models/group');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/groups", () => {
  beforeAll( async () => {
    const user = new User({email: "test@test.com", username: "test", password: "12345678"});
    await user.save();

    token = JWT.sign({
      user_id: user.id,
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  beforeEach( async () => {
    await Group.deleteMany({});
  })

  afterAll( async () => {
    await User.deleteMany({});
    await Group.deleteMany({});
  })

  describe("POST /groups, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/groups")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "study group 1", members: [], posts: [], token: token });
      expect(response.status).toEqual(201);
    });
  
    test("creates a new group", async () => {
      await request(app)
        .post("/groups")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "study group 1", members: [], posts: [], token: token });
      let groups = await Group.find();
      expect(groups.length).toEqual(1);
      expect(groups[0].name).toEqual("study group 1");
    });
  
    test("returns a new token", async () => {
      let response = await request(app)
        .post("/groups")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "study group 1", members: [], posts: [], token: token })
      let newPayload = JWT.decode(response.body.token, secret);
      let originalPayload = JWT.decode(token, secret);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });  
  });
  
  describe("POST /groups, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/groups")
        .send({ name: "study group 2", members: [], posts: [] });
      expect(response.status).toEqual(401);
    });
  
    test("a group is not created", async () => {
      await request(app)
        .post("/groups")
        .send({ name: "study group 2", members: [], posts: [] });
      let groups = await Group.find();
      expect(groups.length).toEqual(0);
    });
  
    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/groups")
        .send({ name: "study group 2", members: [], posts: [] });
      expect(response.body.token).toEqual(undefined);
    });
  })

  describe("GET /groups, when token is present", () => {
    test("returns every group in the collection", async () => {
      let group1 = new Group({name: "group 1", members: [], posts: []});
      let group2 = new Group({name: "group 2", members: [], posts: []});
      await group1.save();
      await group2.save();
      let response = await request(app)
        .get("/groups")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let groupNames = response.body.groups.map((group) => ( group.name ));
      expect(groupNames).toEqual(["group 1", "group 2"]);
    });

    test("the response code is 200", async () => {
      let group1 = new Group({name: "group 1", members: [], posts: []});
      let group2 = new Group({name: "group 2", members: [], posts: []});
      await group1.save();
      await group2.save();
      let response = await request(app)
        .get("/groups")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      expect(response.status).toEqual(200);
    })

    test("returns a new token", async () => {
      let group1 = new Group({name: "group 1", members: [], posts: []});
      let group2 = new Group({name: "group 2", members: [], posts: []});
      await group1.save();
      await group2.save();
      let response = await request(app)
        .get("/groups")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let newPayload = JWT.decode(response.body.token, secret);
      let originalPayload = JWT.decode(token, secret);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  })

  describe("GET /groups, when token is missing", () => {
    test("returns no groups", async () => {
      let group1 = new Group({name: "group 1", members: [], posts: []});
      let group2 = new Group({name: "group 2", members: [], posts: []});
      await group1.save();
      await group2.save();
      let response = await request(app)
        .get("/groups");
      expect(response.body.groups).toEqual(undefined);
    })

    test("the response code is 401", async () => {
      let group1 = new Group({name: "group 1", members: [], posts: []});
      let group2 = new Group({name: "group 2", members: [], posts: []});
      await group1.save();
      await group2.save();
      let response = await request(app)
        .get("/groups");
      expect(response.status).toEqual(401);
    })

    test("does not return a new token", async () => {
      let group1 = new Group({name: "group 1", members: [], posts: []});
      let group2 = new Group({name: "group 2", members: [], posts: []});
      await group1.save();
      await group2.save();
      let response = await request(app)
        .get("/groups");
      expect(response.body.token).toEqual(undefined);
    });
  })

  describe("POST /groups/:id/members, when token is present", () => {
    test("adds a user to the group", async () => {
      const group = new Group({ name: "study group 1", members: [], posts: [] });
      await group.save();
  
      const newUser = new User({ email: "newuser@test.com", username: "newuser", password: "12345678" });
      await newUser.save();
  
      await request(app)
        .post(`/groups/${group.id}/members`)
        .set("Authorization", `Bearer ${token}`)
        .send({ userId: newUser.id, token: token });
  
      const updatedGroup = await Group.findById(group.id);
      expect(String(updatedGroup.members[0])).toEqual(String(newUser.id));
    });
  }); 
  
  describe("DELETE /groups/:id/members, when token is present", () => {
    test("removes a user from the group", async () => {
      const group = new Group({ name: "study group 1", members: [], posts: [] });
      const newUser = new User({ email: "newuser@test.com", username: "newuser", password: "12345678" });
      
      await newUser.save();
      group.members.push(newUser);
      await group.save();
  
      await request(app)
        .delete(`/groups/${group.id}/members`)
        .set("Authorization", `Bearer ${token}`)
        .send({ userId: newUser.id, token: token });
    
      const updatedGroup = await Group.findById(group.id);
      expect(updatedGroup.members).not.toContain(String(newUser.id));
    });
  });  

  describe("POST /groups/:id/posts, when token is present", () => {
    test("adds a post to the group", async () => {
      const group = new Group({
        name: "study group 1",
        members: [],
        posts: [],
      });
      await group.save();
  
      const newPostMessage = "New post";
  
      const response = await request(app)
        .post(`/groups/${group.id}/posts`)
        .set("Authorization", `Bearer ${token}`)
        .send({ message: newPostMessage, token: token });
  
      expect(response.status).toEqual(201);
  
      const updatedGroup = await Group.findById(group.id).populate('posts');
      expect(updatedGroup.posts.length).toEqual(1);
      expect(updatedGroup.posts[0].message).toEqual(newPostMessage);
    });
  });  
});
