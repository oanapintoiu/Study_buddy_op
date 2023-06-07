const express = require("express");
const router = express.Router();

const GroupController = require("../controllers/groups");

router.get("/", GroupController.Index);
router.post("/", GroupController.Create);
router.get("/:id", GroupController.Show);
router.put("/:id", GroupController.Update);
router.delete("/:id", GroupController.Delete);
router.post("/:id/members", GroupController.AddMember);
router.delete("/:id/members", GroupController.RemoveMember);
router.post("/:id/posts", GroupController.CreatePost);
router.post("/filter", GroupController.Filter)

module.exports = router;
