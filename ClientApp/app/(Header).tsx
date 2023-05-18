//React imports
import { useContext } from "react";
import Link from "next/link";

//Util imports
//import { ShopperContext } from "../../utils/context";

export default function Header() {
    //const [shopper, setShopper] = useContext(ShopperContext)

    return <header>
        <Link href="/" >Shamazon</Link>

        {/*shopper.token === ''
            ?*/}
        <Link href="/login">
            Log in
        </Link>
        {/*:*/}
        <Link href="/" /*onClick={() => {
                // localStorage.setItem('hrefken', '')
                // setShopper({ hrefken: '' })
            }}*/>
            Log out
        </Link>

        <Link href="/seller/login">
        To Seller Login</Link>

            <Link href="/seller">Seller Logout</Link>

        <Link href="/seller">
            To Seller Page
        </Link>

        <Link href="/seller/upload">
            To Seller Upload
        </Link>

        <Link href="/">
            To Shopper Page
        </Link>
    </header>;
}