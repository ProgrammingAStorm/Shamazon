//React imports
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//Util imports
import { UserContext } from "../../utils/context";

export default function Header() {
    const navigate = useNavigate();
    // const [user, setUser] = useContext(UserContext)

    return <header>
        <h1 onClick={() => navigate("/seller/")}>Shamazon</h1>

        {
            // user.token === ''
            //     ?
            <>
                <button onClick={() => navigate("/seller/login")}>
                    Log in
                </button>
                {/*: */}
                <button onClick={() => {
                    localStorage.setItem('seller-token', '')
                    // setUser({ token: '' })
                    navigate('/seller')
                }}>
                    Log out
                </button>
            </>
        }
    </header>;
}