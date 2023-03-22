// React imports
import { FormEvent, useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

//Util imports
import { UserContext } from "../utils/context";

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        if (user.token !== '') navigate('/')
    }, [])

    return <>
        <form onSubmit={event => handleLogin(event)}>
            <input
                type="email"
                placeholder="Email"
                className="border-cyan-900 border m-1"
                value={email}
                required
                onChange={event => setEmail(event.target.value)}
            ></input>
            <input
                type="password"
                placeholder="Password"
                className="border-cyan-900 border m-1"
                value={password}
                required
                onChange={event => setPassword(event.target.value)}
            ></input>

            <button type="submit" className="border-cyan-900 border m-1 p-1">Submit</button>

            {message != '' ? <p>{message}</p> : <p></p> }
        </form>

        <Link to="/signup">Create account?</Link>
    </>

    async function handleLogin(event: FormEvent) {
        event.preventDefault()

        if (!validateEmail(email)) {
            clearForm();
            return setMessage("Email is not valid.");
        }

        if (!validatePassword(password)) {
            clearForm();
            return setMessage("Password is not valid.");
        }

        clearForm();

        const request = await fetch(`/api/shoppers/login?email=${email}&password=${password}`, {
            method: "GET",
        });
        const response = await request.json();

        switch (request.status) {
            case 401:
                setMessage(response.message);

                break;
            case 202:
                localStorage.setItem('token', response.token)

                setUser({token: response.token})

                navigate('/')

                break;
            default:
                console.log("status", request.status)
                console.log(response)
        }
    }

    function validateEmail(email: String) {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function validatePassword(password: String) {
        return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/)
    }

    function clearForm() {
        setEmail('')
        setPassword('')
    }
}