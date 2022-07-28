import "./CheckoutItem.style.scss"
import { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
const CheckoutItem = ({ item }) => {
    const { name, imageUrl, price, quantity } = item;
    const { addItemToCart, removeItemToCart, clearItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(item);
    const addItemHandler = () => addItemToCart(item);
    const removeItemHandler = () => removeItemToCart(item);
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