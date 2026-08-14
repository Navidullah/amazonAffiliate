const SITE = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

/**
 * Create a LemonSqueezy hosted checkout for any digital product.
 * `redirectUrl` is where the buyer lands after paying (order status page).
 */
export async function createCheckout({ orderId, variantId, redirectUrl, customData = {} }) {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;

  if (!apiKey || !storeId || !variantId) {
    throw new Error(
      "LemonSqueezy is not configured (missing LEMONSQUEEZY_API_KEY / STORE_ID, or product has no variantId)",
    );
  }

  const res = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: { order_id: orderId, ...customData },
          },
          product_options: {
            redirect_url: redirectUrl || `${SITE}/order/${orderId}`,
          },
        },
        relationships: {
          store: { data: { type: "stores", id: String(storeId) } },
          variant: { data: { type: "variants", id: String(variantId) } },
        },
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LemonSqueezy checkout creation failed: ${text}`);
  }

  const json = await res.json();
  return json.data.attributes.url;
}
