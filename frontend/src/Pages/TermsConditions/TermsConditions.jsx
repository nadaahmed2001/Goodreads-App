import React from "react";
import Navbar from "../../../components/navbar";
import FooterPage from "../Footer/FooterPage";


export default function TermsAndConditions() {
    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1 className="text-center">Terms and Conditions</h1>
                <p>Last updated: February 2025</p>

                <h3>1. Introduction</h3>
                <p>
                    Welcome to Book Sphere! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. If you do not agree, please do not use our services.
                </p>

                <h3>2. User Responsibilities</h3>
                <p>
                    You agree to use our services responsibly and not to engage in activities that could harm the platform or other users.
                </p>

                <h3>3. Intellectual Property</h3>
                <p>
                    All content, trademarks, and intellectual property on this site are owned by ITI-Team and may not be used without permission.
                </p>

                <h3>4. Limitation of Liability</h3>
                <p>
                    We are not responsible for any damages or losses resulting from your use of our services.
                </p>

                <h3>5. Changes to Terms</h3>
                <p>
                    We may update these terms at any time. Your continued use of the website constitutes your acceptance of the new terms.
                </p>

                <h3>6. Contact Information</h3>
                <p>
                    If you have any questions, please contact us at "abdelrahmann.ramadann@gmail.com"
                </p>
            </div>
            <FooterPage />
        </>
    );
}
