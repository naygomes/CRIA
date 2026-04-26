import express from "express";
import cors from "cors";
import { errorHandler } from "@/middlewares";
import { childrenRoutes, authRoutes } from "@/routes";
import { PORT } from "@/settings.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Everything is OK!");
});
app.use("/children", childrenRoutes);
app.use(authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
