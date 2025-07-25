const express = require("express");
const router = express.Router();
const Invoice = require("../Models/Invoice");

// Create Invoice
router.post("/create", async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json({ message: "Invoice created", invoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get all invoices for a specific user
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: "User ID required" });
    const invoices = await Invoice.find({ createdBy: userId }).sort({
      date: -1,
    });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: "Error fetching invoices" });
  }
});

module.exports = router;
