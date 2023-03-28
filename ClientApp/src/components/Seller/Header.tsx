//React importsUser
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//Util imports
import { SellerContext } from "../../utils/context";

export default function Header() {
    const navigate = useNavigate();
    const [seller, setSeller] = useContext(SellerContext);

    return <header>
        <h1 onClick={() => navigate("/seller")}>Shamazon</h1>

        {
            seller.token === ''
                ?
                <button onClick={() => navigate("/seller/login")}>
                    Log in
                </button>
                :
                <button onClick={() => {
                    localStorage.setItem('seller-token', '');
                    setSeller({ token: '' });
                    navigate('/seller');
                }}>
                    Log out
                </button>
        }
    </header>;
}