import "./FormInput.style.scss"
const FormInput = ({ label, ...theRestProps }) => {
    return (
        <div className="group">

            <input className="form-input" {...theRestProps} />
            {label && //if label exist render the label
                (
                    <label className={`${theRestProps.value.length ? 'shrink' : ''}form-input-label`}>{label}</label>
                )
            }

        </div>
    )
}
export default FormInput;