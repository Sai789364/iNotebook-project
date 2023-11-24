const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb+srv://devireddysairishikar2003:PghdhOZDW3f8E0wN@cluster0.qqd8ck6.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to mongo successfully");
  } catch (error) {
    console.error("Error connecting to mongo:", error);
  }
};

module.exports=connectToMongo;

