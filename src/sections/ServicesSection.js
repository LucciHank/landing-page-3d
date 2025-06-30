import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LazyImage } from "../utils/lazyLoad";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--darkBg);
  padding: 5rem 0;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: var(--fontxxl);
  font-family: var(--fontL);
  text-transform: capitalize;
  color: var(--white);
  margin-bottom: 4rem;
  position: relative;
  z-index: 5;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: var(--primary);
  }

  @media screen and (max-width: 48em) {
    font-size: var(--fontxl);
  }
`;

const Container = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 5;
  
  @media screen and (max-width: 64em) {
    width: 90%;
  }
  
  @media screen and (max-width: 48em) {
    width: 95%;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  background: rgba(40, 40, 40, 0.6);
  padding: 0.5rem;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--white)' : 'var(--greyLight)'};
  border: none;
  border-radius: 30px;
  font-size: var(--fontxs);
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  margin: 0.3rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  letter-spacing: -0.3px;
  box-shadow: ${props => props.active ? '0 8px 20px rgba(223, 38, 38, 0.3)' : 'none'};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: all 0.6s ease;
    z-index: -1;
  }
  
  &:hover {
    color: var(--white);
    background-color: ${props => props.active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)'};
    transform: translateY(-3px);
    
    &:before {
      left: 100%;
    }
  }
`;

const ServicesContainer = styled.div`
  margin-top: 3rem;
  opacity: 0;
  transform: translateY(50px);
  width: 100%;
  overflow: visible;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
`;

const ServiceCard = styled.div`
  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 30px;
  padding: 3.5rem 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(223, 38, 38, 0.05), transparent);
    z-index: -1;
  }
  
  /* Light beam effect */
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    opacity: 0;
    transition: opacity 0.8s ease, transform 1.2s ease;
  }
  
  &:hover {
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5), 0 0 30px rgba(223, 38, 38, 0.2);
    border-color: rgba(255, 255, 255, 0.12);
    
    &::after {
      opacity: 1;
      transform: rotate(30deg) translateX(100%);
    }
  }
  
  @media screen and (max-width: 48em) {
    padding: 2.5rem 2rem;
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  
  @media screen and (max-width: 48em) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ServiceLogo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 2rem;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 15px;
    background-color: white;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  @media screen and (max-width: 48em) {
    margin-bottom: 1rem;
  }
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceTitle = styled.h3`
  font-size: var(--fontlg);
  color: var(--white);
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const ServiceDescription = styled.p`
  font-size: var(--fontxs);
  color: var(--greyLight);
  margin-top: 1rem;
  line-height: 1.6;
`;

const PriceTable = styled.div`
  width: 100%;
  overflow: visible;
  margin-top: 2rem;
`;

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns};
  grid-gap: 1.5rem;
  margin-bottom: 2rem;
  overflow: visible;

  @media screen and (max-width: 64em) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: 1.2rem;
  }
  
  @media screen and (max-width: 48em) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
  }
  
  @media screen and (max-width: 30em) {
    grid-template-columns: 1fr;
  }
`;

const PriceCard = styled.div`
  background: rgba(40, 40, 40, 0.6);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s ease;
  overflow: visible;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(225deg, rgba(223, 38, 38, 0.4) 0%, rgba(40, 40, 40, 0) 50%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }
  
  /* Light beam effect */
  &::after {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.03) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    opacity: 0;
    transition: opacity 0.8s ease, transform 1.2s ease;
    pointer-events: none;
  }
  
  &:hover {
    background: rgba(50, 50, 50, 0.8);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 25px rgba(223, 38, 38, 0.15);
    border-color: rgba(223, 38, 38, 0.15);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 1;
      transform: rotate(30deg) translateX(60%);
    }
  }
`;

const PlanName = styled.h4`
  font-size: var(--fontsm);
  color: var(--white);
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.3px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const OldPrice = styled.div`
  font-size: var(--fontxs);
  color: var(--greyLight);
  text-decoration: line-through;
  margin-bottom: 0.3rem;
`;

