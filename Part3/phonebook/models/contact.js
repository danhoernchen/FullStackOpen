const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to ", url);
mongoose
  .connect(url)
  .then((res) => console.log("connected"))
  .catch((error) => console.log("error", error.message));

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: [true, "Name is required"],
  },
  number: {
    type: Number,
    validate: {
      validator: (v) => /(^\d\d\d?)-\d{5,}/.test(v),
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
