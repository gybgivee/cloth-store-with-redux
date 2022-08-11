import "./ProductCard.style.scss"
import Button from "../button/Button.component";
import { useDispatch,useSelector } from "react-redux";

import { addItemToCart,selectCartItems } from "../../store/cart/Cart.reducer";

const ProductCard = ({product})=>{
    const dispatch = useDispatch();
    const {name,price,imageUrl} = product;
    //cartItems = currentCartItem
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems,product));

    return(

        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}£</span>
            </div>
            <Button buttonType="inverted" onClick={addProductToCart}>Add to cart</Button>

        </div>
    )

}
export default ProductCard;