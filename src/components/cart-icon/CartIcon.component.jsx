import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
import "./CartIcon.style.scss"
const CartIcon = ()=>{
    const{isCartOpen,setIsCartOpen,cartItems} = useContext(CartContext);
    const toggleIsCartOpen = ()=>setIsCartOpen(!isCartOpen);
    const totalItems = cartItems.reduce((totalItems,item)=>  item.quantity + totalItems,0);
return(
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{totalItems}</span>
    </div>
)
}
export default CartIcon;