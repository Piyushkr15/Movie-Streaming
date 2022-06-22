import React, { useState, useEffect } from 'react'
import "./Nav.css"

function Nav() {
    const [show, handleShow] = useState(false);

    const transitionNavbar = () => {
        if(window.scrollY > 100) {
            handleShow(true);
        }
        else {
            handleShow(false);
        }   
    };

    useEffect(() => {
        
        window.addEventListener("scroll", transitionNavbar);
        return () => window.removeEventListener("scroll", transitionNavbar);
        // this return part says that whenever useEffect gets fired off.. before u get fired it off again remove the event listener
        // so we will not get many listeners
    }, []);
    
    
  return (
    <div className={`nav ${show && "nav__black"}`}>
        <img
            className = 'nav__logo'
            src = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt = "Netflix Logo"
        />
        <img
            className = 'nav__avatar'
            src = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt = "Netflix Logo"
        />

    </div>
  );
}

export default Nav