import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import backgroundVideo from "../assets/video/Ink - 21536.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--darkBg);
  overflow: hidden;
  id: "hero";
`;

const VideoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: center;
    opacity: 0.5;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 80%);
  z-index: 1;
`;

const Content = styled.div`
  width: 80%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: var(--fontBig);
  font-family: var(--fontL);
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--redGradient));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(30px);

  @media screen and (max-width: 70em) {
    font-size: var(--fontxxxl);
  }

  @media screen and (max-width: 48em) {
    font-size: var(--fontxxl);
  }

  @media screen and (max-width: 30em) {
    font-size: var(--fontxl);
  }
`;

const SubText = styled.h2`
  font-size: var(--fontlg);
  font-family: var(--fontL);
  text-align: center;
  width: 80%;
  color: var(--white);
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(30px);

  @media screen and (max-width: 48em) {
    font-size: var(--fontmd);
    width: 90%;
  }
`;

const ServiceLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 1rem 0 2rem;
  opacity: 0;
  transform: translateY(30px);

  img {
    height: 40px;
    filter: grayscale(100%) brightness(1.5);
    transition: all 0.3s ease;
    
    &:hover {
      filter: grayscale(0%) brightness(1);
      transform: scale(1.1);
    }
  }

  @media screen and (max-width: 48em) {
    gap: 1rem;
    flex-wrap: wrap;
    
    img {
      height: 30px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  opacity: 0;
  transform: translateY(30px);

  @media screen and (max-width: 48em) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Button = styled.a`
  background-color: var(--primary);
  color: var(--white);
  font-size: var(--fontsm);
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 2;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
    z-index: -1;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &.secondary {
    background-color: transparent;
    border: 2px solid var(--primary);
    color: var(--primary);

    &:hover {
      background-color: var(--primary);
      color: var(--white);
    }
  }

  i {
    margin-right: 0.5rem;
  }
`;

const FloatingBadge = styled.div`
  position: absolute;
  top: 25%;
  right: 10%;
  background-color: rgba(223, 38, 38, 0.9);
  color: white;
  padding: 1rem;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  transform: rotate(12deg);
  font-size: var(--fontxs);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  animation: float 4s infinite ease-in-out;

  @keyframes float {
    0% {
      transform: rotate(12deg) translateY(0px);
    }
    50% {
      transform: rotate(12deg) translateY(-15px);
    }
    100% {
      transform: rotate(12deg) translateY(0px);
    }
  }

  @media screen and (max-width: 48em) {
    width: 80px;
    height: 80px;
    font-size: var(--fontxxs);
    top: 30%;
  }
`;

const ScrollDown = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white);
  font-size: var(--fontxs);
  opacity: 0;

  span {
    display: block;
    margin-bottom: 0.5rem;
  }

  .arrow {
    border: 2px solid var(--white);
    width: 1.5rem;
    height: 1.5rem;
    border-left: none;
    border-top: none;
    transform: rotate(45deg);
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: rotate(45deg) translateY(0);
    }
    40% {
      transform: rotate(45deg) translateY(-10px);
    }
    60% {
      transform: rotate(45deg) translateY(-5px);
    }
  }
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
`;

const CountdownValue = styled.div`
  font-size: var(--fontlg);
  font-weight: 700;
  color: var(--white);
  background: rgba(223, 38, 38, 0.2);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  min-width: 60px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(223, 38, 38, 0.3);
`;

const CountdownLabel = styled.div`
  font-size: var(--fontxs);
  color: var(--greyLight);
  margin-top: 0.5rem;
`;

const UrgencyText = styled.p`
  font-size: var(--fontxs);
  color: var(--primary);
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 600;
  opacity: 0;
  transform: translateY(30px);
`;

const HeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtextRef = useRef(null);
  const logosRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgeRef = useRef(null);
  const scrollDownRef = useRef(null);
  const urgencyRef = useRef(null);
  
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Đồng hồ đếm ngược với localStorage
  useEffect(() => {
    // Kiểm tra xem có thời gian kết thúc trong localStorage không
    let endTime = localStorage.getItem('countdownEndTime');
    
    // Nếu không có hoặc thời gian đã hết, tạo thời gian mới (2 ngày từ hiện tại)
    if (!endTime || new Date(parseInt(endTime)) <= new Date()) {
      endTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000; // 2 ngày
      localStorage.setItem('countdownEndTime', endTime);
    }
    
    // Cập nhật đồng hồ đếm ngược mỗi giây
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = parseInt(endTime) - now;
      
      // Nếu đã hết thời gian
      if (distance < 0) {
        clearInterval(timer);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      // Tính toán ngày, giờ, phút, giây
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out"
    }).to(subtextRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out"
    }, "-=0.5").to(logosRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out"
    }, "-=0.5").to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out"
    }, "-=0.5").to(badgeRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.5").to(scrollDownRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.3");

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Section id="hero" ref={sectionRef}>
      <VideoContainer>
        <video src={backgroundVideo} type="video/mp4" autoPlay muted loop />
      </VideoContainer>
      <Overlay />
      
      <Content>
        <Title ref={titleRef}>Premium Không Giới Hạn</Title>
        <SubText ref={subtextRef}>
          Trải nghiệm 500+ dịch vụ cao cấp với chi phí tiết kiệm đến 80%
        </SubText>
        
        <ServiceLogos ref={logosRef}>
          <img src="https://cdn-icons-png.flaticon.com/512/5977/5977589.png" alt="Netflix Premium" />
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111624.png" alt="Spotify Premium" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png" alt="ChatGPT Plus" />
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png" alt="YouTube Premium" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/CapCut_logo.svg/2048px-CapCut_logo.svg.png" alt="CapCut Pro" />
        </ServiceLogos>
        
        <CountdownContainer>
          <CountdownItem>
            <CountdownValue>{countdown.days}</CountdownValue>
            <CountdownLabel>Ngày</CountdownLabel>
          </CountdownItem>
          <CountdownItem>
            <CountdownValue>{countdown.hours}</CountdownValue>
            <CountdownLabel>Giờ</CountdownLabel>
          </CountdownItem>
          <CountdownItem>
            <CountdownValue>{countdown.minutes}</CountdownValue>
            <CountdownLabel>Phút</CountdownLabel>
          </CountdownItem>
          <CountdownItem>
            <CountdownValue>{countdown.seconds}</CountdownValue>
            <CountdownLabel>Giây</CountdownLabel>
          </CountdownItem>
        </CountdownContainer>
        
        <UrgencyText ref={urgencyRef}>
          Ưu đãi giảm 30% số lượng có hạn - Nhanh tay kẻo lỡ!
        </UrgencyText>
        
        <ButtonContainer ref={buttonsRef}>
          <Button 
            href="https://www.instagram.com/tomoi.vn/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i> Liên hệ ngay
          </Button>
          <Button 
            href="#pricing" 
            className="secondary" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
            }}
          >
            Xem gói dịch vụ
          </Button>
        </ButtonContainer>
      </Content>

      <FloatingBadge ref={badgeRef}>
        Ưu đãi giới hạn<br />Giảm 30%
      </FloatingBadge>

      <ScrollDown ref={scrollDownRef}>
        <span>Cuộn xuống</span>
        <div className="arrow"></div>
      </ScrollDown>
    </Section>
  );
};

export default HeroSection;
