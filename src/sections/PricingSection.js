import React, { useRef, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  margin-bottom: 1rem;
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

const Subtitle = styled.p`
  font-size: var(--fontxs);
  color: var(--greyLight);
  text-align: center;
  max-width: 600px;
  margin: 1.5rem auto 3rem;
  font-style: italic;
`;

const Container = styled.div`
  width: 80%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 5;

  @media screen and (max-width: 64em) {
    width: 90%;
  }
`;

const PricingToggle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 50px;
`;

const ToggleOption = styled.button`
  background: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--white)' : 'var(--greyLight)'};
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: var(--fontxs);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--white);
  }
`;

const PricingCardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
  opacity: 0;
  transform: translateY(50px);

  @media screen and (max-width: 64em) {
    flex-direction: column;
    align-items: center;
  }
`;

const PricingCard = styled.div`
  width: 350px;
  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: ${props => props.popular ? '0 0 30px rgba(223, 38, 38, 0.5)' : '0 10px 30px rgba(0, 0, 0, 0.2)'};
  border: ${props => props.popular ? '2px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.05)'};
  position: relative;
  transition: all 0.3s ease;
  transform: ${props => props.popular ? 'scale(1.05)' : 'scale(1)'};
  
  &:hover {
    transform: ${props => props.popular ? 'scale(1.1)' : 'scale(1.05)'};
  }

  @media screen and (max-width: 48em) {
    width: 100%;
    max-width: 350px;
    margin-bottom: 2rem;
    transform: scale(1);
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const PopularTag = styled.div`
  position: absolute;
  top: -15px;
  background: var(--primary);
  color: var(--white);
  font-size: var(--fontxxs);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: bold;
`;

const CardTitle = styled.h3`
  font-size: var(--fontlg);
  color: var(--white);
  margin-bottom: 1rem;
`;

const PriceContainer = styled.div`
  margin: 1.5rem 0;
`;

const Price = styled.h4`
  font-size: var(--fontxxl);
  color: var(--white);
  margin-bottom: 0.5rem;
  
  span {
    font-size: var(--fontxs);
    color: var(--greyLight);
    vertical-align: super;
  }
`;

const OldPrice = styled.h4`
  font-size: var(--fontxl);
  color: var(--greyLight);
  margin-bottom: 0.5rem;
  text-decoration: line-through;
  opacity: 0.7;
  
  span {
    font-size: var(--fontxs);
    color: var(--greyLight);
    vertical-align: super;
  }
`;

const SavingBadge = styled.div`
  background: var(--primary);
  color: var(--white);
  font-size: var(--fontxs);
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  margin: 0.5rem auto;
  display: inline-block;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(223, 38, 38, 0.3);
`;

const Duration = styled.p`
  font-size: var(--fontxxs);
  color: var(--greyLight);
`;

const FeaturesList = styled.ul`
  list-style: none;
  margin: 2rem 0;
  width: 100%;
  text-align: left;
`;

const Feature = styled.li`
  font-size: var(--fontxs);
  color: var(--greyLight);
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &::before {
    content: '✓';
    color: ${props => props.highlight ? 'var(--primary)' : 'var(--greyLight)'};
    margin-right: 0.8rem;
    font-weight: bold;
  }
`;

const CTAButton = styled.a`
  width: 100%;
  background: ${props => props.popular ? 'var(--primary)' : 'transparent'};
  color: ${props => props.popular ? 'var(--white)' : 'var(--primary)'};
  border: 2px solid var(--primary);
  padding: 1rem;
  font-size: var(--fontxs);
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 2;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

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
    background: ${props => props.popular ? 'var(--primaryDark)' : 'var(--primary)'};
    color: var(--white);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  i {
    margin-right: 0.5rem;
  }
