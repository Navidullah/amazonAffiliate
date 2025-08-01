import { getServerSession } from "next-auth";
// Update path if needed
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import OrderActions from "@/app/components/orderactions/OrderActions";
import { authOptions } from "@/lib/authOptions";
// Import the client component

export default async function OrdersAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }
  if (session.user?.role !== "admin") {
    redirect("/");
  }

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/orders", {
    cache: "no-store",
  });
  const orders = await res.json();

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">🛒 Order Management</h1>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className="rounded-xl shadow-lg bg-white/90 dark:bg-zinc-900 p-6 overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-800">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Address</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr
                  key={order._id}
                  className="border-b last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/70"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3 text-xs">{order.address}</td>
                  <td className="p-3 text-xs">
                    <ul>
                      {order.items.map((item, i) => (
                        <li key={i}>
                          <span className="font-medium">{item.title}</span> x{" "}
                          {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 font-bold">${order.total}</td>
                  <td className="p-3">
                    <Badge
                      variant={
                        order.status === "pending"
                          ? "secondary"
                          : order.status === "shipped"
                            ? "outline"
                            : order.status === "delivered"
                              ? "default"
                              : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <OrderActions id={order._id} status={order.status} />
                  </td>
                  <td className="p-3 text-xs">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
