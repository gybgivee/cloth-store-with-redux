import { CategoriesContext} from "../../contexts/Categories.context"
import { useContext, Fragment ,useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import ProductCard from "../../components/product-card/ProductCard.component"
import "./Category.style.scss"
const Category = ()=>{
    const {category} = useParams();
     const { categories } = useContext(CategoriesContext);
     const [products,setProducts] = useState(categories[category]);
     useEffect(()=>{
        setProducts(categories[category]);
     },[category,categories])
//it will render before we get categories back from firebase 
//so we need to build a safeguard by => products&&products.map(only run when products not null)
    return(
        <Fragment>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className="category-container">
            {
                products&&products.map(groupOfProduct => {
                    return (
                        <ProductCard key={groupOfProduct.id} product={groupOfProduct} />
                    )
                })

            }

        </div>
        </Fragment>
    )

}
export default Category;