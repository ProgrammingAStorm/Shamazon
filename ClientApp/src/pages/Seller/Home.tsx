//React imports
import { useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

//Util imports
import { SellerContext } from "../../utils/context";

//Component imports

export default function SellerHome() {
    const [seller, setSeller] = useContext(SellerContext);

    const token = localStorage.getItem('seller-token')

    if (token === '') {
        return <Navigate to="/seller/login" />
    }

    useEffect(() => {
        setSeller({ token: token })
    }, [])


    return <main>
        seller home
    </main>
}