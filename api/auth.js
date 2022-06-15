const express = require("express");
const router = express.Router();

const { registerUser } = require("../controller/auth");

router.post("/registration", registerUser);

// router.get("/:contactId", getById);

// router.post("/", create);

// router.put("/:contactId", update);

// router.patch("/:contactId/favorite", updateStatus);

// router.delete("/:contactId", remove);

module.exports = router;
