import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils"
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/SignUpForm.component";
const SignIn = () => {
    useEffect(() => {
        const asyncFn = async () => { 
            const response = await getRedirectResult(auth); 
            console.log(response);
        };
        asyncFn();
            
            
    }, []);
    const loginToGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        //create the user and store it in DB from function in firebase.js
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <>
            <h1>SIGN IN</h1>

            <button onClick={loginToGoogleUser}>Sign in with google popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with google Redirect</button>
            <SignUpForm />
        </>
    )
}
export default SignIn;