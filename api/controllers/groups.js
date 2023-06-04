const Group = require("../models/group");
const TokenGenerator = require("../models/token_generator");
const mongoose = require('mongoose');

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
    console.log("ENTROU NO SHOW",req.params.id)
    Group.findById(req.params.id, async (err, group) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ group: group, token: token });
    });
  },
  Create: (req, res) => {

    let { name, category, subcategory } = req.body;
    console.log(category)
    console.log(subcategory)


     category = mongoose.Types.ObjectId(category)
     subcategory = mongoose.Types.ObjectId(subcategory)
  
    const group = new Group({ name, category, subcategory });
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

  AddMember: (req, res) => {
    const userId = req.body.userId;
  
    Group.findById(req.params.id, async (err, group) => {
      if (err) {
        throw err;
      }
  
      if (group.members.includes(userId)) {
        res.status(400).json({ message: "User already a member of this group" });
      } else {
        group.members.push(userId);
  
        group.save(async err => {
          if (err) {
            throw err;
          }
  
          const token = await TokenGenerator.jsonwebtoken(req.user_id);
          res.status(200).json({ group: group, token: token });
        });
      }
    });
  },

  RemoveMember: (req, res) => {
    const userId = req.body.userId;
  
    Group.findById(req.params.id, async (err, group) => {
      if (err) {
        throw err;
      }
  
      if (!group.members.includes(userId)) {
        res.status(400).json({ message: "User not a member of this group" });
      } else {
        const index = group.members.indexOf(userId);
        if (index > -1) {
          group.members.splice(index, 1);
        }
  
        group.save(async err => {
          if (err) {
            throw err;
          }
  
          const token = await TokenGenerator.jsonwebtoken(req.user_id);
          res.status(200).json({ group: group, token: token });
        });
      }
    });
  },  
};  

module.exports = GroupController;
