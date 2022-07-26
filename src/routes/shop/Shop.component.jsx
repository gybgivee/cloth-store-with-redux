import {ProductContext} from "../../contexts/Product.context"
import { useContext } from "react"
import ProductCard from "../../components/product-card/ProductCard.component"
import "./Shop.style.scss"
const Shop = () => {
    const {products} = useContext(ProductContext)
    return (
        <div className="products-container">
            {products.map((product) => {
                return (
                    <ProductCard key={product.id} product={product}/>
                  
                )
            })}
        </div>
    )
}
export default Shop;