import React from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";

const Payment = () => {
  const handlePayment = async () => {
    try {
      // ✅ Step 1: Create an order on the backend
      const { data } = await axios.post("http://localhost:5000/api/payments/create-order", {
        amount: 500, // Amount in INR
      });

      if (!data.success) {
        alert("Failed to create order. Please try again.");
        return;
      }

      // ✅ Step 2: Configure Razorpay Payment
      const options = {
        key: "rzp_test_8hIv20f8gyEgb6", // Use your Razorpay Test Key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Auction Payment",
        description: "Secure Auction Payment",
        order_id: data.order.id, // Razorpay Order ID
        handler: async function (response) {
          console.log("Payment Response:", response);

          // ✅ Step 3: Verify Payment on Backend
          const verifyResponse = await axios.post("http://localhost:5000/api/payments/verify-payment", response);

          if (verifyResponse.data.success) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Shravani",
          email: "shravani@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <Container className="text-center">
      <h2>Complete Payment</h2>
      <Button variant="primary" onClick={handlePayment}>
        Pay ₹500 with Razorpay
      </Button>
    </Container>
  );
};

export default Payment;
