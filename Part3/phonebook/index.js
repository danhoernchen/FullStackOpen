const express = require("express");
const persons = require("./persons.json");
const { stringHash } = require("./stringHash.js");
const app = express();
const fs = require("fs");
const { stringify } = require("querystring");

app.use(express.json());

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

const PORT = 3001;
app.listen(PORT, () => console.log("Server running on port 3001"));
