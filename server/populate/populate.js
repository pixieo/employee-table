/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");

const equipments = require("./equipment.json");
const types = require("./type.json");
const amounts = require("./amount.json");
const EquipmentModel = require("../db/equipment.model");

const colorNames = require("./color.json");
const ColorModel = require("../db/color.model");

const books = require("./book.json");
const BookModel = require("../db/book.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateColors = async () => {
  await ColorModel.deleteMany({});

  const colors = colorNames.map((color) => ({
    name: color
  }))

  await ColorModel.create(...colors);
}

const populateBooks = async () => {
  await BookModel.deleteMany({});

  const allBooks = books.map((book) => ({
    author: book.author,
    title: book.title
  }))

  await BookModel.create(...allBooks);
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = await Promise.all(names.map(async (name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    color: (await ColorModel.findOne({name: pick(colorNames)}))._id,
    readBooks: pick(books)
  })))

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateEquipment = async () => {
  await EquipmentModel.deleteMany({});

  const equipment = equipments.map((name) => ({
    name,
    type: pick(types),
    amount: pick(amounts),
  }));

  await EquipmentModel.create(...equipment);
  console.log("Equipment created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateColors();
  await populateBooks();
  await populateEmployees();
  await populateEquipment();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
