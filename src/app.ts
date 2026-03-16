

import express from "express";
import morgan from "morgan";
import errorHandler from "@/middleware/ErrorHandler";
import routes from "@/routes";
import notFound from "@/middleware/NotFound";

const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);


export default app;