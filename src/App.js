import Home from "./routes/home/Home.component"
import Nav from "./routes/nav/Nav.component"
import { Routes, Route } from 'react-router-dom';
import Authentication from "./routes/authentication/Authentication.component";
import Shop from "./routes/shop/Shop.component";
import Checkout from "./components/check-out/Checkout.component";
function App() {
// Route index => A child route with no path that renders in the parent's outlet
  return (
    <Routes>
      <Route  path='/' element={<Nav />}>
        <Route index element={<Home />}/>
        <Route path='shop' element={<Shop />}/>
        <Route path='auth' element={<Authentication />}/>
        <Route path='checkout' element={<Checkout />}/>
      </Route>
    </Routes>
  );
}

export default App;
