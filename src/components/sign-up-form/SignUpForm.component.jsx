import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/FormInput.component";
import "./SignUpForm.style.scss"
import Button from "../button/Button.component";
import { signUpStart } from "../../store/user/User.reducer";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const defaultFromField = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''

    }
    const [formFields, setFormFields] = useState(defaultFromField);
    const { displayName, email, password, confirmPassword } = formFields;
   
    const resetFormFields = () => {
        setFormFields(defaultFromField);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Password do not match")
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));
            //const { user } = await createAuthUserWithEmailAndPassword(email, password);
            //await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            console.error('User creation encountered error', error.code);
        }


    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        //only update name to value
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text" required name="displayName" onChange={handleChange} value={displayName}
                />
                <FormInput
                    label="Email"
                    type="text" required name="email" onChange={handleChange} value={email}
                />
                <FormInput
                    label="Password"
                    type="password" required name="password" onChange={handleChange} value={password}
                />
                <FormInput
                    label="Confirm Password"
                    type="password" required name="confirmPassword" onChange={handleChange} value={confirmPassword} 
                />

                
               
                <Button type="submit">SIGN UP</Button>
            </form>

        </div>

    )
}
export default SignUpForm;