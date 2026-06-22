import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
    try {
        const { amount, currency } = await req.json();

        // Input validation
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            return new Response(JSON.stringify({ error: "Invalid payment amount." }), { status: 400 });
        }
        if (!currency || currency.length !== 3) {
            return new Response(JSON.stringify({ error: "Invalid currency format." }), { status: 400 });
        }

        const formattedAmount = parseFloat(amount).toFixed(2);

        const APP_URL = process.env.APP_URL;
        const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
        const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
        const isSandbox = process.env.PAYPAL_MODE === "sandbox";
        const PAYPAL_API = isSandbox ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";

        if (!APP_URL || !PAYPAL_CLIENT || !PAYPAL_SECRET) {
            console.error("FATAL: Missing PayPal or App configuration variables.");
            return new Response(JSON.stringify({ error: "Internal server configuration error." }), { status: 500 });
        }

        // Fetch Access Token
        const tokenRes = await axios.post(
            `${PAYPAL_API}/v1/oauth2/token`,
            "grant_type=client_credentials",
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                auth: { username: PAYPAL_CLIENT, password: PAYPAL_SECRET },
            }
        );
        const accessToken = tokenRes.data.access_token;

        // Create Order
        const orderRes = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: { currency_code: currency.toUpperCase(), value: formattedAmount },
                    },
                ],
                payment_source: {
                    paypal: {
                        experience_context: {
                            return_url: `${APP_URL}/donate/verify`,
                            cancel_url: `${APP_URL}/donate/cancel`,
                            user_action: "PAY_NOW",
                        }
                    }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "PayPal-Request-Id": uuidv4()
                }
            }
        );
        
        return new Response(JSON.stringify({ id: orderRes.data.id, links: orderRes.data.links }), { status: 200 });

    } catch (err) {
        console.error("Error creating PayPal order:", err.response?.data || err.message);
        return new Response(JSON.stringify({ error: "Failed to initiate payment transaction." }), { status: 500 });
    }
}
