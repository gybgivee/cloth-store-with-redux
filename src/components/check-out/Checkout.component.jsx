import { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
import "./Checkout.style.scss"
import CheckoutItem from "../checkout-item/CheckoutItem.component";
const Checkout = () => {
    const { cartItems,cartTotal } = useContext(CartContext);
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
                
                {cartItems.map((item,index) =>{
                 
                    return(
                        <CheckoutItem key={index} item={item}/>
                    )
                })}
                <span className="total">£{cartTotal}</span>
                </div>
           
    )
}
export default Checkout;