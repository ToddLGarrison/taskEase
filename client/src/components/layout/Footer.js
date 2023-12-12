import React from 'react';



const Footer = () => {
    const currentYear = new Date().getFullYear();

    return ( 
        <div>
            <p className="footer">Developed by Todd Garrison | Copyright {currentYear}</p>
        </div>)
}

export default Footer