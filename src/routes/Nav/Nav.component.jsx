import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import { ReactComponent as CrownLogo } from "../../assets/crown.svg"
import {signOutUser} from "../../utilities/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/CartIcon.component"
import CartDropdown from "../../components/cart-dropdown/CartDropdown.component"
import "./Nav.style.scss"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/User.reducer"
import { selectIsCartOpen } from "../../store/cart/Cart.reducer"

const Nav = () => {

    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
  
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    < CrownLogo className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">SHOP</Link>
                    {
                        currentUser ? 
                        (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>) 
                        : (<Link className="nav-link" to="/auth">SIGN IN</Link>)
                    }
                    <CartIcon />

                </div>
                    {isCartOpen&&<CartDropdown />}    
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Nav