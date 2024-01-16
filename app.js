const express = require("express");
const cors = require("cors");
const app = express();
const elements = require("./elements");

app.use(
  cors({
    origin: "*",
    methods: "GET",
  })
);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/elements", (req, res) => {
  const validParams = [
    "id",
    "name",
    "symbol",
    "standard_state",
    "valence_electron",
    "period",
    "group",
    "block",
    "category",
  ];

  const filters = {};
  Object.entries(req.query).forEach(([key, value]) => {
    if (validParams.includes(key)) {
      filters[key] = value;
    }
  });

  const filteredElements = elements.filter((element) => {
    return Object.entries(filters).every(([key, value]) => {
      if (["id", "group", "period", "valence_electron"].includes(key)) {
        return element[key] === parseInt(value);
      } else if (
        ["name", "symbol", "category", "standard_state", "block"].includes(key)
      ) {
        return element[key].toLowerCase() === value.toLowerCase();
      }
      return false;
    });
  });

  const unhandledParams = Object.keys(req.query).filter(
    (param) => !validParams.includes(param)
  );

  if (unhandledParams.length > 0) {
    return res.status(400).json({
      error: `Invalid query parameter(s): ${unhandledParams.join(", ")}`,
    });
  }

  res.json(filteredElements);
});

app.get("/elements/name/all", (req, res) => {
  const elementNames = elements.map((element) => element.name);
  res.json(elementNames);
});

app.get("/elements/name", (req, res) => {
  const { id, category } = req.query;

  if (!id && !category) {
    return res
      .status(400)
      .json({ error: "ID or category parameter is required" });
  }

  let filteredElements;

  if (id) {
    const element = elements.find((element) => element.id === parseInt(id));
    filteredElements = element ? [{ id: element.id, name: element.name }] : [];
  } else if (category) {
    filteredElements = elements
      .filter(
        (element) => element.category.toLowerCase() === category.toLowerCase()
      )
      .map((element) => ({ id: element.id, name: element.name }));
  }

  if (!filteredElements || filteredElements.length === 0) {
    return res.status(404).json({ error: "Element not found" });
  }

  res.json(filteredElements);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
