const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  date: { type: Date, default: Date.now },
  customerName: String,
  products: [
    {
      description: String,
      quantity: Number,
      price: Number,
    },
  ],
  gstPercentage: Number,
  totalAmount: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
