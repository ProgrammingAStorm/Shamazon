// React imports
import { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom";

// Util imports
import { SellerContext } from "../../utils/context"

// Component imports
import Header from "../../components/Seller/Header";
import Footer from "../../components/Seller/Footer";

export default function SellerLayout() {
    const [seller, setSeller] = useState({ token: '' });

    const navigator = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token != '') {
            setSeller({ token: token! });
        }
    });

    return <SellerContext.Provider value={[seller, setSeller]}>
        <Header />

        <Outlet />

        <Footer />
    </SellerContext.Provider>;
}