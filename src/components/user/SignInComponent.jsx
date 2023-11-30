import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from "react-bootstrap";

import { signIn } from "../api/UserApi";

export default function SignInComponent() {

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
        signIn(username, password)
        .then(response => {
            console.log(response);
            navigate("/home");
        })
        .catch(response => {
            alert("인증 오류!");
        })
    }

    return (
        <Container className="Login">
			<Form className="LoginForm">
                <h2 className="text-center mb-4">로그인</h2>
				<Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter ID" onChange={handleUsernameChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                </Form.Group>
                <Button as="a" variant="secondary" className="mx-2" href="/signup" >Sign Up</Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Sign In
                </Button>

			</Form>
		</Container>
    );
}
