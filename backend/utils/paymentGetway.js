const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');



// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Initialize Razorpay with your API key and secret
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET'
});

// Route for initiating a payment
app.post('/api/payment', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    // Create a new Razorpay order
    const order = await razorpay.orders.create({
      amount: amount, // Amount in paise
      currency: currency || 'INR', // Currency (default is INR)
      receipt: receipt, // Unique identifier for the order
      payment_capture: 1 // Auto-capture payment after order creation
    });

    res.json({ orderId: order.id });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// Route for handling payment success webhook (optional)
app.post('/api/payment/success', (req, res) => {
  // Handle payment success event from Razorpay
  // You can update your database, send email receipts, etc. here
  res.json({ success: true });
});

