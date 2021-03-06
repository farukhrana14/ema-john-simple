import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
// import jwt_decode from "jwt-decode";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    return (
        <div className="Header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory Here</Link>
                <span className='display-name'>{loggedInUser && (loggedInUser.name || loggedInUser.email)}</span>
                <span className='display-photo'> {loggedInUser && <img src={loggedInUser.photo} alt=""/> }</span>
                <span>{
                    (loggedInUser.email || sessionStorage.getItem('token')) ? <button onClick={()=> setLoggedInUser({})} >Sign Out</button> : <Link to="/login"> <button>Sign In</button> </Link>
                }</span>
                
            </nav>
        </div>
    );
};

export default Header;
