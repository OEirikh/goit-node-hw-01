const fs = require("fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.normalize("./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    return console.log(
      data.filter((contact) => contact.id === String(contactId))
    );
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const sourceContacts = await listContacts();
    const newContacts = sourceContacts.filter(
      (contact) => contact.id !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    return sourceContacts.filter((contact) => contact.id === id);
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = uuidv4();

    const newContact = {
      id,
      name,
      email,
      phone,
    };

    const contacts = await listContacts();
    const newContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    return newContact;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
