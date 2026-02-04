import axios from "axios";

export async function POST(req) {
    const { amount, currency } = await req.json();
    const APP_URL = process.env.APP_URL
    const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const PAYPAL_API = process.env.PAYPAL_API || "https://api-m.sandbox.paypal.com";

    try {
        // Get access token
        const tokenRes = await axios.post(
            `${PAYPAL_API}/v1/oauth2/token`,
            "grant_type=client_credentials",
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                auth: { username: PAYPAL_CLIENT, password: PAYPAL_SECRET },
            }
        );
        const accessToken = tokenRes.data.access_token;

        // Create order
        const orderRes = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: { currency_code: currency, value: amount },
                    },
                ],
                application_context: {
                    return_url: `${APP_URL}/verify`,
                    cancel_url: `${APP_URL}/cancel`,
                    user_action: "PAY_NOW",
                },
            },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        return new Response(JSON.stringify(orderRes.data), { status: 200 });
    } catch (err) {
        console.log("Error creating order: ", err.message)
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}