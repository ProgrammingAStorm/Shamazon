//React imports
import { Outlet } from "react-router-dom";

//Component imports
import Header from "../../components/Seller/Header";
import Footer from "../../components/Seller/Footer";

export default function SellerLayout() {
    return <>
        <Header />

        <Outlet />

        <Footer />
    </>;
}