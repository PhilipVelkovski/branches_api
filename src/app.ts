import express from "express";
import morgan from "morgan";
import branchRoutes from "./routes/branchRoutes";
import errorHandler from "./middleware/ErrorHandler";

const app = express();

app.use(express.json());
app.use(morgan("combined")); // request logger

app.use("/api/branches", branchRoutes);

app.use(errorHandler);

export default app;