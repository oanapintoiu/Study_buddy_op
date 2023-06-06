const mongoose = require("mongoose");
const Category = require("../../models/category")
const Subcategory = require("../../models/subcategory")

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  let category;
  let subcategory;

  beforeAll( async () => {
    category = new Category({name: "test category"});
    await category.save();

    subcategory = new Subcategory({name: "test subcategory", category: category._id});
    await subcategory.save();

    category.subcategories = [subcategory._id]
    category.save();
  });

  afterAll( async () => {
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
  })

  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has a username and email address", () => {
    const user = new User({
      email: "someone@example.com",
      username: "someoneNICER",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
    expect(user.username).toEqual("someoneNICER")
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      username: "someoneNICE",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      email: "someone@example.com",
      username: "someoneNICER",
      password: "password",
      preferences: [{
        category: category._id,
        subcategory: subcategory._id,
        level: "test level"
      }]
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          username: "someoneNICER",
          password: "password",
          preferences: [{
            category: category._id,
            subcategory: subcategory._id,
            level: "test level"
          }]
        });
        done();
      });
    });
  });

});
