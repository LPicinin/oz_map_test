import "./database";

import * as App from "express";
import { json } from "express";
import userRoutes from "./routes/userRoutes";
import regionRoutes from "./routes/regionRoutes";

const app = App();
const PORT = process.env.PORT || 3020;

app.use(json());
app.use("/api", userRoutes);
app.use("/api", regionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


/* 
oz-map-node:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: oz-map-node
    ports:
      - "3000:3000"
    networks:
      - my_network
    volumes:
      - .:/usr/src/app

*/