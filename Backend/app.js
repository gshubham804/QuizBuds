import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
import routes from "./routes/index.js";

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, This is QuizBuds backend...");
});
app.use(routes);

export default app;
