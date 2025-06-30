import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/svg/104447_apple_logo_icon.svg';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.3s ease;
  background-color: ${props => props.scrolled ? 'rgba(18, 18, 18, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.scrolled ? '0 5px 15px rgba(0, 0, 0, 0.3)' : 'none'};
  height: 70px;
  display: flex;
  align-items: center;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media screen and (max-width: 48em) {
    padding: 0 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  img {
    height: 2rem;
    filter: brightness(0) invert(1);
  }
  
  span {
    font-size: var(--fontmd);
    font-weight: 600;
    margin-left: 0.5rem;
    color: var(--white);
    letter-spacing: 0.5px;
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;

  @media screen and (max-width: 48em) {
    display: none;
  }
`;

const NavItem = styled.li`
  margin: 0 1.2rem;
  font-size: var(--fontxs);
  color: var(--white);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 500;
  opacity: 0.9;

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: var(--primary);
    transition: all 0.3s ease;
  }

  &:hover {
    color: var(--white);
    opacity: 1;
    
    &:after {
      width: 100%;
    }
  }
`;

const CTAButton = styled.button`
  background-color: var(--primary);
  color: var(--white);
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 2rem;
  font-size: var(--fontxs);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  margin-left: 1.5rem;

  &:hover {
    background-color: var(--primaryDark);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(223, 38, 38, 0.3);
  }
`;

const MobileMenuBtn = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 1.5rem;
  height: 1.2rem;
  cursor: pointer;
  z-index: 110;
  
  span {
    width: 100%;
    height: 2px;
    background-color: var(--white);
    transition: all 0.3s ease;
    transform-origin: left;
  }

  &.active {
    span:first-child {
      transform: rotate(45deg);
    }
    
    span:nth-child(2) {
      opacity: 0;
    }
    
    span:last-child {
      transform: rotate(-45deg);
    }
  }

  @media screen and (max-width: 48em) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background-color: rgba(18, 18, 18, 0.98);
  backdrop-filter: blur(10px);
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: all 0.3s ease;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  li {
    margin: 1rem 0;
    font-size: var(--fontmd);
    color: var(--white);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--primary);
      transform: scale(1.05);
    }
  }
  
  button {
    margin-top: 2rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
  opacity: ${props => props.isOpen ? 1 : 0};
  pointer-events: ${props => props.isOpen ? 'all' : 'none'};
  transition: opacity 0.3s ease;
`;

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      document.body.style.overflow = 'visible';
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <NavContainer scrolled={scrolled}>
        <NavContent>
          <Logo>
            <img src={logo} alt="TomOi.vn Logo" />
            <span>TomOi.vn</span>
          </Logo>
          
          <NavItems>
            <NavItem onClick={() => scrollToSection('hero')}>Trang chủ</NavItem>
            <NavItem onClick={() => scrollToSection('services')}>Dịch vụ Premium</NavItem>
            <NavItem onClick={() => scrollToSection('features')}>Tính năng</NavItem>
            <NavItem onClick={() => scrollToSection('testimonials')}>Đánh giá</NavItem>
            <NavItem onClick={() => scrollToSection('pricing')}>Combo All in one</NavItem>
            <NavItem onClick={() => scrollToSection('faq')}>FAQ</NavItem>
            <NavItem onClick={() => window.open('https://help.tomoi.vn', '_blank')}>Hỗ trợ</NavItem>
            <CTAButton onClick={() => scrollToSection('contact')}>Liên hệ ngay</CTAButton>
          </NavItems>
          
          <MobileMenuBtn className={mobileMenuOpen ? 'active' : ''} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuBtn>
        </NavContent>
      </NavContainer>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <ul>
          <li onClick={() => scrollToSection('hero')}>Trang chủ</li>
          <li onClick={() => scrollToSection('services')}>Dịch vụ Premium</li>
          <li onClick={() => scrollToSection('features')}>Tính năng</li>
          <li onClick={() => scrollToSection('testimonials')}>Đánh giá</li>
          <li onClick={() => scrollToSection('pricing')}>Combo All in one</li>
          <li onClick={() => scrollToSection('faq')}>FAQ</li>
          <li onClick={() => window.open('https://help.tomoi.vn', '_blank')}>Hỗ trợ</li>
        </ul>
        <CTAButton onClick={() => scrollToSection('contact')}>Liên hệ ngay</CTAButton>
      </MobileMenu>
      
      <Overlay isOpen={mobileMenuOpen} onClick={() => {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'visible';
      }} />
    </>
  );
};

export default NavBar; 