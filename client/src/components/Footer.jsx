import React from 'react'
import './style/Footer.css'
import fb from '../assets/facebook.png'
import twitter from '../assets/twitter.png'
import linkedin from '../assets/linkedin.png'
import insta from '../assets/instagram.png'
const Footer = () => {
  return (
    <>
    <div className='footer'> 
      <div className='sb-footer section-padding'>
        <div className='sb-footer-links'>
            <div className='sb-footer-links-div'>
                <h4>Food Craze</h4>
                <a href="/recipe">
                <p>food</p>
                </a>
                <a href="/recipe">
                <p>food</p>
                </a>
                <a href="/recipe">
                <p>food</p>
                </a>
            </div>
            <div className='sb-footer-links-div'>
                <h4>Food Craze</h4>
                <a href="/recipe">
                <p>food</p>
                </a>
                <a href="/recipe">
                <p>food</p>
                </a>
                <a href="/recipe">
                <p>food</p>
                </a>
            </div>
            <div className='sb-footer-links-div'>
                <h4>Contact</h4>
                <a href="/recipe">
                <p>food</p>
                </a>
            </div>
            <div className='sb-footer-links-div'>
                <h4>Food Craze</h4>
                <a href="/recipe">
                <p>food</p>
                </a>
                <a href="/recipe">
                <p>food</p>
                </a>
                <a href="/recipe">
                <p>food</p>
                </a>
                <a href="/recipe">
                <p>food</p>
                </a>
            </div>
            <div className='sb-footer-links-div'>
                
                <div className='socialmedia'>
                    <p><img src={fb} alt="" /></p>
                    <p><img src={twitter} alt="" /></p>
                    <p><img src={linkedin} alt="" /></p>
                    <p><img src={insta} alt="" /></p>

                </div>
            </div>
        </div>
        <hr />
        <div className='sb-footer-below'>
        <div className='sb-footer-copyright'>
            <p>© 2021 Food Craze. All Rights Reserved.</p>
        </div>
        <div className='sb-footer-below-links'>
            <a href="/recipe"><div><p>Terms & Conditions</p></div></a>
            <a href="/recipe"><div><p>Privacy</p></div></a>
            <a href="/recipe"><div><p>Security</p></div></a>
            <a href="/recipe"><div><p>Cookie Declaration</p></div></a>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Footer
