const Group = require("../models/group");
const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");
const mongoose = require('mongoose');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination directory to save the uploaded avatar images
    cb(null, "avatars");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    //
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    cb(null, "group-" + uniqueSuffix + "." + fileExtension);
  },
});

// Create multer upload instance
const upload = multer({ storage: storage });


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
      const group = await Group.findById(req.params.id)
      .populate({
        path: 'posts',
        populate: { path: 'user' }}
      )
      .populate("members")
      .exec();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ group: group, token: token });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch group");
    }
  },
  Create: async (req, res) => {
    upload.single("groupCard")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        res.status(500).json({
          message: "Error uploading avatar image",
        });
      } else if (err) {
        res.status(500).json({
          message: "Error processing request",
        });
      }

    try {
      let { name, category, subcategory, level, partySize, groupType } = req.body;
      const isPrivate = groupType === 'private';
      const userId = req.user_id;
      category = mongoose.Types.ObjectId(category);
      subcategory = mongoose.Types.ObjectId(subcategory);
  
      const group = new Group({ name, category, subcategory, level, partySize, private: isPrivate });
      group.members.push(userId);
      if (req.file) {
        group.groupCard = `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`;
      }
      await group.save();

      const user = await User.findById(userId).exec();
      user.groups.push(group._id);
      await user.save();

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ group: group, token: token });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create group");
    }
  })
  },
  // Create: (req, res) => {
  //     upload.single("groupCard")(req, res, (err) => {
  //       if (err instanceof multer.MulterError) {
  //         res.status(500).json({
  //           message: "Error uploading avatar image",
  //         });
  //       } else if (err) {
  //         res.status(500).json({
  //           message: "Error processing request",
  //         });
  //       }

  //       let { name, category, subcategory, level, partySize, groupType } = req.body;
  //       const isPrivate = groupType === 'private';
  //       const userId = req.user_id;
  //       category = mongoose.Types.ObjectId(category);
  //       subcategory = mongoose.Types.ObjectId(subcategory);
    
  //       const group = new Group({ name, category, subcategory, level, partySize, private: isPrivate,
  //        });
  //        console.log("Req file", req.file)
  //       if (req.file) {
  //         group.groupCard = `${req.protocol}://${req.get("host")}/avatars/${req.file.filename}`;
  //       }

  //       group.members.push(userId);
  //       group.save().
  //         then((group) => {
  //         User.findById(userId)
  //         .then((user) => {
  //           user.groups.push(group._id);
  //           user.save()
  //           .then((savedUser) => {
  //             console.log("savedUser: ", savedUser)
  //             const token = TokenGenerator.jsonwebtoken(req.user_id);
  //             res.status(201).json({ group: group, token: token });
  //           })
  //         });
  
  //       });
  
  //     });
  // },
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
  JoinGroup: async (req, res) => {
    try {
      const groupId = mongoose.Types.ObjectId(req.params.id);
      const userId = mongoose.Types.ObjectId(req.user_id);

      const group = await Group.findById(groupId).exec();
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }

      if (group.members.includes(userId)) {
        return res.status(400).json({ message: "User already a member of this group" });
      }

      group.members.push(userId);
      await group.save();

      const user = await User.findById(userId).exec();
      user.groups.push(groupId);
      await user.save();

      res.status(200).json({ message: "Joined group successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to join group" });
    }
  },
  LeaveGroup: async (req, res) => {
    try {

      const groupId = mongoose.Types.ObjectId(req.body.group);
      const userId = mongoose.Types.ObjectId(req.user_id);
      console.log(groupId)
      const group = await Group.findById(groupId).exec();
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      if (!group.members.includes(userId)) {
        return res.status(400).json({ message: "User is not a member of this group" });
      }
      // Remove the user from the group’s members
      const index = group.members.indexOf(userId);
      if (index > -1) {
        group.members.splice(index, 1);
      }
      await group.save();
      // Remove the group from the user’s groups
      const user = await User.findById(userId).exec();
      const userGroupIndex = user.groups.indexOf(groupId);
      if (userGroupIndex > -1) {
        user.groups.splice(userGroupIndex, 1);
      }
      await user.save();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: "Left group successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to leave group" });
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
      const { message, user } = req.body;
      console.log("user: ", user)
      const userProjection = await User.findOne({ username: user },'_id').exec();
      console.log("userId: ", userProjection)

      const group = await Group.findById(groupId).exec();
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
  
      // Create a new post and add it to the group
      const newPost = new Post({ message, group: group._id, user: userProjection._id});
      await newPost.save();
  
      group.posts.push(newPost._id);
      await group.save();
  
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "Post created successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create post" });
    }
  },  

  CreateAIPost: async (req, res) => {
    console.log(req.body)
    const groupId = req.params.id;
    const { message } = req.body;
    const ai_question = req.body.ai_question;
  
    try {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
  
      // Create a new post and add it to the group
      const newPost = new Post({ message, group: group._id, ai_question });
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
      const { category, subcategory, level, groupType, name } = req.body;
      const isPrivate = groupType === 'private';
      console.log(category)
      let query = {};
      if (category) {
        query.category = category;
      }
      if (subcategory) {
        query.subcategory = subcategory;
      }
      if (level) {
        query.level = level
      }
      if (groupType) {
        query.private = isPrivate
      }
      if (name) {
        query.name = { $regex: name, $options: 'i' };
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
