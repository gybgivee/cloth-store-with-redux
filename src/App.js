import Home from "./routes/home/Home.component"
import Nav from "./routes/nav/Nav.component"
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Authentication from "./routes/authentication/Authentication.component";
import Shop from "./routes/shop/Shop.component";
import Checkout from "./components/check-out/Checkout.component";
import { checkUserSession } from "./store/user/User.reducer";

function App() {
// Route index => A child route with no path that renders in the parent's outlet
//with shop/* : anything start with /shop/ will go to shop exp. shop/hats, shop/jeans

const dispatch = useDispatch();
useEffect(() => {
  /*when using reducers
  const unsubscribe = onAuthStateChangedListener((user) => {
    if (user) {
      createUserDocumentFromAuth(user);
    }

    dispatch(setCurrentUser(user));
  });

  return unsubscribe;
  */
 dispatch(checkUserSession());
}, []);
  return (
    <Routes>
      <Route  path='/' element={<Nav />}>
        <Route index element={<Home />}/>
        <Route path='shop/*' element={<Shop />}/>
        <Route path='auth' element={<Authentication />}/>
        <Route path='checkout' element={<Checkout />}/>
      </Route>
    </Routes>
  );
}

export default App;
