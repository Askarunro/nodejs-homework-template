const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const readFile = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(readFile);
  return contacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const indexContactById = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexContactById >= 0) {
    allContacts.splice(indexContactById, 1);
    fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const allContacts = await listContacts();
  if (name && email && phone) {
    const newContact = { id: `${allContacts.length + 1}`, name, email, phone };
    const newListContacts = [...allContacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(newListContacts));
    return listContacts();
  } else return undefined;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const indexContactById = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  const contactById = allContacts.find((contact) => contact.id === contactId);
  if (indexContactById >= 0) {
    const renewContact = { ...contactById, ...body };
    allContacts.splice(indexContactById, 1, renewContact);
    fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return renewContact;
  }
  else return undefined;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
