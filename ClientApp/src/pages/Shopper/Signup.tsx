// React imports
import { FormEvent, useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

//Util imports
import { UserContext } from "../../utils/context";
import { validateEmail, validatePassword } from "../../utils/validation";

export default function Signup() {
    // Form input state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    // Form message state
    const [message, setMessage] = useState('');

    // Navigator
    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        if (user.token !== '') navigate('/')
    }, []);

    return <main>
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
            <input
                type="text"
                placeholder="First Name"
                className="border-cyan-900 border m-1"
                value={firstName}
                required
                onChange={event => setFirstName(event.target.value)}
            ></input>
            <input
                type="text"
                placeholder="Last Name"
                className="border-cyan-900 border m-1"
                value={lastName}
                required
                onChange={event => setLastName(event.target.value)}
            ></input>

            <button type="submit" className="border-cyan-900 border m-1 p-1">Submit</button>

            {message != '' ? <p>{message}</p> : <p></p>}
        </form>
    </main>;

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

        const request = await fetch(`/api/shoppers/signup`, {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Password: password
            })
        });
        const response = await request.json();

        switch (request.status) {
            case 409:
                setMessage(response.message);

                break;
            case 202:
                localStorage.setItem('token', response.token)

                setUser({ token: response.token })

                navigate('/')

                break;
            default:
                console.log("status", request.status)
                console.log(response)
        }
    }

    function clearForm() {
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }
}