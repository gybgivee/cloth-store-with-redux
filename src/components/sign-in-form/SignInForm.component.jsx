import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utilities/firebase/firebase.utils"
import { useState} from "react";
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
            switch (error.code) {
                //could separate error message to different file,json 
                case "auth/wrong-password": alert("Incorrect Password for email"); break;
                case "auth/user-not-found": alert("No user associate with this ena"); break;
                default: console.log(error);
            }
        }

    }
    /*
    import signInWithGoogleRedirect ,useEffect,auth
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
        await signInWithGooglePopup();
        
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
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>

        </div>

    )
}
export default SignInForm;