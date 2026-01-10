'use client';

import { Loader } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const DonationForm = ({ content }) => {
    const [donationAmount, setDonationAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handlePayment = async () => {
        if (!donationAmount || donationAmount < 1) {
            setError('Donation amount must be above or equal to 1 dollar')
            return;
        }
        setError("")
        setLoading(true)
        try {
            const orderRes = await axios.post("/api/create-order", { amount: donationAmount });
            const approvalUrl = orderRes.data.links.find(link => link.rel === "approve").href;
            window.location.href = approvalUrl;
        } catch (err) {
            setError("Something went wrong")
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    return (
        <section className="py-24 bg-[#F1EFEC]">
            <div className="max-w-3xl mx-auto px-6">

                <div className="bg-white rounded-3xl p-10 shadow-lg">

                    <h2 className="font-heading text-2xl mb-8 text-center">
                        {content.title}
                    </h2>

                    {/* Preset amounts */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {[10, 25, 50, 100].map(amount => (
                            <button
                                onClick={() => setDonationAmount(Number(amount))}
                                key={amount}
                                className={`${donationAmount === amount ? "bg-yellow-100 border-yellow-400" : ""} rounded-xl border border-black/10 py-4 font-heading text-lg bg-[#FFFEFC] hover:bg-yellow-100 hover:border-yellow-400 transition`}
                            >
                                ${amount}
                            </button>
                        ))}
                    </div>

                    {/* Custom amount */}
                    <input
                        onChange={(e) => setDonationAmount(e.target.value)}
                        value={donationAmount}
                        type="number"
                        placeholder={content.customPlaceholder}
                        className="w-full rounded-xl border border-black/10 px-4 py-4 font-body mb-8 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                    {error && <p className="text-red-600 text-center text-md py-4">{error}</p>}
                    {/* PayPal button position */}
                    <button
                        onClick={handlePayment}
                        disabled={!donationAmount || loading}
                        className={`${!donationAmount || loading ? "opacity-70 cursor-not-allowed" : ""} flex justify-center items-center w-full rounded-xl bg-yellow-500 py-4 font-heading text-black text-lg hover:bg-yellow-400 transition`}
                    >
                        {loading ? <Loader size={32} className="animate-spin" /> : content.paypalButton}
                    </button>

                    <p className="mt-4 text-center text-sm text-gray-500 font-body">
                        {content.secureNote}
                    </p>

                </div>
            </div>
        </section>
    );
};

export default DonationForm;