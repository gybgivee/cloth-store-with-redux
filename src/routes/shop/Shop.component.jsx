import {Routes, Route} from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard.component"
import "./Shop.style.scss"
import CategoryPreview from "../../components/category-preview/CategoryPreview.component"
import Category from "../../routes/category/Category.component";
const Shop = () => {
   
    return (
        <Routes>
            <Route index element={<CategoryPreview />} />
            <Route path=":category" element={<Category /> }/>

        </Routes>
       

    )
}
export default Shop;