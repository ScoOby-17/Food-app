import mongoose from "mongoose";

async function connectDB() {
  try {
    console.log("connecting start")
    await mongoose.connect(
      "mongodb+srv://foodApp:FoodApp%40123@fooapp.qchg16t.mongodb.net/?retryWrites=true&w=majority&appName=fooApp"
    );

    console.log("Connected");
  } catch (err) {
    console.error(err);
  }
}

connectDB();