const PlanPrice = styled.div`
  font-size: var(--fontmd);
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const PlanDuration = styled.div`
  font-size: var(--fontxxs);
  color: var(--greyLight);
  margin-bottom: 0.5rem;
`;

const SavingBadge = styled.div`
  background-color: rgba(223, 38, 38, 0.2);
  color: var(--primary);
  font-size: var(--fontxxs);
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const PlanFeature = styled.li`
  font-size: var(--fontxxs);
  color: var(--greyLight);
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
  
  &::before {
    content: '✓';
    color: var(--primary);
    margin-right: 0.8rem;
    font-weight: bold;
  }
`;

const NetflixShowcaseContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 2rem 0;
  overflow: hidden;
  padding: 1rem 0;
  
  @media screen and (max-width: 48em) {
    padding: 0.5rem 0;
  }
`;

const NetflixShowcaseGrid = styled.div`
  display: flex;
  gap: 1rem;
  width: max-content;
  transition: transform 0.5s ease;
  will-change: transform;
  
  @media screen and (max-width: 48em) {
    gap: 0.8rem;
  }
`;

const ShowcaseItem = styled.div`
  width: 180px;
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: all 0.3s ease;
  
  @media screen and (max-width: 48em) {
    width: 150px;
    height: 210px;
  }
  
  @media screen and (max-width: 30em) {
    width: 120px;
    height: 170px;
  }
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 15px;
    padding: 1px;
    background: linear-gradient(225deg, rgba(223, 38, 38, 0.4) 0%, rgba(40, 40, 40, 0) 50%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
    pointer-events: none;
  }
  
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(223, 38, 38, 0.2);
    z-index: 2;
    
    &:before {
      opacity: 1;
    }
    
    img {
      transform: scale(1.05);
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
`;

const ShowcaseNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(223, 38, 38, 0.8);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: rgba(223, 38, 38, 1);
    transform: translateY(-50%) scale(1.1);
  }
  
  &.prev {
    left: 10px;
  }
  
  &.next {
    right: 10px;
  }
  
  i {
    font-size: 1.5rem;
  }
`;

const InstagramButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: white;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 2rem;
  font-size: var(--fontxs);
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  i {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
  
  &:hover {
    background-color: var(--primaryDark);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

// Thêm component mới cho nút chung
const CommonCTAButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: white;
  text-decoration: none;
  padding: 1.2rem 2.5rem;
  border-radius: 2rem;
  font-size: var(--fontsm);
  font-weight: 600;
  margin: 2.5rem auto 0;
  transition: all 0.3s ease;
  width: fit-content;
  letter-spacing: -0.3px;
  position: relative;
  overflow: hidden;
  border: none;
  
  i {
    margin-right: 0.8rem;
    font-size: 1.2rem;
    font-weight: normal;
    text-decoration: none !important;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
    z-index: 1;
  }
  
  &:hover {
    background-color: var(--primaryDark);
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    
    &::before {
      left: 100%;
    }
  }
`;

// Thêm styled components cho carousel
const OtherServicesTitle = styled.h3`
  font-size: var(--fontlg);
  color: var(--white);
  margin: 3rem 0 1.5rem;
  text-align: center;
`;

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top: 2rem;
  margin-bottom: 3rem;
  padding: 1.5rem 0;
  
  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }
  
  &:before {
    left: 0;
    background: linear-gradient(to right, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0));
  }
  
  &:after {
    right: 0;
    background: linear-gradient(to left, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0));
  }
  
  @media screen and (max-width: 48em) {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    
    &:before, &:after {
      width: 50px;
    }
  }
`;

const CarouselInner = styled.div`
  display: flex;
  animation: scrollX 60s linear infinite;
  width: max-content;
  
  @keyframes scrollX {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-200px * 10 - 1.5rem * 20));
    }
  }
  
  &:hover {
    animation-play-state: paused;
  }
  
  @media screen and (max-width: 48em) {
    @keyframes scrollX {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-160px * 10 - 1rem * 20));
      }
    }
  }
  
  @media screen and (max-width: 30em) {
    @keyframes scrollX {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-140px * 10 - 0.8rem * 20));
      }
    }
  }
`;

const CarouselItem = styled.div`
  min-width: 200px;
  height: 120px;
  margin: 0 1.5rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  background: rgba(35, 35, 35, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  
  @media screen and (max-width: 48em) {
    min-width: 160px;
    height: 100px;
    margin: 0 1rem;
  }
  
  @media screen and (max-width: 30em) {
    min-width: 140px;
    height: 90px;
    margin: 0 0.8rem;
  }
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(225deg, rgba(255, 255, 255, 0.2) 0%, rgba(40, 40, 40, 0) 50%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }
  
  &:hover {
    box-shadow: 
      0 15px 30px rgba(0, 0, 0, 0.25),
      0 0 20px rgba(255, 255, 255, 0.1);
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.15);
    
    &:before {
      opacity: 1;
    }
  }
`;

const AppLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  width: 100%;
  height: 100%;
  padding: 1rem;
  
  img {
    width: 45%;
    height: 45%;
    object-fit: contain;
    margin-bottom: 1rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    transition: transform 0.3s ease;
  }
  
  span {
    font-size: var(--fontxxs);
    color: var(--white);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;
    font-weight: 500;
    display: block;
    margin: 0 auto;
    letter-spacing: -0.01em;
    transition: color 0.3s ease;
  }
  
  &:hover {
    img {
      transform: scale(1.1);
    }
    
    span {
      color: var(--primary);
    }
  }
`;

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("netflix");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const servicesContainerRef = useRef(null);
  const netflixShowcaseRef = useRef(null);
  
  // Màu sắc cho các dịch vụ
  const colors = {
    netflix: "#df2626",
    spotify: "#1DB954",
    capcut: "#FF4C4C",
    youtube: "#FF0000",
    chatgpt: "#10A37F"
  };
  
  // Hot Netflix shows data
  const netflixShows = [
    { title: "Stranger Things", image: "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
    { title: "Money Heist", image: "https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_FMjpg_UX1000_.jpg" },
    { title: "Squid Game", image: "https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg" },
    { title: "Wednesday", image: "https://m.media-amazon.com/images/M/MV5BM2ZmMjEyZmYtOGM4YS00YTNhLWE3ZDMtNzQxM2RhNjBlODIyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg" },
    { title: "Bridgerton", image: "https://m.media-amazon.com/images/M/MV5BNjk4MDdhODctMmFhYi00ZTNhLThlN2UtN2NhZGY0OGFlMWEwXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" },
    { title: "The Witcher", image: "https://m.media-amazon.com/images/M/MV5BN2FiOWU4YzYtMzZiOS00MzcyLTlkOGEtOTgwZmEwMzAxMzA3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
    { title: "Peaky Blinders", image: "https://m.media-amazon.com/images/M/MV5BMTkzNjEzMDEzMF5BMl5BanBnXkFtZTgwMDI0MjE4MjE@._V1_.jpg" },
    { title: "Dark", image: "https://m.media-amazon.com/images/M/MV5BOTk2NzUyOTctZDdlMS00MDJlLTgzNTEtNzQzYjFhNjA0YjBjXkEyXkFqcGdeQXVyMjg1NDcxNDE@._V1_.jpg" },
    { title: "Black Mirror", image: "https://m.media-amazon.com/images/M/MV5BYTM3YWVhMDMtNjczMy00NGEyLWJhZDctYjNhMTRkNDE0ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" }
  ];

  // Tạo mảng phim với các phim được clone để loop liền mạch
  const extendedNetflixShows = [...netflixShows, ...netflixShows, ...netflixShows];

  // Thêm data cho các ứng dụng khác
  const otherApps = [
    { name: "Canva Pro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/2048px-Canva_icon_2021.svg.png" },
    { name: "Duolingo Plus", logo: "https://play-lh.googleusercontent.com/YmxGGcmJqGMfS1nZ9yMdgZ8-cU8mFHPfrfQcVAZEVyCjGBGRF9BhTnFPc0PirKVUQIQ" },
    { name: "Microsoft 365", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2048px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png" },
    { name: "Adobe Creative Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/2048px-Adobe_Creative_Cloud_rainbow_icon.svg.png" },
    { name: "Grammarly Premium", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Grammarly_logo_2022.svg/2048px-Grammarly_logo_2022.svg.png" },
    { name: "Disney+", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/2560px-Disney%2B_logo.svg.png" },
    { name: "Amazon Prime", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/2560px-Amazon_Prime_Logo.svg.png" },
    { name: "Apple Music", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Apple_Music_logo.svg/2048px-Apple_Music_logo.svg.png" },
    { name: "Tidal HiFi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Tidal_%28service%29_logo.svg/2560px-Tidal_%28service%29_logo.svg.png" },
    { name: "Zoom Pro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Zoom_Logo_2022.svg/2560px-Zoom_Logo_2022.svg.png" },
    { name: "Notion Pro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/2048px-Notion-logo.svg.png" },
    { name: "Midjourney", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Midjourney_Emblem.png/600px-Midjourney_Emblem.png" },
    { name: "Headspace", logo: "https://play-lh.googleusercontent.com/Ipz6PrFh9rd6mmkxJ3ykXTEVj0Qf2BcxRQOVNwlKKNTOFQDwxGp-8lNNZc5jJ-Qcjw" },
    { name: "Calm Premium", logo: "https://play-lh.googleusercontent.com/EoiTA0z1LdQHV1xVJH8j2HuM0Bb_5-LL8xKiqYGpgUEFsN-L3MKwl1q6WvC9UHwZHw" },
    { name: "Tinder Gold", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Tinder_logo.svg/2560px-Tinder_logo.svg.png" },
    { name: "Bumble Premium", logo: "https://play-lh.googleusercontent.com/Qdr7Y0hn3xvRvEAkZvoMxP9dHbLOPpTWwbS-vNIGgxQBHlZMxJRR8G8ZhWxR3Qr5Ag" },
    { name: "ExpressVPN", logo: "https://play-lh.googleusercontent.com/lk8O9n6LwFUxADmJ7ZdC5GNiOcXwzLHGfzDOXYnIZuWsJJgG_2JJa6bOZ3VB5HWBtao" },
    { name: "NordVPN", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/NordVPN_logo.svg/1200px-NordVPN_logo.svg.png" },
    { name: "Surfshark", logo: "https://play-lh.googleusercontent.com/T1_WHAGs5WZePQjAZZLMLvAXXGzlPtCiQJbMYd-YxhNVQDWVT0ssscwm3AEbKBYMvfqO" },
    { name: "Evernote Premium", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Evernote_Icon.png/600px-Evernote_Icon.png" }
  ];

  useLayoutEffect(() => {
    // Animation for title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );

    // Animation for services container
    gsap.to(servicesContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: servicesContainerRef.current,
        start: "top 80%",
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Service data
  const services = {
    netflix: {
      logo: "https://cdn-icons-png.flaticon.com/512/5977/5977589.png",
      title: "Netflix Premium",
      description: "Truy cập toàn bộ thư viện phim và series Netflix với chất lượng 4K. Xem các nội dung độc quyền trên Netflix mà không bị làm phiền bởi quảng cáo.",
      plans: [
        {
          name: "Gói tiết kiệm",
          price: "45,000",
          oldPrice: "70,000",
          saving: "35",
          duration: "VNĐ / tháng",
          features: [
            "Tiết kiệm 35% chi phí hàng tháng",
            "Trải nghiệm hơn 10.000+ phim và series",
            "Hỗ trợ cài đặt và sử dụng dễ dàng",
            "Bảo hành và hỗ trợ 24/7"
          ]
        },
        {
          name: "Gói riêng tư",
          price: "65,000",
          oldPrice: "130,000",
          saving: "50",
          duration: "VNĐ / tháng",
          features: [
            "Profile riêng tư 100% cho bạn",
            "Tùy chỉnh không giới hạn profile của bạn",
            "Bảo mật cao với mã PIN cá nhân",
            "Đa thiết bị - xem trên TV, điện thoại, máy tính"
          ]
        }
      ],
      showHotTitles: true
    },
    spotify: {
      logo: "https://cdn-icons-png.flaticon.com/512/2111/2111624.png",
      title: "Spotify Premium",
      description: "Thưởng thức âm nhạc chất lượng cao không giới hạn, không quảng cáo và có thể tải nhạc để nghe offline. Truy cập vào các tính năng độc quyền của Spotify Premium.",
      plans: [
        {
          name: "Gói 1 tháng",
          price: "39,000",
          oldPrice: "59,000",
          saving: "33",
          duration: "VNĐ",
          features: [
            "Âm thanh chất lượng cao lên tới 320kbps", 
            "Tùy chọn tải nhạc nghe offline không giới hạn", 
            "Trải nghiệm nhạc không gián đoạn bởi quảng cáo",
            "Nghe bài hát theo đúng ý bạn - bỏ qua bài hát vô hạn"
          ]
        },
        {
          name: "Gói 3 tháng",
          price: "99,000",
          oldPrice: "177,000",
          saving: "44",
          duration: "VNĐ",
          features: [
            "Tiết kiệm 44% so với giá gốc",
            "Âm thanh chất lượng cao lên tới 320kbps", 
            "Tùy chọn tải nhạc nghe offline không giới hạn", 
            "Trải nghiệm nhạc không gián đoạn bởi quảng cáo"
          ]
        },
        {
          name: "Gói 6 tháng",
          price: "179,000",
          oldPrice: "354,000",
          saving: "49",
          duration: "VNĐ",
          features: [
            "Tiết kiệm 49% - chỉ từ 30K/tháng",
            "Âm thanh chất lượng cao lên tới 320kbps", 
            "Tùy chọn tải nhạc nghe offline không giới hạn", 
            "Trải nghiệm nhạc không gián đoạn bởi quảng cáo"
          ]
        },
        {
          name: "Gói 1 năm",
          price: "299,000",
          oldPrice: "708,000",
          saving: "58",
          duration: "VNĐ",
          features: [
            "Tiết kiệm tối đa 58% - chỉ từ 25K/tháng",
            "Âm thanh chất lượng cao lên tới 320kbps", 
            "Tùy chọn tải nhạc nghe offline không giới hạn", 
            "Trải nghiệm nhạc không gián đoạn bởi quảng cáo"
          ]
        }
      ]
    },
    capcut: {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/CapCut_logo.svg/2048px-CapCut_logo.svg.png",
      title: "CapCut Pro",
      description: "Phần mềm chỉnh sửa video chuyên nghiệp với các tính năng cao cấp như xóa nền, hiệu ứng đặc biệt và công cụ chỉnh sửa tiên tiến.",
      plans: [
        {
          name: "Gói chính chủ 7 ngày",
          price: "20,000",
          oldPrice: "35,000",
          saving: "42",
          duration: "VNĐ",
          features: [
            "Trải nghiệm đầy đủ tính năng Pro trong 7 ngày",
            "Xóa watermark khỏi các video của bạn",
            "Sử dụng trên 5 thiết bị cùng lúc",
            "Kho hiệu ứng và template cao cấp không giới hạn"
          ]
        },
        {
          name: "Gói chính chủ 1 tháng",
          price: "45,000",
          oldPrice: "90,000",
          saving: "50",
          duration: "VNĐ",
          features: [
            "Tiết kiệm 50% chi phí so với giá gốc",
            "Xóa watermark khỏi các video của bạn",
            "Kho hiệu ứng và template cao cấp không giới hạn",
            "Hỗ trợ xuất video chất lượng cao lên tới 4K"
          ]
        },
        {
          name: "Gói chính chủ 6 tháng",
          price: "349,000",
          oldPrice: "540,000",
          saving: "35",
          duration: "VNĐ",
          features: [
            "Tiết kiệm 35% - chỉ từ 58K/tháng",
            "Sử dụng đa nền tảng (iOS, Android, PC)",
            "Thư viện nhạc bản quyền và hiệu ứng âm thanh Pro",
            "Công nghệ AI thông minh để tăng cường chất lượng video"
          ]
        },
        {
          name: "Gói chính chủ 1 năm",
          price: "599,000",
          oldPrice: "1,080,000",
          saving: "45",
          duration: "VNĐ",
          features: [
            "Tiết kiệm tối đa 45% - chỉ từ 50K/tháng",
            "Sử dụng đa nền tảng (iOS, Android, PC)",
            "Thư viện nhạc bản quyền và hiệu ứng âm thanh Pro",
            "Công nghệ AI thông minh để tăng cường chất lượng video"
          ]
        },
        {
          name: "Gói share 1 năm",
          price: "199,000",
          oldPrice: "399,000",
          saving: "50",
          duration: "VNĐ",
          features: [
            "Tiết kiệm tối đa - chỉ 16K/tháng",
            "Sử dụng trên 1 thiết bị theo lựa chọn",
            "Xóa watermark khỏi các video của bạn",
            "Bảo hành và hỗ trợ trong suốt thời gian sử dụng"
          ]
        }
      ]
    },
    youtube: {
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968517.png",
      title: "YouTube Premium",
      description: "Xem YouTube không quảng cáo, phát trong nền, tải xuống video và truy cập YouTube Music Premium. Trải nghiệm YouTube tuyệt vời nhất.",
      plans: [
        {
          name: "Gói 1 tháng",
          price: "39,000",
          oldPrice: "79,000",
          saving: "50",
          duration: "VNĐ",
          features: [
            "Tiết kiệm 50% chi phí so với giá gốc",
            "Xem video không bị gián đoạn bởi quảng cáo",
            "Phát trong nền khi sử dụng ứng dụng khác",
            "Tải video để xem offline khi không có mạng"
          ]
        },
        {
          name: "Gói 3 tháng",
          price: "99,000",
          oldPrice: "237,000",
          saving: "58",
          duration: "VNĐ",
          features: [
            "Tiết kiệm 58% - chỉ từ 33K/tháng",
            "Truy cập YouTube Music Premium miễn phí",
            "Chất lượng video cao nhất lên đến 4K HDR",
            "Hỗ trợ đa thiết bị (TV, điện thoại, máy tính)"
          ]
        },
        {
          name: "Gói 6 tháng",
          price: "179,000",
          oldPrice: "474,000",
          saving: "62",
          duration: "VNĐ",
          features: [
            "Tiết kiệm 62% - chỉ từ 30K/tháng",
            "Truy cập YouTube Music Premium miễn phí",
            "Chất lượng video cao nhất lên đến 4K HDR",
            "Tải không giới hạn nhạc và video để xem offline"
          ]
        },
        {
          name: "Gói 1 năm",
          price: "299,000",
          oldPrice: "948,000",
          saving: "68",
          duration: "VNĐ",
          features: [
            "Tiết kiệm tối đa 68% - chỉ từ 25K/tháng",
            "Truy cập YouTube Music Premium miễn phí",
            "Tắt quảng cáo trên mọi nội dung YouTube",
            "Bảo hành trọn đời trong suốt thời gian sử dụng"
          ]
        }
      ]
    },
    chatgpt: {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png",
      title: "ChatGPT Plus",
      description: "Truy cập ưu tiên vào ChatGPT kể cả trong giờ cao điểm, phản hồi nhanh hơn và sử dụng các mô hình AI tiên tiến như GPT-4.",
      plans: [
        {
          name: "Gói Share (3 người dùng chung)",
          price: "149,000",
          oldPrice: "350,000",
          saving: "57",
          duration: "VNĐ / tháng",
          features: [
            "Tiết kiệm 57% so với giá gốc - chỉ 50K/người",
            "Truy cập GPT-4 - mô hình AI tiên tiến nhất hiện nay", 
            "Truy cập thông tin internet thời gian thực",
            "Phản hồi nhanh chóng - không bị giới hạn lượt dùng"
          ]
        },
        {
          name: "Gói Chính chủ",
          price: "349,000",
          oldPrice: "590,000",
          saving: "40",
          duration: "VNĐ / tháng",
          features: [
            "Tài khoản cá nhân 100% - không chia sẻ với ai", 
            "Truy cập GPT-4 và GPT-4o mới nhất",
            "API tích hợp với các ứng dụng khác",
            "Ưu tiên cao nhất - không bao giờ bị lỗi máy chủ"
          ]
        }
      ]
    }
  };

  const activeService = services[activeTab];
  
  const getGridColumns = (length) => {
    if (length <= 2) return "repeat(2, 1fr)";
    if (length <= 4) return "repeat(4, 1fr)";
    return "repeat(5, 1fr)";
  };

  // Hàm xử lý điều hướng phim Netflix cải tiến
  const handleNetflixScroll = (direction) => {
    if (isScrolling) return; // Tránh scroll liên tục
    
    setIsScrolling(true);
    
    const container = netflixShowcaseRef.current;
    const itemWidth = 180 + 16; // width + gap
    const totalItems = netflixShows.length;
    
    // Điều chỉnh kích thước item dựa trên kích thước màn hình
    const mobileView = window.innerWidth <= 768;
    const smallMobileView = window.innerWidth <= 480;
    
    const adjustedItemWidth = smallMobileView ? 120 + 12 : (mobileView ? 150 + 14 : 180 + 16);
    
    let newPosition;
    if (direction === 'next') {
      newPosition = scrollPosition + 1;
      
      if (newPosition >= totalItems * 2) {
        // Nếu đã đến cuối phần clone thứ 2, quay về đầu phần clone thứ 1 (không phải đầu thật)
        setTimeout(() => {
          container.style.transition = 'none';
          setScrollPosition(totalItems);
          container.style.transform = `translateX(-${totalItems * adjustedItemWidth}px)`;
          
          setTimeout(() => {
            container.style.transition = 'transform 0.5s ease';
            setIsScrolling(false);
          }, 50);
        }, 500);
      } else {
        setTimeout(() => setIsScrolling(false), 500);
      }
    } else {
      newPosition = scrollPosition - 1;
      
      if (newPosition < 0) {
        // Nếu đã đến đầu phần clone đầu tiên, quay về cuối phần clone đầu tiên
        setTimeout(() => {
          container.style.transition = 'none';
          setScrollPosition(totalItems - 1);
          container.style.transform = `translateX(-${(totalItems - 1) * adjustedItemWidth}px)`;
          
          setTimeout(() => {
            container.style.transition = 'transform 0.5s ease';
            setIsScrolling(false);
          }, 50);
        }, 500);
      } else {
        setTimeout(() => setIsScrolling(false), 500);
      }
    }
    
    setScrollPosition(newPosition);
    container.style.transition = 'transform 0.5s ease';
    container.style.transform = `translateX(-${newPosition * adjustedItemWidth}px)`;
  };

  // Thiết lập vị trí ban đầu cho carousel
  useEffect(() => {
    if (netflixShowcaseRef.current) {
      // Bắt đầu từ bộ phim đầu tiên của phần clone thứ nhất
      const itemWidth = window.innerWidth <= 480 ? 120 + 12 : (window.innerWidth <= 768 ? 150 + 14 : 180 + 16);
      setScrollPosition(netflixShows.length);
      netflixShowcaseRef.current.style.transition = 'none';
      netflixShowcaseRef.current.style.transform = `translateX(-${netflixShows.length * itemWidth}px)`;
      
      // Thêm transition sau khi đã đặt vị trí ban đầu
      setTimeout(() => {
        if (netflixShowcaseRef.current) {
          netflixShowcaseRef.current.style.transition = 'transform 0.5s ease';
        }
      }, 100);
    }
  }, [activeTab]);

  // Render phần Netflix showcase
  const renderNetflixShowcase = () => (
    <>
      <ServiceTitle style={{ marginTop: "3rem" }}>Các phim hot hiện có trên Netflix</ServiceTitle>
      <NetflixShowcaseContainer>
        <ShowcaseNavButton className="prev" onClick={() => handleNetflixScroll('prev')}>
          <i className="fas fa-chevron-left"></i>
        </ShowcaseNavButton>
        
        <NetflixShowcaseGrid ref={netflixShowcaseRef}>
          {extendedNetflixShows.map((show, index) => (
            <ShowcaseItem key={`netflix-${index}`}>
              <LazyImage src={show.image} alt={show.title} />
            </ShowcaseItem>
          ))}
        </NetflixShowcaseGrid>
        
        <ShowcaseNavButton className="next" onClick={() => handleNetflixScroll('next')}>
          <i className="fas fa-chevron-right"></i>
        </ShowcaseNavButton>
      </NetflixShowcaseContainer>
    </>
  );

  return (
    <Section id="services" ref={sectionRef}>
      <Title ref={titleRef}>Dịch Vụ Premium</Title>
      
      <Container>
        <TabsContainer>
          <TabButton 
            active={activeTab === "netflix"} 
            onClick={() => setActiveTab("netflix")}
          >
            Netflix
          </TabButton>
          <TabButton 
            active={activeTab === "spotify"} 
            onClick={() => setActiveTab("spotify")}
          >
            Spotify
          </TabButton>
          <TabButton 
            active={activeTab === "capcut"} 
            onClick={() => setActiveTab("capcut")}
          >
            CapCut Pro
          </TabButton>
          <TabButton 
            active={activeTab === "youtube"} 
            onClick={() => setActiveTab("youtube")}
          >
            YouTube Premium
          </TabButton>
          <TabButton 
            active={activeTab === "chatgpt"} 
            onClick={() => setActiveTab("chatgpt")}
          >
            ChatGPT Plus
          </TabButton>
        </TabsContainer>
        
        <ServicesContainer ref={servicesContainerRef}>
          <ServiceCard>
            <ServiceHeader>
              <ServiceLogo>
                <img src={activeService.logo} alt={activeService.title} />
              </ServiceLogo>
              <ServiceInfo>
                <ServiceTitle>{activeService.title}</ServiceTitle>
                <ServiceDescription>{activeService.description}</ServiceDescription>
              </ServiceInfo>
            </ServiceHeader>
            
            <PriceTable>
              <PriceGrid columns={getGridColumns(activeService.plans.length)}>
                {activeService.plans.map((plan, index) => (
                  <PriceCard key={index}>
                    <PlanName>{plan.name}</PlanName>
                    <PriceContainer>
                      <OldPrice>{plan.oldPrice}đ</OldPrice>
                      <PlanPrice>{plan.price}</PlanPrice>
                      <PlanDuration>{plan.duration}</PlanDuration>
                      <SavingBadge>Tiết kiệm {plan.saving}%</SavingBadge>
                    </PriceContainer>
                    <PlanFeatures>
                      {plan.features.map((feature, idx) => (
                        <PlanFeature key={idx}>{feature}</PlanFeature>
                      ))}
                    </PlanFeatures>
                  </PriceCard>
                ))}
              </PriceGrid>
            </PriceTable>
            
            {activeTab === "netflix" && renderNetflixShowcase()}
            
            <CommonCTAButton 
              href="https://www.instagram.com/tomoivn/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i> Liên hệ mua hàng ngay
            </CommonCTAButton>
          </ServiceCard>
          
          <ServiceDescription style={{ textAlign: "center", marginTop: "2rem" }}>
            Ngoài các dịch vụ trên, chúng tôi còn cung cấp hơn 500+ ứng dụng Premium khác.
          </ServiceDescription>
          
          <OtherServicesTitle>Và hơn 500 ứng dụng Premium khác</OtherServicesTitle>
          <CarouselContainer>
            <CarouselInner>
              {otherApps.concat(otherApps).map((app, index) => (
                <CarouselItem key={`app-${index}`}>
                  <AppLogo>
                    <img src={app.logo} alt={app.name} />
                    <span>{app.name}</span>
                  </AppLogo>
                </CarouselItem>
              ))}
            </CarouselInner>
          </CarouselContainer>
        </ServicesContainer>
      </Container>
    </Section>
  );
};

export default ServicesSection; 