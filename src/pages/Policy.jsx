import React from 'react';
import { useParams } from 'react-router-dom';
import './StaticPages.css';

const Policy = () => {
    const { type } = useParams();

    const getPolicyContent = () => {
        switch (type) {
            case 'shipping':
                return {
                    title: "Shipping Policy",
                    content: (
                        <>
                            <p>We deliver across India using trusted courier partners.</p>
                            <h2>Processing Time</h2>
                            <p><strong>Ready Stock:</strong> Processed and dispatched within 1-2 business days.</p>
                            <p><strong>Made-to-Order:</strong> These items require crafting time. Please allow 5-7 business days for production before dispatch.</p>
                            <h2>Shipping Times</h2>
                            <p>Once dispatched, standard delivery takes 4-7 business days depending on your location.</p>
                        </>
                    )
                };
            case 'returns':
                return {
                    title: "Returns & Refunds Policy",
                    content: (
                        <>
                            <p>Due to the handmade and often customized nature of our products, we do not accept general returns or exchanges.</p>
                            <h2>Damaged Items</h2>
                            <p>We take great care in packaging. However, if your item arrives damaged, please contact us within 48 hours of delivery.</p>
                            <p><strong>Important:</strong> An unboxing video is mandatory for any damage claims to be processed.</p>
                            <h2>Refunds</h2>
                            <p>If a return is approved for a damaged item, we will initiate a refund to your original method of payment within 5-7 working days.</p>
                        </>
                    )
                };
            case 'privacy':
                return {
                    title: "Privacy Policy",
                    content: (
                        <>
                            <p>At Sneha Designs, we value your privacy.</p>
                            <h2>Information Collection</h2>
                            <p>We only collect the information necessary to process your orders, such as your name, shipping address, and phone number (primarily via WhatsApp).</p>
                            <h2>Use of Information</h2>
                            <p>Your details are strictly used for order fulfillment and communication related to your purchase. We do not sell your data to third parties.</p>
                        </>
                    )
                }
            case 'terms':
                return {
                    title: "Terms of Service",
                    content: (
                        <>
                            <p>By placing an order with Sneha Designs, you agree to the following terms:</p>
                            <ul>
                                <li>All products are handcrafted; slight variations in color, texture, or size may occur.</li>
                                <li>Custom orders must be paid for in advance and cannot be cancelled once crafting has begun.</li>
                                <li>Prices are subject to change without prior notice.</li>
                            </ul>
                        </>
                    )
                }
            default:
                return { title: "Policy Not Found", content: <p>The policy you are looking for does not exist.</p> };
        }
    }

    const policy = getPolicyContent();

    return (
        <div className="static-page">
            <h1>{policy.title}</h1>
            <div className="static-content">
                {policy.content}
            </div>
        </div>
    );
};

export default Policy;
