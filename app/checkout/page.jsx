"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCart } from "../components/cart/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Simple phone number validation (Pakistan mobile)
  const isValidPhone = (phone) => {
    // Remove spaces, dashes, etc.
    const cleaned = phone.replace(/[\s-]/g, "");
    // Accepts 03XXXXXXXXX or +923XXXXXXXXX or 00923XXXXXXXXX
    return (
      /^03\d{9}$/.test(cleaned) ||
      /^\+923\d{9}$/.test(cleaned) ||
      /^00923\d{9}$/.test(cleaned)
    );
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      toast.error("Please fill in all fields!");
      return;
    }
    if (!isValidPhone(phone)) {
      toast.error(
        "Please enter a valid Pakistani phone number (e.g. 03XXXXXXXXX or +923XXXXXXXXX)."
      );
      return;
    }

    const orderData = {
      name,
      email,
      phone,
      address,
      country,
      items: cart.map((item) => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      paymentMethod: "cod",
      status: "pending",
    };

    // Save to database
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();

    if (data.success) {
      clearCart();
      toast.success("Order placed! Please pay on delivery.");
      router.push("/thankYou");
    } else {
      toast.error("Error saving order: " + data.error);
    }
  };

  return (
    <div className="container mx-auto border-1 max-w-lg px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="mb-4">
        <h2 className="font-bold mb-2">Order Summary</h2>
        <ul className="mb-2">
          {cart.map((item) => (
            <li key={item._id} className="flex justify-between py-1">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="font-bold flex justify-between">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <form className="flex flex-col gap-4 mt-6" onSubmit={handlePlaceOrder}>
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Phone Number (e.g. 03XXXXXXXXX)"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Input
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <select
          className="border rounded px-3 py-2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="Pakistan">Pakistan</option>
        </select>
        <div>
          <div className="font-semibold mb-2">Payment Method:</div>
          <label>
            <input
              type="radio"
              value="cod"
              checked={true}
              readOnly
              className="mr-2"
            />
            Cash on Delivery (COD)
          </label>
        </div>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white font-bold text-lg"
          size="lg"
          disabled={cart.length === 0}
        >
          Place Order
        </Button>
      </form>
    </div>
  );
}
