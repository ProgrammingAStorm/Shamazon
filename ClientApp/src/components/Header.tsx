//React imports
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//Util imports
import { UserContext } from "../utils/context";

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext)


    return <header>
        <h1 onClick={() => navigate("/")}>Shamazon</h1>

        <button onClick={() => navigate("/login")}>
            Log in
        </button>
    </header>;
}