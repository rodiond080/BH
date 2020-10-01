import React from 'react';

export const Footer = (props)=>{

  return(
    <footer className="footer">
      <div className="border">
        <div className="footer-wrapper">
          <ul>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-vk"></i></a></li>
            <li><a href="#"><i className="fab fa-whatsapp"></i></a></li>
            <li><a href="#"><i className="fab fa-telegram-plane"></i></a></li>
            <li><a href="#"><i className="fas fa-phone"></i>+79998887766</a></li>
            <li><a href="#"><i className="fas fa-hat-cowboy"></i>vkomode</a></li>
          </ul>
          <span>Bakehouse-spb все права защищены (c) 2016-2020 | made by <span><a href="#">Rodion D</a></span></span>
        </div>
      </div>
    </footer>
  )
}
