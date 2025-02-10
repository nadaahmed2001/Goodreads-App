import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './FooterPage.css';
import LanguageContext from '../../context/language';

export default function FooterPage() {
    const { language } = React.useContext(LanguageContext);
    return (
        <footer className='footer'>
            {/* Company Section */}
            <ul className='row1'>
                <h3><li><a href="/about-us">
                    {language === 'en' ? 'Company' : 'الشركة'}
                </a></li></h3>
                <li className='li'><a href="/about-us">
                {language === 'en' ? 'About Us' : 'من نحن'}
                </a></li>
                <li className='li'><a href="/careers">
                {language === 'en' ? 'Careers' : 'وظائف'}
                </a></li>
                <li className='li'><a href="/terms">
                {language === 'en' ? 'Terms & Conditions' : 'الشروط والأحكام'}
                </a></li>
                <li className='li'><a href="/privacy">
                {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
                </a></li>
            </ul>

            {/* Work with Us Section */}
            <ul className='row2'>
                <h3><li><a href="/work-with-us">
                {language === 'en' ? 'Work with Us' : 'تعامل معنا'}
                </a></li></h3>
                <li className='li'><a href="/authors">
                {language === 'en' ? 'Authors' : 'المؤلفون'}
                </a></li>
                <li className='li'><a href="/publishers">
                {language === 'en' ? 'Publishers' : 'الناشرون'}
                </a></li>
                <li className='li'><a href="/bookstores">
                {language === 'en' ? 'Bookstores' : 'المكتبات'}
                </a></li>
                <li className='li'><a href="/contact-us">
                {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
                </a></li>
            </ul>

            {/* Customer Service Section */}
            <ul className='row3'>
                <h3><li><a href="/customer-service">
                {language === 'en' ? 'Customer Service' : 'خدمة العملاء'}
                </a></li></h3>
                <li className='li'><a href="/help">
                {language === 'en' ? 'Help' : 'المساعدة'}
                </a></li>
                <li className='li'><a href="/shipping">
                {language === 'en' ? 'Shipping' : 'الشحن'}
                </a></li>
                <li className='li'><a href="/returns">
                {language === 'en' ? 'Returns' : 'الإرجاع'}
                </a></li>
                <li className='li'><a href="/faq">
                {language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
                </a></li>
            </ul>

            {/* Follow Us Section */}
            <ul className='row4'>
                <h3><li>
                    {language === 'en' ? 'Follow Us' : 'تابعنا'}
                </li></h3>
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