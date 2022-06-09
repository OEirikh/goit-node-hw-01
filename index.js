const contacts = require("./contacts");
const colors = require("colors");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "Action type")
  .option("-i, --id <type>", "Contact id")
  .option("-n, --name <type>", "Contact name")
  .option("-e, --email <type>", "Contact email")
  .option("-p, --phone <type>", "Contact phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const getistContacts = await contacts.listContacts();
      console.table(getistContacts);
      break;

    case "get":
      if (!id) {
        throw new Error("\x1B[31m No such parameters");
      }
      const getContact = await contacts.getContactById(id);
      getContact && console.log("getContact :", getContact);
      break;

    case "add":
      if (!name || !email || !phone) {
        throw new Error("\x1B[31m No such parameters");
      }
      const addedContact = await contacts.addContact(name, email, phone);
      console.log("addedContact :".magenta, addedContact);
      break;

    case "remove":
      if (!id) {
        throw new Error("\x1B[31m No such parameters");
      }
      const removeContact = await contacts.removeContact(id);

      if (removeContact.length === 0) {
        throw new Error(`\x1B[31m No such contact with id = ${id}`);
      }
      console.log("contact".magenta, removeContact, "is deleted".magenta);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
