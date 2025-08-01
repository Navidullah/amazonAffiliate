"use client";

import Link from "next/link";
import { useCart } from "../components/cart/CartContext";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 bg-background rounded shadow"
            >
              <div>
                <div className="font-bold">{item.title}</div>
                <div>${item.price} x</div>
                <input
                  type="number"
                  min={1}
                  max={item.stock || 99}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, Number(e.target.value))
                  }
                  className="w-16 border rounded px-2"
                />
              </div>
              <div>${(item.price * item.quantity).toFixed(2)}</div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 font-bold cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            <Button
              onClick={clearCart}
              className="cursor-pointer bg-red-600 hover:bg-red-800 text-gray-100"
            >
              Clear Cart
            </Button>
            <Link href="/checkout">
              <Button className="bg-green-400 hover:bg-green-600 cursor-pointer text-gray-800">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
