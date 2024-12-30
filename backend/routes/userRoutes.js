const express = require("express");
const router = express.Router();
const {
  checkAndCreateUser,
  getUserByEmail,
} = require("../middleware/checkEveryThing");
console.log(checkAndCreateUser);

router.post("/", checkAndCreateUser);
router.get("/:email", getUserByEmail);

module.exports = router;
