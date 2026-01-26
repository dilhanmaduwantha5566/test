import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import api from "../helpers/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentModal({ open, onClose, amount, classDetails, onPaymentSuccess }) {
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && amount > 0) {
            setLoading(true);
            const token = localStorage.getItem("token");
            api.post("/payments/create-payment-intent",
                { amount, currency: 'lkr' },
                { headers: { Authorization: `Bearer ${token}` } }
            )
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error creating payment intent", err);
                    setLoading(false);
                    alert("Could not initiate payment. Please try again.");
                    onClose();
                });
        }
    }, [open, amount]);

    if (!open) return null;

    // Detect dark mode roughly or default to auto/night
    const isDarkMode = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');

    const appearance = {
        theme: isDarkMode ? 'night' : 'stripe',
        variables: {
            colorPrimary: '#dc2626',
        },
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-lg p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Complete Payment for <span className="text-red-600">{classDetails?.name}</span>
                </h3>

                {loading || !clientSecret ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-500 dark:text-zinc-400">Preparing secure checkout...</p>
                    </div>
                ) : (
                    <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                        <CheckoutForm
                            amount={amount}
                            onSuccess={onPaymentSuccess}
                            onCancel={onClose}
                        />
                    </Elements>
                )}
            </div>
        </div>
    );
}
