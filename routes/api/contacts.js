const express = require("express");
const Joi = require("joi");
const router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(13),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("..//../models/contacts");

router.get("/", async (req, res, next) => {
  listContacts().then((value) => res.status(200).json(value));
});

router.get("/:contactId", async (req, res, next) => {
  getContactById(req.params.contactId).then((value) => {
    return value
      ? res.status(200).json(value)
      : res.status(404).json({ message: "Not found" });
  });
});

router.post("/", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length<=2 || schema.validate(req.body).error) {
      return res.status(400).json({ message: "missing fields" });
    }
    addContact(req.body).then((value) => {
      return res.status(201).json(value);
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });

  }
});

router.delete("/:contactId", async (req, res, next) => {
  removeContact(req.params.contactId).then((value) => {
    console.log(value);
    return value
      ? res.status(200).json({ message: "contact deleted" })
      : res.status(404).json({ message: "Not found" });
  });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length===0 || schema.validate(req.body).error) {
      return res.status(400).json({ message: "missing fields" });
    }
    updateContact(req.params.contactId, req.body).then((value) => {
      return value
        ? res.status(200).json(value)
        : res.status(404).json({ message: "Not found" });
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = router;
