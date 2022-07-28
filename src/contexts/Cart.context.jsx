import { useEffect, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext(
    {
        isCartOpen:false,
        setIsCartOpen:()=>{},
        cartItems:[],
        setCartItems:()=>{},
        addItemToCart:()=>{},
        removeItemToCart:()=>{},
        clearItemFromCart:()=>{},
        cartTotal:0
    }
)
export const CartProvider =({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
        const newTotal = cartItems.reduce((total, item)=>total+(item.quantity*item.price),0)
        setCartTotal(newTotal);
    },[cartItems])

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
    const removeItemToCart = (product)=>{
        let updateItems=[];
        const existingCartItem = cartItems.find(item=>item.id === product.id);
        if(existingCartItem.quantity === 1){
            updateItems = cartItems.filter(item=>item.id !== product.id)
        }else{
            updateItems = cartItems.map((item)=>item.id === product.id ? {...item,quantity: item.quantity-1}:item)
        }
        setCartItems(updateItems);
    }
    const clearItemFromCart=(product)=>{
        const updateItems=cartItems.filter(item=>item.id !== product.id);
        setCartItems(updateItems);
    }
    const value = {isCartOpen, setIsCartOpen,cartItems,addItemToCart,removeItemToCart,clearItemFromCart,cartTotal}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}