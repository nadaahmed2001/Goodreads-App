import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './FooterPage.css';

export default function FooterPage() {
    return (
        <footer className='footer'>
            {/* Company Section */}
            <ul className='row1'>
                <h3><li><a href="/about-us">Company</a></li></h3>
                <li className='li'><a href="/about-us">About us</a></li>
                <li className='li'><a href="/careers">Careers</a></li>
                <li className='li'><a href="/terms">Terms</a></li>
                <li className='li'><a href="/privacy">Privacy</a></li>
            </ul>

            {/* Work with Us Section */}
            <ul className='row2'>
                <h3><li><a href="/work-with-us">Work with us</a></li></h3>
                <li className='li'><a href="/authors">Authors</a></li>
                <li className='li'><a href="/advertise">Advertise</a></li>
                <li className='li'><a href="/blog">Authors & ads blog</a></li>
                <li className='li'><a href="/api">API</a></li>
            </ul>

            {/* Customer Service Section */}
            <ul className='row3'>
                <h3><li><a href="/customer-service">Customer service</a></li></h3>
                <li className='li'><a href="/faq">FAQ</a></li>
                <li className='li'><a href="/disclaimer">Disclaimer</a></li>
            </ul>

            {/* Follow Us Section */}
            <ul className='row4'>
                <h3><li><a href="/follow-us">Follow us</a></li></h3>
                <span className='flexBox'>
                    <li>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <Facebook size={20} color="#FFF7E7" />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <Twitter size={20} color="#FFF7E7" />
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram size={20} color="#FFF7E7" />
                        </a>
                    </li>
                    <li>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <Youtube size={20} color="#FFF7E7" />
                        </a>
                    </li>
                </span>
            </ul>

            {/* Footer Bottom */}
            {/* <div className='footer-bottom'>
                <img src='/newLogo.png' alt="Book App Logo" />
            </div> */}
        </footer>
    );
}