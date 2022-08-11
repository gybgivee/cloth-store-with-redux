import { useState,useEffect} from "react"
import { useSelector } from "react-redux"
import { selectCategoriesMap } from "../../store/categories/Categories.reducer"
import {useParams} from "react-router-dom"
import ProductCard from "../../components/product-card/ProductCard.component"
import "./Category.style.scss"
const Category = ()=>{
    // path=":category" tell param that we will use catagory attribute 
    const {category} = useParams();
    const categories  = useSelector(selectCategoriesMap);
     const [products,setProducts] = useState(categories[category]);
     console.log('categories component is rerendering');
     useEffect(()=>{
        console.log('effect fired calling setProducts');
        setProducts(categories[category]);
     },[category,categories])
//it will render before we get categories back from firebase 
//so we need to build a safeguard by => products&&products.map(only run when products not null)
    return(
        <div className="page-container">
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
        </div>
    )

}
export default Category;