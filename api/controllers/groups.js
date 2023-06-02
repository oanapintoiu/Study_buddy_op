const Group = require("../models/group");
const TokenGenerator = require("../models/token_generator");

const GroupController = {
  Index: (req, res) => {
    Group.find(async (err, groups) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ groups: groups, token: token });
    });
  },
  Show: (req, res) => {
    Group.findById(req.params.id, async (err, group) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ group: group, token: token });
    });
  },
  Create: (req, res) => {
    const group = new Group(req.body);
    group.save(async (err) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ group: group, token: token });
    });
  },
  Update: (req, res) => {
    Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      async (err, group) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ group: group, token: token });
      }
    );
  },
  Delete: (req, res) => {
    Group.findByIdAndRemove(req.params.id, async (err) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: "Group deleted", token: token });
    });
  },
};

module.exports = GroupController;
