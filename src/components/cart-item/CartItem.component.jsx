import "./CartItem.style.scss"
const CartItem = ({ cartItem }) => {
    const { name, imageUrl,price,quantity } = cartItem;
  
    return (
        <div className="cart-item-container">
            <img src={imageUrl} alt={name} />
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price">{quantity} x £{price}</span>
             
            </div>
            <span className="total">£{quantity*price.toFixed(2)}</span>

        </div>
    )
}
export default CartItem;