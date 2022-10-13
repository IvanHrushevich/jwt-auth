const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port = ${PORT}`);
    });
  } catch (error) {
    console.log("error", error);
  }
};

start();
