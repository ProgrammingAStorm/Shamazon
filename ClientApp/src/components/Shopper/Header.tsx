//React imports
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//Util imports
import { ShopperContext } from "../../utils/context";

export default function Header() {
    const navigate = useNavigate();
    const [shopper, setShopper] = useContext(ShopperContext)

    return <header>
        <h1 onClick={() => navigate("/")}>Shamazon</h1>

        {
            shopper.token === ''
                ?
                <button onClick={() => navigate("/login")}>
                    Log in
                </button>
                :
                <button onClick={() => {
                    localStorage.setItem('token', '')
                    setShopper({ token: '' })
                    navigate('/')
                }}>
                    Log out
                </button>
        }
    </header>;
}