require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const ColorModel = require("./db/color.model");
const CompanyModel = require("./db/company.model");
const BookModel = require("./db/book.model");
const { application } = require("express");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: -1 });
  return res.json(employees);
});

app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;
console.log(employee)
  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/company", async (req, res) => {
  const company = req.body;

  try {
    const saved = await CompanyModel.create(company);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
})

app.get("/api/books", async (req, res) => {
  const books = await BookModel.find();
  return res.json(books);
})

app.get("/api/company", async (req, res) => {
  const companies = await CompanyModel.find();
  return res.json(companies);
})

app.get("/api/colors", async (req, res) => {
  const colors = await ColorModel.find();
  return res.json(colors);
})

app.get("/api/missing", async (req, res) => { 
  let missingEmployees = await EmployeeModel.find({ $or:[ {ispresent : false}, {ispresent : { $exists:false }} ] })
  return res.json(missingEmployees)
})

app.get("/robert", async (req, res) => {
  let employees = await EmployeeModel.find();
  employees = employees.filter((employee) =>
  employee.name.toLowerCase().includes("robert")
)
  return res.json(employees);
});

app.use("/api/equipment/:id", async (req, res, next) => {
  let equipment = null;

  try {
    equipment = await EquipmentModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!equipment) {
    return res.status(404).end("Equipment not found");
  }

  req.equipment = equipment;
  next();
});

app.get("/api/equipment", async (req, res) => {
  const equipment = await EquipmentModel.find().sort({ created: -1 });
  return res.json(equipment);
});

app.get("/api/equipment/:id", (req, res) => {
  return res.json(req.equipment);
});

app.post("/api/equipment/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipment/:id", async (req, res, next) => {
  const equipment = req.body;

  try {
    const updated = await req.equipment.set(equipment).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipment/:id", async (req, res, next) => {
  try {
    const deleted = await req.equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
