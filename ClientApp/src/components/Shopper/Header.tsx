//React imports
import { useContext } from "react";
import { Link } from "react-router-dom";

//Util imports
import { ShopperContext } from "../../utils/context";

export default function Header() {
    const [shopper, setShopper] = useContext(ShopperContext)

    return <header>
        <Link to="/" >Shamazon</Link>

        {
            shopper.token === ''
                ?
                <Link to="/login">
                    Log in
                </Link>
                :
                <Link to="/" onClick={() => {
                    localStorage.setItem('token', '')
                    setShopper({ token: '' })
                }}>
                    Log out
                </Link>
        }

        <Link to="/seller">
            To Seller Page
        </Link>
    </header>;
}