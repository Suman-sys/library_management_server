const express = require('express');
const { login, register, getAllUsers } = require("../controllers/UserController");

const router = express.Router();

router.get("/", getAllUsers)
router.post("/register", register)
router.post("/login", login);

module.exports = router;