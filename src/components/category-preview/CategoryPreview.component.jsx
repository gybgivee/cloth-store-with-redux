import ProductCard from "../product-card/ProductCard.component";
import "./CategoryPreview.style.scss"

const CategoryPreview = ({ title, products }) => {
    return (
        <div className="category-preview">
            <h2><span className="title">{title}</span></h2>
            <div className="preview">
                {products.filter((product,index)=>index < 4)
                .map((product)=><ProductCard key={product.id} product={product}/>)}
            </div>
        </div>
     
    )

}
export default CategoryPreview;