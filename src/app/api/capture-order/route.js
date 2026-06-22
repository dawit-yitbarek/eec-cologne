import axios from "axios";

export async function POST(req) {
  try {
    const { orderID } = await req.json();

    if (!orderID || typeof orderID !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid PayPal orderID." }), { status: 400 });
    }

    const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const isSandbox = process.env.PAYPAL_MODE === "sandbox";

    const PAYPAL_API = isSandbox ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";

    if (!PAYPAL_CLIENT || !PAYPAL_SECRET) {
      console.error("FATAL: Missing PayPal credentials in capture-order.");
      return new Response(JSON.stringify({ error: "Internal payment processing error." }), { status: 500 });
    }

    // Fetch Access Token
    const tokenRes = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        auth: { username: PAYPAL_CLIENT, password: PAYPAL_SECRET },
      },
    );
    const accessToken = tokenRes.data.access_token;

    // Capture payment using Idempotency
    const captureRes = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "PayPal-Request-Id": `cap-${orderID}`
        }
      },
    );

    const capture = captureRes.data.purchase_units?.[0]?.payments?.captures?.[0];
    const status = capture?.status || captureRes.data.status;

    return new Response(JSON.stringify({ status }), { status: 200 });

  } catch (err) {
    const statusCode = err.response?.status || 500;
    const errorData = err.response?.data || { error: err.message };

    console.error(`PayPal Capture Failure (${statusCode}):`, JSON.stringify(errorData));

    return new Response(JSON.stringify({ error: "Payment processing failed. Please verify with your statement." }), {
      status: statusCode
    });
  }
}
