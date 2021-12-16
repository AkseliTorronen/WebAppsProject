import {useNavigate} from 'react-router-dom'

function Register() {
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault()

        const userData ={
            email: e.target.email.value,
            password: e.target.password.value
        }

        fetch("/users/register", {
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
                window.localStorage.setItem("auth_token", "") //reset auth_token so newly registered user can log in
                
            })
        navigate('/users/login') //redirect to login page so user can log in

    }


    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submit}>
                <input type="email" name="email" id="email"/>
                <input type="password" name="password" id="password"/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Register