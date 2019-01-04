const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    id: Number,
    name: String,
    status: String
});
var userModel = mongoose.model("tododetails", todoSchema, "tododetails");
module.exports = userModel;
