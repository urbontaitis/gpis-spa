import * as dotenv from "dotenv";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import alerts from "./routes/alerts";

dotenv.config();

const app: express.Application = express();

app.use(
  morgan(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms`
  )
);

app.use("/api/alerts", alerts);

app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

export default app;
