import './_styles.scss'
import React from 'react'
import { Link } from 'components';
import facebook from 'images/social/linkedin.svg';
import instagram from 'images/social/instagram.svg';
import twitter from 'images/social/twitter.svg';
import linkedin from 'images/social/linkedin.svg';

export default function Footer() {
  return (
    <section id='footer'>
      <div className="wrapper">

        <ContactInfo
          location='Nairobi'
          phone='+254 719 236 860'
          email='sales@slicks-slices.co.ke'
          address='whitefield place, school lane, Westlands, Kenya'
        />

        <ContactInfo
          location='New York'
          phone='+10 278 398 4327'
          email='sales@slicks-slices.com'
          address='700/D 5th Ave, New York, NY 10028, United States'
        />

        <div className="subscribe">
          <h1 className="title">Newsletter</h1>
          <input type="text" placeholder='Enter Email Address'/>
          <button className="btn">Subscribe</button>
        </div>

      </div>
      <div className="wrapper socials">
        <div className="socials-content">

          <div className="social-link">
            <img src={facebook} alt='facebook icon' className="icon"/>
          </div>

          <div className="social-link">
            <img src={instagram} alt='instagram icon' className="icon"/>
          </div>

          <div className="social-link">
            <img src={twitter} alt='twitter icon' className="icon"/>
          </div>

          <div className="social-link">
            <img src={linkedin} alt='linkedin icon' className="icon"/>
          </div>

        </div>
      </div>
      <div className="wrapper legal">
        <div className="copyright">
          <span className="spacer"/>
          <span>&#169; 2020</span>
          <span className="spacer"/>
          <a href='https://dribbble.com/uttom0094' target='blank'>UOS Design. </a>
          <span>All Rights Reserved.</span>
          <span className="spacer"/>
          <span>Powered By <a href="https://github.com/AnthonyMwangi" target='blank' className="link">Tony Mwangi</a></span>
        </div>
        <div className="terms">
          <Link to="/#home" className="link" title='Terms of Delivery'/>
          <Link to="/#home" className="link" title='Privacy Policy'/>
        </div>
      </div>
    </section>
  )
}

function ContactInfo({ location, address, email, phone }) {
  return (
    <div className="contact-info">
      <h1 className="title">{location}</h1>
      <div className="address">{address}</div>
      <a href={`tel:${phone}`} className="phone-no">{phone}</a>
      <a href={`mailto:${email}`} className="email">{email}</a>
    </div>
  )
}
