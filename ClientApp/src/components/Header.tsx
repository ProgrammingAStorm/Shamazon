import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate()

    return <header>
        <h1 onClick={() => navigate("/")}>Shamazon</h1>

        <button onClick={() => navigate("/login")}>
            Log in
        </button>
    </header>;
}