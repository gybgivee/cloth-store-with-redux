import {Routes, Route} from "react-router-dom";
import "./Shop.style.scss";
import Category from "../../routes/category/Category.component";
import CategoriesPreview from "../categories-preview/CategoriesPreview.component";
const Shop = () => {
   
    return (
        <Routes>
           <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category /> }/>

        </Routes>
       

    )
}
export default Shop;