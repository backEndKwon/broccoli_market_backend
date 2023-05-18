const mongoose = require("mongoose");
const { mongodb } = require("../config/config.js");

const db_url = `mongodb+srv://${mongodb.id}:${mongodb.password}@${mongodb.cluster}/${mongodb.db}?retryWrites=true&w=majority`;

const connectToMongoDB = async (app) => {
  mongoose
    .connect(db_url)
    .then(() => {
      console.log("MongoDB connected")
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = connectToMongoDB;
