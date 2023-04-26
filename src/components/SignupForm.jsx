import { useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
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

export default function SignupForm() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [user, setUser] = useState()

    const handleSignup = async (e) => {
        e.preventDefault()
        const results = await createUserWithEmailAndPassword (auth, email, password)
                .catch(alert)
            setUser(results.user)
    }

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        const results = await signInWithPopup(auth, provider)
            .catch(alert)
        setUser(results.user)

    }


    if(user) {
        return <h2>Welcome User! {user.uid}</h2>
    }

    return (
        <>
         <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email" placeholder="Enter Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <Form.Text>We'll never share your email.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    placeholder="Enter Password" 
                    onChange={e => setPassword(e.target.value)} />
            </Form.Group>


            <Form.Group>
                <Button
                variant="success"
                size="lg"
                type="submit">Sign Up</Button>
            </Form.Group>
         </Form>
        <Button onClick={signInWithGoogle} variant="dark"s size="lg">Sign in with Google</Button>
        </>
    )
}