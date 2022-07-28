import "./CartDropdown.style.scss"
import Button from "../button/Button.component"
import CartItem from "../cart-item/CartItem.component"
import { CartContext } from "../../contexts/Cart.context"
import { useContext } from "react"
const CartDropdown = ()=>{
    const {cartItems} = useContext(CartContext);
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
             {cartItems.map((item,index)=> <CartItem key={index} cartItem={item} />)}
            </div>
            <Button>CHECKOUT</Button>
        </div>
    )

}
export default CartDropdown;