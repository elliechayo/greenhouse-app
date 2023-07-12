// env variables
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema/types");
const resolvers = require("./schema/resolver");


const connectDB = require("./config/db");
const upload = require("./multer");
connectDB(MONGO_URI);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: cors(),
});

async function startServer() {
  await server.start();

  // apply the apollo server middleware to the app
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "/public"));
  app.use(cors());
  app.post("/addMedia", upload.single("uploadedFile"), (req, res) => {
    if (!req.file) {
      return res.json({ success: false });
    } else {
      return res.json({ success: true, file: req.file.filename });
    }
  });

  server.applyMiddleware({ app });

  // start the express server
  app.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
  });
}

startServer();
