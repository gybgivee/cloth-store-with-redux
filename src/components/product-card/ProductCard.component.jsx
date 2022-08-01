import "./ProductCard.style.scss"
import Button from "../button/Button.component";
import { CartContext } from "../../contexts/Cart.context";
import { useContext } from "react";

const ProductCard = ({product})=>{

    const {name,price,imageUrl} = product;
    const {addItemToCart} = useContext(CartContext);
    
    const addProductToCart = () => addItemToCart(product);

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