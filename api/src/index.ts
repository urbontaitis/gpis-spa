import * as dotenv from "dotenv";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";

dotenv.config();

const app: express.Application = express();

app.use(
  morgan(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms`
  )
);

app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// tslint:disable:no-console
app.listen(process.env.PORT, () =>
  console.info(`Application has started on port ${process.env.PORT}`)
);
