import mongoose from 'mongoose';

export async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb+srv://foodApp:foodApp@fooapp.qchg16t.mongodb.net/?appName=fooApp");
    console.log("You successfully connected to MongoDB!");
    return mongoose;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
}

connectToMongoDB()