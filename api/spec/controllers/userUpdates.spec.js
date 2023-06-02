const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
const TokenGenerator = require("../../models/token_generator");

describe("User Updates", () => {
  let user;
  let new_token;

  beforeEach(async () => {
    await User.deleteMany({});

    user = new User({
      email: "daved@test.com",
      username: "dave",
      password: "5678",
      firstName: "Dave",
      lastName: "David",
    });
    await user.save();

    new_token = TokenGenerator.jsonwebtoken(user._id);

});

describe("when updating email only", () => {
    const updatedFields = {
      email: "newJohn@email.com",
    };
    let response;

    beforeEach(async () => {
      response = await request(app)
        .put(`/users/`)
        .set('Cookie', [`token=${new_token}`])
        .send(updatedFields);
    });

    it("should return status 200", async () => {
      expect(response.statusCode).toEqual(200);
    });

    it("should update the email only", async () => {
      const updatedUser = await User.findById(user._id);
      expect(updatedUser.email).toEqual(updatedFields.email);
    });
  });

  describe("when updating username and password", () => {
    const updatedFields = {
      username: "Johnny",
      password: "seven2",
      firstName: "Johhny"
    };
    let response;

    beforeEach(async () => {
      response = await request(app)
        .put(`/users/`)
        .set('Cookie', [`token=${new_token}`])
        .send(updatedFields);
    });

    it("should return status 200", async () => {
      expect(response.statusCode).toEqual(200);
    });

    it("should update the email only", async () => {
      const updatedUser = await User.findById(user._id);
      expect(updatedUser.username).toEqual(updatedFields.username);
      expect(updatedUser.password).toEqual(updatedFields.password);
      expect(updatedUser.firstName).toEqual(updatedFields.firstName);
      expect(updatedUser.lasttName).toEqual(updatedFields.lastName);
    });
  });

  describe('when encountering an error during update', () => {
    const updatedFields = {
      email: 'newemail@test.com',
    };
    let response;

    beforeEach(async () => {
      // Mock the error by setting UserId to an invalid value
      const invalidUserId = 'invalid_user_id';
      const token = TokenGenerator.jsonwebtoken(invalidUserId);

      response = await request(app)
        .put('/users')
        .set('Cookie', [`token=${token}`])
        .send(updatedFields);
    });

    it('should return status 400', async () => {
      expect(response.statusCode).toEqual(400);
    });

    it('should return "Bad request" message', async () => {
      expect(response.body.message).toEqual('Bad request');
    });
  });

});