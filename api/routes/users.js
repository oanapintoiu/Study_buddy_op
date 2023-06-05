const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.put("/", UsersController.Update);
// router.delete("/", UsersController.Delete);

module.exports = router;
