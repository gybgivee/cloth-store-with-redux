import Home from "./routes/home/Home.component"
import Nav from "./routes/nav/Nav.component"
import { Routes, Route } from 'react-router-dom';
import Authentication from "./routes/authentication/Authentication.component";
const Shop =()=>{
  return <h1>I am the shop page</h1>
}

function App() {

  return (
    <Routes>
      <Route  path='/' element={<Nav />}>
        <Route index element={<Home />}/>
        <Route path='shop' element={<Shop />}/>
        <Route path='auth' element={<Authentication />}/>
      </Route>
    </Routes>
  );
}

export default App;
