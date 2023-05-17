const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const errorHandler = require("./middlewares/errorHandler");

const { host, corsOption } = require("./config/config.js");
const port = host.port;
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
const cors = require("cors");
const { initSocket } = require("./modules/socket");

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// logger
app.use(morgan("dev"));

// cors
app.use(
  cors({
    origin: corsOption.allowedOrigin,
    credentials: true,
  })
);

// swagger
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// router
const apiMainRouter = require("./routes/index");
app.use("/api", [apiMainRouter]);

// errorHandler
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`running http://api.broccoli-market.store:${port}`);
});

// socket
initSocket(server);

module.exports = app;
