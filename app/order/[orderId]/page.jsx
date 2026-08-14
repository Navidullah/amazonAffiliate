import { ConnectToDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import OrderStatus from "./OrderStatus";

export const metadata = {
  title: "Your Order | Shopyor",
  robots: { index: false, follow: false },
};

export default async function OrderPage({ params }) {
  const { orderId } = await params;

  await ConnectToDB();
  const order = await Order.findOne({ orderId }).lean();

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 pt-28 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          We couldn&apos;t find that order.
        </p>
      </main>
    );
  }

  return <OrderStatus orderId={orderId} initialPaid={order.paid} />;
}
