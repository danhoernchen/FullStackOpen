const express = require("express");
const persons = require("./persons.json");
const { stringHash } = require("./stringHash.js");
const app = express();
const fs = require("fs");
const { stringify } = require("querystring");
const morgan = require("morgan");

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
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).send("Missing data, please include name and number");
  }
  const { name, number } = req.body;
  if (persons.filter((person) => person.name === name).length === 0) {
    const id = stringHash(name).toString();
    const newPerson = { id, name, number };
    const newPersons = persons.concat(newPerson);
    const json = JSON.stringify(newPersons);
    fs.writeFile("./persons.json", json, "utf-8", () => {
      console.log("callback");
    });
    res.send("Created");
  } else {
    res.status(400).send("Person already in phonebook");
  }
});

app.get("/api/persons/:id", (req, res) => {
  console.log(req.params.id);
  const person = persons.find((person) => person.id === req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.statusCode = 400;
    res.send("Person not found");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const newPersons = persons.filter((person) => person.id !== req.params.id);
  const json = JSON.stringify(newPersons);
  fs.writeFile("./persons.json", json, "utf-8", () => {
    console.log("callback");
  });
  res.send("Deleted");
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${
      persons.length
    } people.\n\n${new Date().toString()}`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server running on port 3001"));
