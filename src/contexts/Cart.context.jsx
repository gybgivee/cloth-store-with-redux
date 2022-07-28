import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext(
    {
        isCartOpen:false,
        setIsCartOpen:()=>{},
        cartItems:[],
        setCartItems:()=>{}
    }
)
export const CartProvider =({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const addItemToCart = (product)=>{
        let updateItems=[];
       const existingCartItem = cartItems.find(item=>item.id === product.id);
       if(existingCartItem){
        updateItems = cartItems.map((item)=>item.id === product.id ? {...item,quantity: item.quantity+1}:item)
       }else{
        updateItems = [...cartItems,{...product,quantity:1}]
       }
       setCartItems(updateItems);
    }
    const value = {isCartOpen, setIsCartOpen,cartItems,addItemToCart}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}