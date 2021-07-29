import mongoose from "mongoose";

const connectDB = async (req, res, next) => {
  if (mongoose.connections[0].readyState) {
    return next();
  }

  mongoose.connect(
    "mongodb://localhost:27017/mydb",
    {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    },
    () => console.log(" Mongoose is connected")
  );

  return next();
};

export default connectDB;