`;

const TrustSection = styled.div`
  width: 100%;
  margin-top: 8rem;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(223, 38, 38, 0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`;

const TrustTitle = styled.h2`
  font-size: var(--fontxxl);
  font-family: var(--fontL);
  text-transform: capitalize;
  color: var(--white);
  text-align: center;
  margin-bottom: 3.5rem;
  position: relative;
  
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

const TrustBlocksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  @media screen and (max-width: 64em) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media screen and (max-width: 48em) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TrustStat = styled.div`
  font-size: var(--fontxxl);
  color: var(--primary);
  font-weight: 700;
  text-align: center;
  margin: 0.5rem 0 1.5rem;
  position: relative;
  display: inline-block;
  transition: transform 0.3s ease;
  text-shadow: 0 2px 10px rgba(223, 38, 38, 0.3);
  letter-spacing: -0.02em;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary);
    opacity: 0.3;
  }
`;

const TrustBlock = styled.div`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(225deg, rgba(255, 255, 255, 0.1) 0%, rgba(40, 40, 40, 0) 50%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
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
    z-index: 0;
  }
  
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 25px rgba(223, 38, 38, 0.15);
    border-color: rgba(223, 38, 38, 0.15);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 1;
      transform: rotate(30deg) translateX(60%);
    }
    
    ${TrustStat} {
      transform: scale(1.05);
    }
  }
`;

const TrustIcon = styled.div`
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
  background: rgba(223, 38, 38, 0.08);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(223, 38, 38, 0.15);
`;

const TrustBlockTitle = styled.h3`
  font-size: var(--fontmd);
  color: var(--white);
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
  position: relative;
  z-index: 1;
`;

const TrustBlockText = styled.p`
  font-size: var(--fontxs);
  color: var(--greyLight);
  line-height: 1.7;
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const TrustExample = styled.div`
  background: rgba(223, 38, 38, 0.1);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      font-size: var(--fontxxs);
      color: var(--white);
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      
      &:last-child {
        border-bottom: none;
      }
      
      &::before {
        content: '✓';
        color: var(--primary);
        margin-right: 0.5rem;
        font-weight: bold;
      }
    }
  }
`;

const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: radial-gradient(ellipse at center, rgba(223, 38, 38, 0.05) 0%, transparent 70%);
  pointer-events: none;
`;

const PricingSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const trustRef = useRef(null);
  const [billingPeriod, setBillingPeriod] = useState('tietsave'); // 'tietsave' or 'private'

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

    // Animation for pricing cards container
    gsap.to(cardsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%",
      }
    });

    // Animation for trust blocks
    gsap.to(trustRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trustRef.current,
        start: "top 80%",
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const pricingPlans = {
    tietsave: [
      {
        title: "Học tập & Làm việc",
        price: "199,000",
        oldPrice: "299,000",
        saving: "33",
        duration: "VNĐ/tháng",
        features: [
          { text: "ChatGPT Plus 1 tháng (slot 1 thiết bị)", highlight: true },
          { text: "Google Drive 400GB 1 tháng (chính chủ)", highlight: true },
          { text: "Gemini Pro 1 tháng (chính chủ)", highlight: true },
        ],
        popular: false
      },
      {
        title: "Giải trí",
        price: "99,000",
        oldPrice: "145,000",
        saving: "32",
        duration: "VNĐ/tháng",
        features: [
          { text: "Netflix Premium 1 tháng (Slot Tiết kiệm)", highlight: true },
          { text: "Spotify Premium 1 tháng (chính chủ)", highlight: true },
          { text: "YouTube Premium 1 tháng (chính chủ)", highlight: true },
        ],
        popular: true
      },
      {
        title: "Thiết kế & Chỉnh sửa",
        price: "129,000",
        oldPrice: "199,000",
        saving: "35",
        duration: "VNĐ/tháng",
        features: [
          { text: "Capcut Pro 1 tháng (slot 1 thiết bị)", highlight: true },
          { text: "Canva Pro 1 tháng (slot 1 thiết bị)", highlight: true },
          { text: "Picsart Pro 1 tháng (chính chủ)", highlight: true },
        ],
        popular: false
      }
    ],
    private: [
      {
        title: "Học tập & Làm việc",
        price: "399,000",
        oldPrice: "529,000",
        saving: "25",
        duration: "VNĐ/tháng",
        features: [
          { text: "ChatGPT Plus 1 tháng (chính chủ)", highlight: true },
          { text: "Google Drive 400GB 1 tháng (chính chủ)", highlight: true },
          { text: "Gemini Pro 1 tháng (chính chủ)", highlight: true },
        ],
        popular: false
      },
      {
        title: "Giải trí",
        price: "129,000",
        oldPrice: "185,000",
        saving: "30",
        duration: "VNĐ/tháng",
        features: [
          { text: "Netflix Premium 1 tháng (Slot Riêng tư)", highlight: true },
          { text: "Spotify Premium 1 tháng (chính chủ)", highlight: true },
          { text: "YouTube Premium 1 tháng (chính chủ)", highlight: true },
        ],
        popular: true
      },
      {
        title: "Thiết kế & Chỉnh sửa",
        price: "149,000",
        oldPrice: "199,000",
        saving: "25",
        duration: "VNĐ/tháng",
        features: [
          { text: "Capcut Pro 1 tháng (chính chủ)", highlight: true },
          { text: "Canva Pro 1 tháng (chính chủ)", highlight: true },
          { text: "Picsart Pro 1 tháng (chính chủ)", highlight: true },
        ],
        popular: false
      }
    ]
  };

  return (
    <Section id="pricing" ref={sectionRef}>
      <Title ref={titleRef}>Combo "All in one"</Title>
      <Subtitle>Có thể đổi các sản phẩm có giá trị tương đương hoặc chọn lựa combo theo cá nhân</Subtitle>
      
      <Container>
        <PricingToggle>
          <ToggleOption 
            active={billingPeriod === 'tietsave'} 
            onClick={() => setBillingPeriod('tietsave')}
          >
            Tiết kiệm
          </ToggleOption>
          <ToggleOption 
            active={billingPeriod === 'private'} 
            onClick={() => setBillingPeriod('private')}
          >
            Riêng tư
          </ToggleOption>
        </PricingToggle>
        
        <PricingCardsContainer ref={cardsRef}>
          {pricingPlans[billingPeriod].map((plan, index) => (
            <PricingCard key={index} popular={plan.popular}>
              {plan.popular && <PopularTag>Phổ biến nhất</PopularTag>}
              <CardTitle>{plan.title}</CardTitle>
              <PriceContainer>
                <Price>{plan.price}<span>đ</span></Price>
                <OldPrice>{plan.oldPrice}đ</OldPrice>
                <SavingBadge>Tiết kiệm {plan.saving}%</SavingBadge>
                <Duration>{plan.duration}</Duration>
              </PriceContainer>
              <FeaturesList>
                {plan.features.map((feature, idx) => (
                  <Feature key={idx} highlight={feature.highlight}>{feature.text}</Feature>
                ))}
              </FeaturesList>
              <CTAButton 
                popular={plan.popular} 
                href="https://www.instagram.com/tomoivn/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Mua ngay
              </CTAButton>
            </PricingCard>
          ))}
        </PricingCardsContainer>
      </Container>
      
      <TrustSection ref={trustRef}>
        <TrustTitle>Giá trị khác biệt từ TomOi.vn</TrustTitle>
        
        <TrustBlocksContainer>
          <TrustBlock>
            <TrustIcon>
              <i className="fas fa-shield-alt"></i>
            </TrustIcon>
            <TrustBlockTitle>Khách Hàng Tin Tưởng</TrustBlockTitle>
            <TrustStat>8,000+</TrustStat>
            <TrustBlockText>
              Được tin dùng bởi hơn 8,000 khách hàng tại Việt Nam với tỷ lệ hài lòng lên đến 98%.
            </TrustBlockText>
          </TrustBlock>
          
          <TrustBlock>
            <TrustIcon>
              <i className="fas fa-bolt"></i>
            </TrustIcon>
            <TrustBlockTitle>Giao Dịch Cực Nhanh</TrustBlockTitle>
            <TrustStat>95%</TrustStat>
            <TrustBlockText>
              Đơn hàng xử lý trong 5 phút. Nhận tài khoản ngay sau khi thanh toán.
            </TrustBlockText>
          </TrustBlock>
          
          <TrustBlock>
            <TrustIcon>
              <i className="fas fa-th-large"></i>
            </TrustIcon>
            <TrustBlockTitle>Hỗ Trợ Đa Nền Tảng</TrustBlockTitle>
            <TrustStat>500+</TrustStat>
            <TrustBlockText>
              Hơn 500 ứng dụng Premium từ học tập, giải trí đến công cụ làm việc chuyên nghiệp.
            </TrustBlockText>
          </TrustBlock>
          
          <TrustBlock>
            <TrustIcon>
              <i className="fas fa-piggy-bank"></i>
            </TrustIcon>
            <TrustBlockTitle>Giá Cả Siêu Tiết Kiệm</TrustBlockTitle>
            <TrustStat>80%</TrustStat>
            <TrustBlockText>
              Tiết kiệm từ 30% đến 80% so với mua trực tiếp nhờ chương trình khuyến mãi đặc biệt.
            </TrustBlockText>
          </TrustBlock>
          
          <TrustBlock>
            <TrustIcon>
              <i className="fas fa-headset"></i>
            </TrustIcon>
            <TrustBlockTitle>Hỗ Trợ Mọi Lúc - Mọi Nơi</TrustBlockTitle>
            <TrustStat>24/7</TrustStat>
            <TrustBlockText>
              Hỗ trợ nhanh qua Hotline, Zalo, Facebook, Instagram, bảo hành ngay lập tức nếu gặp lỗi.
            </TrustBlockText>
          </TrustBlock>
          
          <TrustBlock>
            <TrustIcon>
              <i className="fas fa-star"></i>
            </TrustIcon>
            <TrustBlockTitle>Uy Tín Được Kiểm Chứng</TrustBlockTitle>
            <TrustStat>4.9/5</TrustStat>
            <TrustBlockText>
              Đánh giá trung bình 4.9/5 từ khách hàng với rất nhiều feedback thực tế mỗi ngày.
            </TrustBlockText>
          </TrustBlock>
        </TrustBlocksContainer>
      </TrustSection>
      
      <BackgroundAnimation />
    </Section>
  );
};

export default PricingSection;
