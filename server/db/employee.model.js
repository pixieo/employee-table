// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  ispresent: Boolean,
  color: Schema.Types.ObjectId,
  salary: Number,
  company: Schema.Types.ObjectId,
  readBooks: [{
    author: String,
    title: String,
  }],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
