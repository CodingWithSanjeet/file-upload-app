const mongoose = require("mongoose");
const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    console.log(
      `Connected to the ${conn.connection.db.databaseName} database...`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
