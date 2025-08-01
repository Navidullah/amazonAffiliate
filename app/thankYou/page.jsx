export default function ThankYou() {
  return (
    <div className="container mx-auto max-w-lg py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Thank You! 🎉</h1>
      <p className="text-lg">
        Your order has been received.
        <br />
        You will be contacted soon for delivery and payment.
      </p>
      <a
        href="/products"
        className="inline-block mt-8 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded shadow"
      >
        Back to Products
      </a>
    </div>
  );
}
