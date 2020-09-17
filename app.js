const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");
const { customErrorHandler } = require("./error_handlers");
app.use(express.json());

app.use("/api", apiRouter);

app.use(customErrorHandler);

// app.use((err, req, res, next) => {
//   if (err) console.log(err), "ERROR HERE";
// });
app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Error 404: Not found" });
});

// app.listen(9090, () => {
//   console.log("Lstening on 9090");
// });
module.exports = app;
