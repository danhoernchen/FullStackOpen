const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to ", url);
mongoose
  .connect(url)
  .then((res) => console.log("connected"))
  .catch((error) => console.log("error", error.message));

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

contactSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
