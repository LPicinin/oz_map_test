import "./database";

import * as App from "express";
import { json } from "express";
import userRoutes from "./routes/userRoutes";
import regionRoutes from "./routes/regionRoutes";

const app = App();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use("/api", userRoutes);
app.use("/api", regionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});