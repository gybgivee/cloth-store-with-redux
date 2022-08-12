import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import { useDispatch } from "react-redux"
import { ReactComponent as CrownLogo } from "../../assets/crown.svg"
import CartIcon from "../../components/cart-icon/CartIcon.component"
import CartDropdown from "../../components/cart-dropdown/CartDropdown.component"
import "./Nav.style.scss"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/User.reducer"
import { selectIsCartOpen } from "../../store/cart/Cart.reducer"
import {signOutStart} from "../../store/user/User.reducer"

const Nav = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const signOutUser = () => dispatch(signOutStart());
  
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