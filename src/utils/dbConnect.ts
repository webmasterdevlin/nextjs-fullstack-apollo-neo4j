/* This is a database connection function*/
import mongoose from "mongoose";

const connection: any = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(
    "mongodb+srv://webmasterdevlin:Pass123!@cluster0.5upod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
