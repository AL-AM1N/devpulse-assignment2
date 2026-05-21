import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config/index";

const app: Application = express();


app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Express!");
});

app.listen(config.port, () => {
    console.log(`Server is running at port: ${config.port}`);
});
