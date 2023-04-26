import { useState } from "react";
import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword} from "firebase/auth"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


const firebaseConfig = {
        apiKey: "AIzaSyCEQpgrIO7hXtPnOnAF34LHaYh6UjB7tHE",
        authDomain: "timber-login-ms.firebaseapp.com",
        projectId: "timber-login-ms",
        storageBucket: "timber-login-ms.appspot.com",
        messagingSenderId: "496944921886",
        appId: "1:496944921886:web:7e7bcc2b56ce34abe0dd0f"
      }
      
const app = initializeApp(firebaseConfig);
const auth = getAuth (app);


export default function LoginForm() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [user, setUser] = useState()

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await signInWithEmailAndPassword(auth, email, password)
            .catch(err => console.error(err));
        setUser(response.user)
    }
    if(user) {
        return <h1>Welcome User {user.email} !</h1>
    }

    return (
        <>
         <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    value ={email} onChange={ e => setEmail(e.target.value)}
                    type="email" placeholder="Enter Email" />
                <Form.Text>We'll never share your email.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password" placeholder="Enter Password" 
                    onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Button
                variant="success"
                size="lg"
                type="submit">Login</Button>
            </Form.Group>
         </Form>
        </>
    )
}