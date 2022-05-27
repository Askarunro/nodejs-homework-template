const express = require("express");

const router = express.Router();

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
    value
      ? res.status(200).json(value)
      : res.status(404).json({ message: "Not found" });
  });
});

router.post("/", async (req, res, next) => {
  addContact(req.body).then((value) =>
    value
      ? res.status(201).json(value)
      : res.status(400).json({ message: "missing required name field" })
  );
});

router.delete("/:contactId", async (req, res, next) => {
  removeContact(req.params.contactId).then(
    (value) => {
      if (!value) {
        res.status(404).json({ message: "Not found" });
      } else res.status(200).json({ message: "contact deleted" });
    }

    // value
    //   ? res.status(200).json({ message: "contact deleted" })
    //   : res.status(404).json({ message: "Not found" })
  );
});

router.put("/:contactId", async (req, res, next) => {
  req.body
    ? updateContact(req.params.contactId, req.body).then((value) => {
        value
          ? res.status(200).json(value)
          : res.status(404).json({ message: "Not found" });
      })
    : res.status(400).json({ message: "missing fields" });
});

router.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = router;
