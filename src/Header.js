import React from 'react'
import './header.css'
import logo from './images/logo.png'
import { Search, ShoppingBag } from '@mui/icons-material'
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';


function Header() {
    const [{ basket, user }, dispatch] = useStateValue()
    const handleAuthentication = () => {
        if (user) {
            auth.signOut()
        }
    }
    return (
        <div className='header'>
            <Link to='/'>
                <img
                    src={logo}
                    className='header__logo'
                />
            </Link>
            <div className='header__search'>
                <input
                    className='header__searchInput'
                    type='text'
                />
                <Search className="header__searchIcon" />
            </div>
            <div className='header__nav'>
                <Link to={!user && '/login'}>
                    <div className='header__option' onClick={handleAuthentication}>
                        <span className='header__optionLineOne'>
                            Hello {!user ? 'Guest' : user.email}
                            {console.log(!user)}
                        </span>
                        <span className='header__optionLineTwo'>
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Returns
                    </span>
                    <span className='header__optionLineTwo'>
                        Orders
                    </span>
                </div>
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Your
                    </span>
                    <span className='header__optionLineTwo'>
                        Prime
                    </span>
                </div>
                <Link to='/checkout'>
                    <div className='header__optionBasket'>
                        <ShoppingBag />
                        <span className='header__optionLineTwo header__bagCount'>
                            {basket?.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default Header