import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils"

const SignIn = () => {
    const loginToGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        //create the user and store it in DB from function in firebase.js
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <>
            <h1>Sign In</h1>

            <button onClick={loginToGoogleUser}>Sign in with google popup</button>
        </>
    )
}
export default SignIn;