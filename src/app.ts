import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { authRoute } from "./modules/auth/auth.route";
import { issuesRoute } from "./modules/issues/issues.route";

const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.use("/api/auth", authRoute);

app.use("/api/issues", issuesRoute);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from TypeScript Express!");
// });

export default app;
