import mongoose from "mongoose";


export default function DataBaseConnection(){
    mongoose.connect(process.env.MONGODB_LOCAL_URI, {});    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Connected to database");
    });
    }

