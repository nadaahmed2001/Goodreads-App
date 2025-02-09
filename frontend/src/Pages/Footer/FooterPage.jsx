import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
// import TermsConditions from "../TermsConditions/TermsConditions";
import './FooterPage.css';

export default function FooterPage() {
    return (
        <>
           <footer className='footer'>
    <ul className='row1'>
        <h3><li><a>Company</a></li></h3>
        <li className='li'><a>About us</a></li>
        <li className='li'><a>Careers</a></li>
        <li className='li'><a>Terms</a></li>
        <li className='li'><a>Privacy</a></li>
    </ul>
    <ul className='row2'>
        <h3><li><a>Work with us</a></li></h3>
        <li className='li'><a>Authors</a></li>
        <li className='li'><a>Advertise</a></li>
        <li className='li'><a>Authors & ads blog</a></li>
        <li className='li'><a>API</a></li>
    </ul>
    <ul className='row3'>
        <h3><li><a>Customer service</a></li></h3>
        <li className='li'><a>FAQ</a></li>
        <li className='li'><a>Disclaimer</a></li>
    </ul>
    <ul className='row4'>
        <h3><li><a>Follow us</a></li></h3>
        <span className='flexBox'>
            <li style={{ margin: '0 10px' }}>
                <Facebook size={20} color="blue" />
            </li>
            <li style={{ margin: '0 10px' }}>
                <Twitter size={20} color="#1DA1F2" />
            </li>
            <li style={{ margin: '0 10px' }}>
                <Instagram size={20} color="#E1306C" />
            </li>
            <li style={{ margin: '0 10px' }}>
                <Youtube size={20} color="red" />
            </li>
        </span>
    </ul>

    <div className='footer-bottom'>
        <img src='/newLogo.png' alt="Book App Logo" />
    </div>
</footer>

        </>
    )
}





