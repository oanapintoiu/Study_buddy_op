const Group = require("../models/group");
const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const mongoose = require('mongoose');

const GroupController = {
  Index: async (req, res) => {
    try {
      const groups = await Group.find().exec();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ groups: groups, token: token });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch groups");
    }
  },
  Show: async (req, res) => {
    try {
      const group = await Group.findById(req.params.id).exec();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ group: group, token: token });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch group");
    }
  },
  Create: async (req, res) => {
    try {
      let { name, category, subcategory, level, partySize, groupType } = req.body;
      const isPrivate = groupType === 'private';
      const userId = req.user_id;
      category = mongoose.Types.ObjectId(category);
      subcategory = mongoose.Types.ObjectId(subcategory);
  
      const group = new Group({ name, category, subcategory, level, partySize, private: isPrivate });
      group.members.push(userId);
      await group.save();
  
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ group: group, token: token });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create group");
    }
  },
  Update: async (req, res) => {
    try {
      const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ group: group, token: token });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update group");
    }
  },
  Delete: async (req, res) => {
    try {
      await Group.findByIdAndRemove(req.params.id).exec();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: "Group deleted", token: token });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete group");
    }
  },
  AddMember: async (req, res) => {
    try {
      const userId = req.body.userId;
      const group = await Group.findById(req.params.id).exec();
  
      if (group.members.includes(userId)) {
        res.status(400).json({ message: "User already a member of this group" });
      } else {
        group.members.push(userId);
        await group.save();
  
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ group: group, token: token });
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add member");
    }
  },
  RemoveMember: async (req, res) => {
    try {
      const userId = req.body.userId;
      const group = await Group.findById(req.params.id).exec();
  
      if (!group.members.includes(userId)) {
        res.status(400).json({ message: "User not a member of this group" });
      } else {
        const index = group.members.indexOf(userId);
        if (index > -1) {
          group.members.splice(index, 1);
        }
  
        await group.save();
  
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ group: group, token: token });
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to remove member");
    }
  }, 
  
  CreatePost: async (req, res) => {
    try {
      const groupId = req.params.id;
      const { message } = req.body;
  
      const group = await Group.findById(groupId).exec();
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
  
      // Create a new post and add it to the group
      const newPost = new Post({ message, group: group._id });
      await newPost.save();
  
      group.posts.push(newPost._id);
      await group.save();
  
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "Post created successfully", token });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create post");
    }
  },
  Filter: async (req, res) => {
    
    try {
      const { category, subcategory, level, groupType } = req.body;
      console.log(category)
      let query = {};
      if (category) {
        query.category = category;
      }
      if (subcategory) {
        query.subcategory = subcategory;
      }
  
      const groups = await Group.find(query).exec();
      res.status(200).json({ groups });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch groups' });
    }
  }
};

module.exports = GroupController;
