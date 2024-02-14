import "./database";

import * as App from "express";
import { json } from "express";
import userRoutes from "./routes/userRoutes";
import regionRoutes from "./routes/regionRoutes";
import authRoutes from "./routes/authRoutes";
import { config } from 'dotenv';
config();

const app = App();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use("/api", userRoutes);
app.use("/api", regionRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});