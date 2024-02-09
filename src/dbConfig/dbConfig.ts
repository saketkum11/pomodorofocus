import mongoose from "mongoose";
const connectMongoose = async () => {
  try {
    const mongooseConnect = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`
    );
    console.log("conntected mongoose");
  } catch (error) {
    console.error(error);
  }
};
export { connectMongoose };