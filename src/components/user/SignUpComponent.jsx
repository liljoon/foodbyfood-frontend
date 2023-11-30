import { useState } from "react";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from "react-bootstrap";
import { signUp } from "../api/UserApi";

export function SignUpComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    function handleUsernameChange(event) {
		setUsername(event.target.value);
	}

	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}


    function handleSubmit(event) {
        event.preventDefault();
        signUp(username, password)
        .then(response => {
            alert("생성 완료!");
            navigate("/");
        })
        .catch(response => {
            alert("중복");
        })
    }

    return (
        <Container className="Login">
            <h2 className="text-center mb-4">회원가입</h2>
			<Form className="signUpForm">
				<Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter ID" onChange={handleUsernameChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Sign Up
                </Button>

			</Form>
		</Container>
    );
}
