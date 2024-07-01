const express = require("express");
const {
  registerUser,
  loginUser,
  singleUser,
  newGuardian,
  delGuardian,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/single", singleUser);
router.post("/addGuardian", newGuardian);
router.post("/del", delGuardian);

module.exports = router;
