import "./CheckoutItem.style.scss"
import { useSelector,useDispatch } from "react-redux";
import {
    selectCartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart
} from "../../store/cart/Cart.reducer"
const CheckoutItem = ({ item }) => {
    const dispatch = useDispatch();
    const { name, imageUrl, price, quantity } = item;
    
    const cartItems = useSelector(selectCartItems);
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems,item));
    const addItemHandler = () => dispatch(addItemToCart(cartItems,item));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems,item));
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <span className="remove-button" onClick={clearItemHandler}>&#10005;</span>


        </div>
    )
}
export default CheckoutItem;