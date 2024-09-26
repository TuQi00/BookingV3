const mongoose = require("mongoose");
// cloud db
//"mongodb+srv://xtruong0811:Project1@cluster0.zs5vl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//local db
//"mongodb://localhost:27017/nailbooking"
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/nailbooking");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
