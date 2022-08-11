import ProductCard from "../product-card/ProductCard.component";
import "./CategoryPreview.style.scss"
import { Link } from 'react-router-dom';
const CategoryPreview = ({ title, products }) => {
    //console.log(products);
    return (
        <div className='category-preview-container'>
        <h2>
          <Link className='title' to={title}>
            {title.toUpperCase()}
          </Link>
        </h2>
        <div className='preview'>
          {products
            .filter((product, index) => index < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    )

}
export default CategoryPreview;