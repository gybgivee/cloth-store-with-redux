import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import "./CartIcon.style.scss"
import { useDispatch ,useSelector} from "react-redux";
import {
    selectIsCartOpen,
    setIsCartOpen,
    selectCartCount
} from "../../store/cart/Cart.reducer"

const CartIcon = ()=>{
   
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = ()=> dispatch(setIsCartOpen(!isCartOpen));
  
return(
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{cartCount}</span>
    </div>
)
}
export default CartIcon;