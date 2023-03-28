//React importsUser
import { useContext } from "react";
import { Link } from "react-router-dom";

//Util imports
import { SellerContext } from "../../utils/context";

export default function Header() {
    const [seller, setSeller] = useContext(SellerContext);

    return <header>
        <Link to="/">Shamazon</Link>

        {
            seller.token === ''
                ?
                <Link to="/seller/login">
                    Log in
                </Link>
                :
                <Link to="/seller/login" onClick={() => {
                    localStorage.setItem('seller-token', '');
                    setSeller({ token: '' });
                }}>
                    Log out
                </Link>
        }
    </header>;
}