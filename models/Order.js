import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      //   required: true,
    },
    city: {
      type: String,
      //   required: true,
    },
    phone: {
      type: String,
      //   required: true,
    },
    amount: {
      type: Number,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }   //created at and updated at time.
);

export default mongoose.model("Order", OrderSchema);
