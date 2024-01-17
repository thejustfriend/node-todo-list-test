import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const tasks = [];

app.use(bodyParser.json({limit: "10mb"}))
app.use(bodyParser.urlencoded({limit:"50mb", extended: true}))

app.get("/tasks", (_req: Request, res: Response) => {
  res.send(tasks);
});

app.post("/new-task", (req: Request, res: Response) => {
  const lastTask = tasks[tasks.length - 1];
  const newTask = { id: lastTask ? lastTask.id + 1 : 1, name: req.body.name, done: false };
  tasks.push(newTask);
  res.send("success");
});

app.put("/check-task/:id", (req: Request, res: Response) => {
  const index = tasks.findIndex(task => task.id == parseInt(req.params.id));
  tasks[index] ? tasks[index].done = !tasks[index].done : null;
  res.send("success");
});

app.delete("/task/:id", (req: Request, res: Response) => {
  const index = tasks.findIndex(task => task.id == req.params.id);
  tasks.splice(index, 1);
  res.send("success");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});