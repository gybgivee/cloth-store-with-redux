import { auth,signInAuthUserWithEmailAndPassword  ,signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils"
import { getRedirectResult } from "firebase/auth";
import { useState, useEffect } from "react";
import FormInput from "../form-input/FormInput.component";
import './SignInForm.style.scss'
import Button from "../button/Button.component";

const SignInForm = () => {
    const defaultFromField = {
        email: '',
        password: '',
    }
    const [formFields, setFormFields] = useState(defaultFromField);

    const { email, password } = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFromField);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log('response', response);
            resetFormFields(); 
        } catch (error) {
            console.error('User creation encountered error', error.code);
        }

    }
    /*
    this is using with the signInWithGoogleRedirect => use effect becuase it need result back
    useEffect(() => {
        const asyncFn = async () => {
            const response = await getRedirectResult(auth);
            console.log(response);
        };
        asyncFn();


    }, []);
    */
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        //create the user and store it in DB from function in firebase.js
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        //only update name to value
        setFormFields({ ...formFields, [name]: value })
        
    }
    return (
        <div className="sign-in-container">
            <h2>Already have an account ?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type="text" required name="email" onChange={handleChange} value={email}
                />
                <FormInput
                    label="Password"
                    type="password" required name="password" onChange={handleChange} value={password}
                />
                <div className="container">
                    <Button type="submit">SIGN IN</Button>
                    <Button buttonType="google" onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>

        </div>

    )
}
export default SignInForm;