//React imports
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

//Util imports
import { ShopperContext } from "../../utils/context";

//Component imports
import Header from "../../components/Shopper/Header";
import Footer from "../../components/Shopper/Footer";

export default function MainLayout() {
    const [shopper, setShopper] = useState({ token: '' });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token != '') {
            setShopper({ token: token! });
        }
    }, []);

    return <ShopperContext.Provider value={[shopper, setShopper]}>
        <Header />

        <Outlet />

        <Footer />
    </ShopperContext.Provider>;
}