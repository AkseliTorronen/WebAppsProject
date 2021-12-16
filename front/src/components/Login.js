import {useNavigate} from 'react-router-dom'


function Login() {
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault()

        const userData ={
            email: e.target.email.value,
            password: e.target.password.value
        }

        fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.token) {
                    window.localStorage.setItem("auth_token", data.token) //set the token as current user's token
                    
                }
            })
        navigate('/') //get back to the home page after getting logged in

    }


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <input type="email" name="email" id="email"/>
                <input type="password" name="password" id="password"/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login
