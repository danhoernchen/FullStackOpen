require("dotenv").config();
const express = require("express");
const persons = require("./persons.json");
const { stringHash } = require("./stringHash.js");
const app = express();
const fs = require("fs");
const { stringify } = require("querystring");
const morgan = require("morgan");
const Contact = require("./models/contact.js");

const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.name === "CastError") {
    return res.status(400).send("malformed id");
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(express.static("dist"));
app.use((req, res, next) => {
  if (req.method === "POST") {
    app.use(
      morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
      )
    );
  } else {
    app.use(morgan("tiny"));
  }
  next();
});

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((contacts) => res.json(contacts));
});

app.post("/api/persons", (req, res, next) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).send("Missing data, please include name and number");
  }
  const { name, number } = req.body;
  Contact.find({ name }).then((contact) => {
    console.log(contact);
    if (contact.length === 0) {
      const newPerson = new Contact({ name, number });
      newPerson
        .save()
        .then((newcontact) => res.json(newcontact))
        .catch((error) => next(error));
    } else {
      res.status(400).send("Person already in phonebook");
    }
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }
      person.name = req.body.name;
      person.number = req.body.number;
      return person.save().then((person) => {
        res.json(person);
      });
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res) => {
  console.log(req.params.id);
  Contact.findById(req.params.id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.statusCode = 400;
      res.send("Person not found");
    }
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  Contact.find({}).then((contacts) =>
    res.send(
      `Phonebook has info for ${
        contacts.length
      } people.\n\n${new Date().toString()}`
    )
  );
});

app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server running on port 3001"));
