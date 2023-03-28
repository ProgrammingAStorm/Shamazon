//React imports
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Util imports
import { SellerContext } from "../../utils/context";

//Component imports

export default function SellerHome() {
    const [seller, setSeller] = useContext(SellerContext);

    const navigator = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('seller-token')

        if(token === '') {
            navigator('/seller/login');
        }

        setSeller({token: token})
    }, [])
    
    return <main>
        seller home
    </main>
}