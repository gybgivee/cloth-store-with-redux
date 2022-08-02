import { useReducer } from "react";
import { createContext } from "react";
import { createAction } from "../utilities/reducer/reducer.utils";
//just like context
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    setCartItems: () => { },
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartTotal: 0
});

const initialState = {
    isCartOpen: false,
    cartItems: [],
    cartTotal: 0,
}
const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
};
const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};
export const CartProvider = ({ children }) => {

    const [{ cartItems, isCartOpen, cartTotal }, dispatch] = useReducer(
        cartReducer,
        initialState
    );

    const updateCartItemsReducer = (cartItems) => {
        const total = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        const payload = {
            cartItems,
            cartTotal: total,
        };
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    };
    const setIsCartOpen = (boolean) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean))
    }

    //same as contact but change from setCartItems to  updateCartItemsReducer(updateItems);
    const addItemToCart = (product) => {
        let updateItems = [];
        const existingCartItem = cartItems.find(item => item.id === product.id);
        if (existingCartItem) {
            updateItems = cartItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        } else {
            updateItems = [...cartItems, { ...product, quantity: 1 }]
        }
        //setCartItems(updateItems);
        updateCartItemsReducer(updateItems);
    }
    const removeItemToCart = (product) => {
        let updateItems = [];
        const existingCartItem = cartItems.find(item => item.id === product.id);
        if (existingCartItem.quantity === 1) {
            updateItems = cartItems.filter(item => item.id !== product.id)
        } else {
            updateItems = cartItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item)
        }
        //setCartItems(updateItems);
        updateCartItemsReducer(updateItems);
    }
    const clearItemFromCart = (product) => {
        const updateItems = cartItems.filter(item => item.id !== product.id);
        //setCartItems(updateItems);
        updateCartItemsReducer(updateItems);
    }
   
    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartTotal
    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
/*
Traditional Context State

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
}*/