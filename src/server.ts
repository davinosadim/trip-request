import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import helmet from "helmet";
import router from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6060;

app.set("trust proxy", 1);

app.use(express.json());
app.use("/api", router);

app.use(helmet());
app.use(cors());
app.use(morgan("combined", { skip: (req) => req.url.includes("health") }));

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao banco");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
