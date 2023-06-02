const express = require("express");
const router = express.Router();

const GroupController = require("../controllers/groups");

router.get("/", GroupController.Index);
router.post("/", GroupController.Create);
router.get("/:id", GroupController.Show);
router.put("/:id", GroupController.Update);
router.delete("/:id", GroupController.Delete);

module.exports = router;
