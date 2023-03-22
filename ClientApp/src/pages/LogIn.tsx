import { FormEvent, useState } from "react"

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('')

    return <form onSubmit={event => handleLogin(event)}>
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

        {message === '' ? <p>No Message</p> : <p>{message}</p>}
    </form>

    async function handleLogin(event: FormEvent) {
        event.preventDefault()

        if (!validateEmail(email)) {
            return setMessage("Email is not valid.");
        }

        if (!validatePassword(password)) {
            return setMessage("Password is not valid.");
        }

        clearForm();

        const request = await fetch('/api/shoppers/signup', {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "FirstName": "Mark",
                "LastName": "Pavel",
                "Email": email,
                "Password": password,
            })
        });
        const response = await request.json();
        console.log("status", request.status)

        switch (request.status) {
            case 409:
                console.log(response.message);
                break;

            case 202:
                console.log(response)
                break;

            default:
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