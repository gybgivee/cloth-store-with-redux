import './Button.style.scss'
import {Spinner} from '../spinner/Spinner.component'
export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};
/*
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
({
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
}[buttonType]);*/

const Button = ({ children, buttonType, isLoading = false, ...otherProps }) => {
 
  return (
    <button disabled={isLoading}  className={`button-container ${ BUTTON_TYPE_CLASSES[buttonType]}`}{...otherProps}>
    {isLoading ? <Spinner /> : children}
      </button>
   
  );
};

export default Button;


/*
const Button = (props) => {
    //innerText is called children in react
    const { buttonType = "", children, ...theRestProps } = props;
    //console.log('innerText',children);
    //console.log('buttonType',buttonType);
    //console.log('theRestProps',theRestProps);

    const buttonClass =
    {
        google: 'google-sign-in',
        inverted: 'inverted'

    }
    return (
        <button className={`button-container ${buttonClass[buttonType]}`}{...theRestProps}>{children}</button>
    )
}
export default Button;*/
