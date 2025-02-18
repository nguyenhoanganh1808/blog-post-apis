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

app.use("/api/v1/session", routes.session);
app.use("/api/v1/users", routes.user);
app.use("/api/v1/posts", routes.post);
app.use("/api/v1/tags", routes.tag);
app.use("/api/v1/comments", routes.comment);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server running on http://localhost:3000"));
