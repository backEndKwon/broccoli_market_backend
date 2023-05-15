const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const { host } = require("./config/config.js");
const port = host.port;
const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger-output");
const cors = require("cors");
const { emitWarning } = require("process");

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// logger
app.use(morgan("dev"));

cors
app.use(
  cors({
    origin: "*",
    credentials: "true",
    // cors options
  })
);

// swagger
// app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// router
const apiMainRouter = require("./routes/index");
app.use("/api", [apiMainRouter]);

errorHandler
app.use(errorHandler);


app.get("/", (req, res) => {
  res.send("APIs for Voyage Blog");
});

const server = app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});

// socket
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("새로운 소켓이 연결됐어요!");

  socket.on("message", (data) => {
    console.log(data);
  });
});

io.on("connection", (socket) => {
  // 서버와 클라이언트 간의 실시간 통신을 위해 "connection" 이벤트를 등록
  console.log(`User Connected : ${socket.id}`);
  socket.on("join_room", (data) => {
    //클라이언트에서 'join_room' 이벤트를 보낼 때, 해당 방에 클라이언트를 추가하고 로그를 출력
    socket.join(data);
    console.log(`User with ID : ${socket.id} joined room : ${data}`);
  });
  socket.on("send_message", (data) => {
    //클라이언트에서 'send_message' 이벤트를 보낼 때, 해당 방에 있는 다른 클라이언트들에게 'receive_message' 이벤트를 발생시켜 메시지를 보내고 로그를 출력
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    //클라이언트와의 연결이 끊어질 때 "disconnect" 이벤트가 발생하도록 등록하고, 연결이 끊어졌을 때 로그를 출력
    console.log(" User Disconnected", socket.id);
  });
});

module.exports = app;
