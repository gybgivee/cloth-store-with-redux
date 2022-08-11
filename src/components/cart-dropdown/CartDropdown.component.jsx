import "./CartDropdown.style.scss"
import Button from "../button/Button.component"
import CartItem from "../cart-item/CartItem.component"
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCartItems } from "../../store/cart/Cart.reducer"
const CartDropdown = ()=>{
    //const {cartItems} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const goToCheckoutHandler = ()=> navigate("./checkout")
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
             {cartItems.map((item,index)=> <CartItem key={index} cartItem={item} />)}
            </div>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </div>
    )

}
export default CartDropdown;