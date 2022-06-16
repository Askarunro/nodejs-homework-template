const express = require("express");
const router = express.Router();
const { schemaRegister } = require("../service/schemas/users");
const { validateRequest } = require("../middlewares/validateRequest");
const { auth } = require("../middlewares/auth");

const { registerUser, loginUser, logoutUser, currentUser } = require("../controller/auth");

router.post("/register", registerUser);

router.post("/login", validateRequest(schemaRegister), loginUser);

router.post("/logout", auth, logoutUser);

router.get("/current", currentUser);

module.exports = router;
