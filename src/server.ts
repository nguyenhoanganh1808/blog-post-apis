import express, { Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes/index.routes";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req: Request, res: Response, next) => {
//   req.me
// });

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/posts", routes.post);
app.use("/api/comments", routes.comment);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server running on http://localhost:3000"));
