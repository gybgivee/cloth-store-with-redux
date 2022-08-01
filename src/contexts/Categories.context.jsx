import { useEffect,useState,createContext } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utilities/firebase/firebase.utils";
//import SHOP_DATA from "../shop-data.js"
export const CategoriesContext = createContext(
    {
        categories:{},
    }
)
export const CategoriesProvider =({children})=>{
    const [categories,setCategories] = useState({});

    //when using async function inside the useEffect => need to create aync function inside the useEffect, not declare useEffect as async
    useEffect(()=>{
        //Rule of thumb : use await to call async method
        const getCategoriesMap = async()=>{
            const categoriesMap = await getCategoriesAndDocuments();
            console.log('categories',categoriesMap);
            setCategories(categoriesMap);
        }
        getCategoriesMap();
     
    },[])
    /*
    load data to the firebase db the first time 
    useEffect(()=>{
        console.log('shopData',{...SHOP_DATA});
        addCollectionAndDocuments("categories",SHOP_DATA)
    },[])*/
    const value = {categories}
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}