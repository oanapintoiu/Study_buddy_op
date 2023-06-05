const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.put("/", UsersController.Update);
router.get("/:username/avatars", UsersController.FindAvatar);
router.get("/:username/groups", UsersController.FindUserGroups);

module.exports = router;
