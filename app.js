const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");
const {
  customErrorHandler,
  PSQLErrorHandler,
  handle405Errors,
  handleServerErrors,
} = require("./error_handlers");
app.use(express.json());

app.use("/api", apiRouter);

// app.use((err, req, res, next) => {
//   if (err) console.log(err), "ERROR HERE";
// });
app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "404 Error: Path Not found" });
});
app.use(customErrorHandler);
app.use(PSQLErrorHandler);
app.use(handle405Errors);
app.use(handleServerErrors);

// app.listen(9090, () => {
//   console.log("Lstening on 9090");
// });
module.exports = app;
