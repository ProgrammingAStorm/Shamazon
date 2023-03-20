export default function Header() {

    return <header>
        <h1>Shamazon</h1>

        <button onClick={async () => {
            const request = await fetch('/api/shoppers', {
                method: "POST",
                headers: {
                    "content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    "FirstName": "Mark",
                    "LastName": "Pavel",
                    "Email": "markpavel02@gmail.com",
                    "Password": "Password",
                })
            });
            const response = await request.json()

            switch (request.status) {
                case 409:
                    console.log(response.message);
                    break;

                case 201:
                    console.log(response)
                    break;

                default:
                    console.log(response)
            }
        }}>
            Log in
        </button>
    </header>;
}