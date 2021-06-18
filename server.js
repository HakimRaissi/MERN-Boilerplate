/* requires */

// External Modules
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const usersRoutes = require("./routes/users.routes");

// Middlewares
const errorHandler = require("./middlewares/errors.middleware");

// Utils
const { mongo_uri, port } = require("./utils/environment.util");

/* Config */

// Init
const app = express();

// DB
mongoose
  .connect(mongo_uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

// Setup Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", usersRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

// Centralized Error Handling
app.use(errorHandler);

/* Running server */

app.listen(port, () => console.log(`server listening on port : ${port}`));
