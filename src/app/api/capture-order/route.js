import axios from "axios";

export async function POST(req) {
    const { orderID } = await req.json();
    const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const PAYPAL_API = process.env.PAYPAL_API || "https://api-m.sandbox.paypal.com";

    try {
        const tokenRes = await axios.post(
            `${PAYPAL_API}/v1/oauth2/token`,
            "grant_type=client_credentials",
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                auth: { username: PAYPAL_CLIENT, password: PAYPAL_SECRET },
            }
        );
        const accessToken = tokenRes.data.access_token;

        const captureRes = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
            {},
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return new Response(JSON.stringify(captureRes.data), { status: 200 });
    } catch (err) {
        console.log("Error on capturing ", err.message)
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}