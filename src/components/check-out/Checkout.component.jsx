import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/Cart.reducer";
import "./Checkout.style.scss"
import CheckoutItem from "../checkout-item/CheckoutItem.component";
import PaymentForm from "../payment-form/PaymentForm.component";

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (

        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quality</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>

            </div>

            {cartItems.map((item, index) => {

                return (
                    <CheckoutItem key={index} item={item} />
                )
            })}
            <span className="total">£{cartTotal}</span>
        <PaymentForm />
        </div>

    )
}
export default Checkout;