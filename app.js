const express = require('express');
const SocketIO = require('socket.io')
const router = require('./api/endPoints')
const path = require('path')
const http = require('http')
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}))

app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use('/', router)

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs");

const port = process.argv[3] || 3001;
const server = http.createServer(app);

const io = SocketIO(server);
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
