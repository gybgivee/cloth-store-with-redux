import { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
import "./Checkout.style.scss"
const Checkout = () => {
    const {cartItems,addItemToCart,removeItemToCart} = useContext(CartContext);
    return (
        <div>
            <div>
                {cartItems.map((item,index) =>{
                    const {name,quantity} = item;
                    return(
                        <div key={index}>
                            <span>{name}</span>
                            <span onClick={()=>{addItemToCart(item)}}>+</span>
                            <span>{quantity}</span>
                            <span onClick={()=>{removeItemToCart(item)}}>-</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Checkout;