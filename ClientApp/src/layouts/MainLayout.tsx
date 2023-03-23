//React imports
import { Outlet } from "react-router-dom";

//Component imports
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
    return <>
        <Header />

        <Outlet />

        <Footer />
    </>;
}