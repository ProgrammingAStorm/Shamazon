//React imports
import { useEffect, useContext } from "react";
import Link from "next/link";

//Util imports
//import { SellerContext } from "../../../temp_files/src/utils/context";

//Component imports

export default function SellerHome() {
    //const [seller, setSeller] = useContext(SellerContext);

    //const token = localStorage.getItem('seller-token')

    // if (token === '') {
    //     return <Navigate to="/seller/login" />
    // }

    // useEffect(() => {
    //     setSeller({ token: token })
    // }, [])


    return <main>
        seller home
        <Link href="/seller/upload">
            List product
        </Link>
    </main>
}