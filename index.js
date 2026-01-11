const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// in-memory tasks
let tasks = [];

app.get("/tasks", (req, res) => res.json(tasks));
app.post("/tasks", (req, res) => {
  const newTask = { id: Date.now(), text: req.body.text, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  res.json({ success: true });
});
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
