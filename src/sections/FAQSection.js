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
`;

const FAQContainer = styled.div`
  width: 100%;
  opacity: 0;
  transform: translateY(50px);
`;

const FAQItem = styled.div`
  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 0;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FAQHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: ${props => props.isOpen ? 'rgba(223, 38, 38, 0.1)' : 'transparent'};
  border-bottom: ${props => props.isOpen ? '1px solid rgba(223, 38, 38, 0.2)' : 'none'};
  
  h3 {
    font-size: var(--fontsm);
    color: ${props => props.isOpen ? 'var(--primary)' : 'var(--white)'};
    font-weight: 600;
    margin: 0;
    transition: color 0.3s ease;
  }
  
  .icon {
    color: ${props => props.isOpen ? 'var(--primary)' : 'var(--greyLight)'};
    font-size: 1.2rem;
    transition: all 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
  }
`;

const FAQContent = styled.div`
  height: ${props => props.isOpen ? 'auto' : '0'};
  padding: ${props => props.isOpen ? '1.5rem' : '0 1.5rem'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  overflow: hidden;
  
  p {
    font-size: var(--fontxs);
    color: var(--greyLight);
    line-height: 1.6;
    margin: 0;
  }
`;

const CTAButton = styled.a`
  background-color: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  font-size: var(--fontxs);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 3rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(30px);
  
  i {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
  
  &:hover {
    background-color: var(--primaryDark);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const faqContainerRef = useRef(null);
  const ctaButtonRef = useRef(null);
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  const faqData = [
    {
      question: "Làm sao để mua và nhận tài khoản?",
      answer: "Rất đơn giản, bạn chỉ cần nhấn \"Liên hệ ngay\", chúng tôi sẽ hướng dẫn thanh toán qua chuyển khoản ngân hàng hoặc ví điện tử (Momo, ZaloPay, VNPay). Sau khi thanh toán, thông tin tài khoản Premium sẽ được gửi cho bạn qua email hoặc tin nhắn trong 5-10 phút. Chúng tôi cũng sẽ hướng dẫn chi tiết cách đăng nhập và sử dụng tài khoản."
    },
    {
      question: "Tài khoản \"chia sẻ\" khác gì tài khoản \"chính chủ\"?",
      answer: "Tài khoản chia sẻ là bạn dùng chung gói với người khác (mỗi người một hồ sơ/profile riêng) nên chi phí rẻ hơn, nhưng có thể hạn chế một số quyền (như không đổi được mật khẩu). Tài khoản chính chủ là đăng ký riêng cho bạn, đảm bảo toàn quyền kiểm soát (đổi mật khẩu, thông tin tùy ý). TomOi.vn cung cấp cả hai lựa chọn tùy nhu cầu và ngân sách của bạn."
    },
    {
      question: "Việc sử dụng tài khoản chung có an toàn không?",
      answer: "Chúng tôi cam kết an toàn. Mỗi khách hàng sẽ có profile riêng (đối với gói chia sẻ) và bảo mật thông tin cá nhân. TomOi.vn chỉ sử dụng các phương thức chia sẻ hợp pháp (vd: Family plan) do nhà cung cấp dịch vụ cho phép, tuyệt đối không dùng hàng lậu hay công cụ hack. Vì vậy tài khoản của bạn sẽ hoạt động ổn định, an toàn."
    },
    {
      question: "Tôi cần hỗ trợ thì liên hệ bằng cách nào?",
      answer: "Bạn có thể liên hệ đội hỗ trợ của TomOi.vn qua Zalo, Facebook hoặc Instagram (nút \"Liên hệ ngay\" ở cuối trang). Chúng tôi trực 24/7 để giải đáp mọi vấn đề: từ hướng dẫn sử dụng, hỗ trợ kỹ thuật đến gia hạn dịch vụ khi hết hạn."
    },
    {
      question: "Nếu tài khoản bị lỗi hoặc không đăng nhập được thì sao?",
      answer: "Chúng tôi cam kết bảo hành trong suốt thời gian sử dụng. Nếu tài khoản gặp vấn đề, bạn chỉ cần liên hệ với đội hỗ trợ của TomOi.vn qua Zalo, Facebook hoặc Instagram. Chúng tôi sẽ khắc phục hoặc cung cấp tài khoản thay thế trong thời gian nhanh nhất, thường là trong vòng 30 phút đến 24 giờ tùy theo dịch vụ."
    },
    {
      question: "TomOi.vn có cung cấp hóa đơn VAT không?",
      answer: "Có, chúng tôi có thể cung cấp hóa đơn VAT cho các đơn hàng từ 500.000đ trở lên. Vui lòng thông báo nhu cầu xuất hóa đơn khi đặt hàng và cung cấp thông tin xuất hóa đơn đầy đủ. Hóa đơn sẽ được gửi qua email trong vòng 3-5 ngày làm việc sau khi thanh toán."
    }
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

    // Animation for FAQ container
    gsap.to(faqContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: faqContainerRef.current,
        start: "top 80%",
      }
    });
    
    // Animation for CTA button
    gsap.to(ctaButtonRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ctaButtonRef.current,
        start: "top 90%",
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Section id="faq" ref={sectionRef}>
      <Title ref={titleRef}>Câu Hỏi Thường Gặp</Title>
      
      <Container>
        <FAQContainer ref={faqContainerRef}>
          {faqData.map((faq, index) => (
            <FAQItem key={index}>
              <FAQHeader 
                isOpen={openIndex === index} 
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <div className="icon">+</div>
              </FAQHeader>
              <FAQContent isOpen={openIndex === index}>
                <p>{faq.answer}</p>
              </FAQContent>
            </FAQItem>
          ))}
        </FAQContainer>
        
        <CTAButton 
          href="https://www.instagram.com/tomoi.vn/" 
          target="_blank" 
          rel="noopener noreferrer"
          ref={ctaButtonRef}
        >
          <i className="fab fa-instagram"></i> Liên hệ tư vấn ngay
        </CTAButton>
      </Container>
      
      <BackgroundAnimation />
    </Section>
  );
};

export default FAQSection; 