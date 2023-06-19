import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import EmployeeRouter from "./routes/employee.routes.js";
import UserRouter from "./routes/user.routes.js";
import swaggerDocs from "./swagger.js";
dotenv.config();
const port = process.env.PORT || 8000;
// configure cors
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3000/",

];

const options = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(express.json());
// connect to db


// Define routes
app.get("/healthcheck", (req, res) => {
  res.send("The app is running fine");
});

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/employees", EmployeeRouter);

// Start the server
app.listen(port, () => { 
  console.log(`Server listening on port ${port}`);
  swaggerDocs(app, port);
});
 