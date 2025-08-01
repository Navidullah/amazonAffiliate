"use client";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function OrderActions({ id, status }) {
  const [isPending, startTransition] = useTransition();

  const updateStatus = async (status) => {
    startTransition(async () => {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      window.location.reload(); // Refresh to show updated status
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {status !== "shipped" && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateStatus("shipped")}
          disabled={isPending}
        >
          Mark as Shipped
        </Button>
      )}
      {status !== "delivered" && (
        <Button
          size="sm"
          variant="default"
          onClick={() => updateStatus("delivered")}
          disabled={isPending}
        >
          Mark as Delivered
        </Button>
      )}
    </div>
  );
}
