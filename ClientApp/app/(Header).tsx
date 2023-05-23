//React imports
import { logOut } from "@/src/redux/slices/shopperSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

//Util imports

export default function Header() {
    const shopper = useSelector(state => state.shopper)
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    return <header>
        <Link href="/" >Shamazon</Link>

        {user.isShopper
            ? (
                <>
                    {!shopper.isLoggedIn
                        ?
                        <Link href="/login">
                            Log in
                        </Link>
                        :
                        <Link href="/" onClick={handleShopperLogout}>
                            Log out
                        </Link>}

                    <Link href="/seller/login">
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

                    <Link href="/">
                        To Shopper Page
                    </Link>
                </>
            )
        }
    </header>;

    function handleShopperLogout() {
        dispatch(logOut())
    }
}