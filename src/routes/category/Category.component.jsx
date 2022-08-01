import { CategoriesContext} from "../../contexts/Categories.context"
import { useContext, Fragment ,useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import CategoryPreview from "../../components/category-preview/CategoryPreview.component"

import "./Category.style.scss"
const Category = ()=>{
    const {category} = useParams();
     const { categories } = useContext(CategoriesContext);
     const [products,setProducts] = useState(categories[category]);
     useEffect(()=>{
        setProducts(categories[category]);
     },[category,categories])
//it will render before we get categories back from firebase so we need to build a safeguard by => products&&products.map(only run when products not null)
    return(
   
        <div className="category-container">
            {
                products&&products.map(groupOfProduct => {
                    return (
                       <CategoryPreview key={groupOfProduct.id} products={groupOfProduct}/>
                    )
                })

            }

        </div>
       
    )

}
export default Category;