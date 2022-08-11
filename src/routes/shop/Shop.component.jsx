import {Routes, Route} from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Shop.style.scss";
import Category from "../../routes/category/Category.component";
import CategoriesPreview from "../categories-preview/CategoriesPreview.component";
import { useEffect } from "react";
import { fetchCategoriesStart } from "../../store/categories/Categories.reducer";
const Shop = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        //Rule of thumb : use await to call async method
        //const getCategoriesMap = async()=>{
        //    const categoriesArray = await getCategoriesAndDocuments();
        //    console.log(categoriesArray);
        //    dispatch(setCategories(categoriesArray));
        //}
        //getCategoriesMap();
        dispatch(fetchCategoriesStart());
     
    },[])
    return (
        <Routes>
           <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category /> }/>

        </Routes>
       

    )
}
export default Shop;