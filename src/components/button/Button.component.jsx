import "./Button.style.scss"
const Button =(props)=>{
    //innerText is called children in react
    const {buttonType="",children,...theRestProps} = props;
   //console.log('innerText',children);
    //console.log('buttonType',buttonType);
    //console.log('theRestProps',theRestProps);

    const buttonClass =
    {
        google:'google-sign-in',
        inverted:'inverted'

    }
    return(
        <button className={`button-container ${buttonClass[buttonType]}`}{...theRestProps}>{children}</button>
    )
}
export default Button;