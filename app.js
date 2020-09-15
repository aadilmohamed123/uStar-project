const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");
app.use(express.json());

app.use("/api", apiRouter);

// app.listen(9090, () => {
//   console.log("Lstening on 9090");
// });
module.exports = app;
