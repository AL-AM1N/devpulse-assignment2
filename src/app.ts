import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();


// middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.use("/api/auth", authRoute)

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from TypeScript Express!");
// });

export default app;
