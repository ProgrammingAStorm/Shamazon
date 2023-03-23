//React imports
import { Outlet } from "react-router-dom";

//Component imports
import Header from "../../components/Shopper/Header";
import Footer from "../../components/Shopper/Footer";

export default function MainLayout() {
    return <>
        <Header />

        <Outlet />

        <Footer />
    </>;
}