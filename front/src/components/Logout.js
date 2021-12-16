import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'

function Logout() {
    const navigate = useNavigate();

    //with the press of a button, the user's token is erased and he/she gets sent back to the fron page

    return (
        <div>
            <h2>Logout</h2>
            <Button className="btn btn-primary" onClick={() => {window.localStorage.setItem("auth_token", "");navigate('/')}}>Logout</Button>
        </div>
    )
}

export default Logout
