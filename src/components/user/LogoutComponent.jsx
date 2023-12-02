import {Button} from "react-bootstrap";
import {logout} from "../api/UserApi";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export function LogoutComponent() {

    const [, , removeCookie] = useCookies();
    const navigate = useNavigate();


    function handleOnClick(event) {
        logout()
            .then(response => {
                removeCookie("JSESSIONID");
                navigate("/");
            })
            .catch(response => {
                navigate("/");
            })
    }

    return (
        <div>
            <Button variant="warning" className="m-3" onClick={handleOnClick}>Logout</Button>
        </div>
    );
}