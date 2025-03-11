import mongoose from "mongoose";

console.log(process.env.MONGODB_URI);

function connect() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((err) => {
      console.log("Database connection error:", err);
    });
}
export default connect;
