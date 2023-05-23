'use client'

//React imports
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Redux imports
import { logOut, logIn, shopperSelector, IShopper } from "@/src/redux/slices/shopperSlice";
import { toggleShopper, userSelector } from "@/src/redux/slices/userSlice";

//Util imports
import jwtDecode from "jwt-decode";

export default function Header() {
    const shopper = useSelector(shopperSelector);
    const user = useSelector(userSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('shopperToken');

        if (token) {
            const payload = jwtDecode<IShopper>(token);

            dispatch(logIn({shopper: payload, token}))
        }
    }, []);

    return <header>
        <Link href="/" >Shamazon</Link>

        {user.isShopper
            ? (
                <>
                    {!shopper.shopper
                        ?
                        <Link href="/login">
                            Log in
                        </Link>
                        :
                        <Link href="/" onClick={handleShopperLogout}>
                            Log out
                        </Link>}

                    <Link href="/seller/login" onClick={handleUserSwitch}>
                        To Seller Login
                    </Link>
                </>
            )
            : (
                <>
                    <Link href="/seller">
                        Seller Logout
                    </Link>

                    <Link href="/seller">
                        To Seller Page
                    </Link>

                    <Link href="/seller/upload">
                        To Seller Upload
                    </Link>

                    <Link href="/" onClick={handleUserSwitch}>
                        To Shopper Page
                    </Link>
                </>
            )
        }
    </header>;

    function handleShopperLogout() {
        dispatch(logOut());
    }

    function handleUserSwitch() {
        dispatch(toggleShopper());
    }
}