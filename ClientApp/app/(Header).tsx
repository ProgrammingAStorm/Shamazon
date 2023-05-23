'use client'

//React imports
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Redux imports
import { logOut, logIn, shopperSelector, IShopper } from "@/src/redux/slices/shopperSlice";
import { setShopperTrue, toggleShopper, userSelector } from "@/src/redux/slices/userSlice";
import { sellerLogIn, ISeller, sellerSelector } from "@/src/redux/slices/sellerSlice";

//Util imports
import jwtDecode from "jwt-decode";

export default function Header() {
    const shopper = useSelector(shopperSelector);
    const seller = useSelector(sellerSelector);
    const user = useSelector(userSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        handleSellerLogin();
        handleShopperLogin()
    }, []);

    return <header>
        <Link href="/" onClick={handleHomeNavigation}>Shamazon</Link>

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
                    {seller.seller && (
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
                        </>
                    )}

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

    async function handleShopperLogin() {
        const token = localStorage.getItem('shopperToken');

        if (token) {
            const payload = jwtDecode<IShopper>(token);

            dispatch(logIn({ shopper: payload, token }))
        }
    }

    async function handleSellerLogin() {
        const token = localStorage.getItem('sellerToken');

        if (token) {
            const payload = jwtDecode<ISeller>(token);

            dispatch(sellerLogIn({ seller: payload, token }))
        }
    }

    function handleHomeNavigation() {
        dispatch(setShopperTrue())
    }
}