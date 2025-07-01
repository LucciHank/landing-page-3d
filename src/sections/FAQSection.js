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
      "question": "❓ Làm sao để mua và nhận tài khoản?",
      "answer": "Rất đơn giản! Bạn chỉ cần nhấn “Liên hệ ngay”, TomOi.vn sẽ hướng dẫn thanh toán qua chuyển khoản ngân hàng hoặc ví điện tử (Momo, ZaloPay, VNPay). Sau khi thanh toán thành công, bạn sẽ nhận được tài khoản Premium qua email hoặc tin nhắn trong vòng 5–10 phút, kèm hướng dẫn đăng nhập chi tiết."
    },
    {
      "question": "❓ Tài khoản “chia sẻ” khác gì tài khoản “chính chủ”?",
      "answer": "Tài khoản chính chủ: bạn là người duy nhất sử dụng tài khoản, có thể tùy chỉnh thông tin, tạo playlist, lưu lịch sử,…\n\nTài khoản chia sẻ: là dạng dùng chung theo slot, không chỉnh sửa thông tin, không can thiệp vào tài khoản gốc – giá rẻ hơn nhiều, vẫn dùng đầy đủ tính năng Premium."
    },
    {
      "question": "❓ Việc sử dụng tài khoản chung có an toàn không?",
      "answer": "Hoàn toàn an toàn nếu bạn mua từ TomOi.vn. Các tài khoản chung khi được gửi đến bạn đều sẽ được TomOi.vn gửi kèm hướng dẫn chi tiết để đảm bảo quyền lợi và an toàn cho khách hàng."
    },
    {
      "question": "❓ Tôi có thể sử dụng tài khoản trên bao nhiêu thiết bị?",
      "answer": "Với tài khoản chính chủ: bạn có thể đăng nhập trên nhiều thiết bị (số lượng tùy nền tảng, thường từ 5-10 thiết bị).\n\nVới tài khoản chia sẻ: vui lòng sử dụng duy nhất trên 1 thiết bị cố định duy nhất, không được đăng nhập nhiều nơi."
    },
    {
      "question": "❓ Nếu tài khoản bị lỗi hoặc không đăng nhập được thì sao?",
      "answer": "Bạn chỉ cần nhắn Zalo, Fanpage hoặc Hotline hỗ trợ. Chúng tôi cam kết phản hồi nhanh và hỗ trợ xử lý sự cố trong vòng 1–12 giờ, tùy mức độ. Trường hợp cần thiết, sẽ cấp lại hoặc đổi tài khoản mới hoàn toàn."
    },
    {
      "question": "❓ TomOi.vn có hỗ trợ sau bán không?",
      "answer": "Có! Chúng tôi luôn bảo hành tài khoản trọn gói mà bạn đã mua theo phương châm \"Mua bao lâu - Bảo hành bấy lâu\". Bất cứ khi nào bạn cần, bạn chỉ cần đọc thần chú \"Tôm Ơi!\", Tôm sẽ xuất hiện và hỗ trợ bạn ngay lập tức."
    },
    {
      "question": "❓ TomOi.vn có cung cấp hóa đơn VAT không?",
      "answer": "Đối với các doanh nghiệp mua đơn hàng giá trị cao, TomOi.vn luôn hỗ trợ hợp đồng và hóa đơn VAT (Đối với 1 số loại sản phẩm nhất định)."
    },
    {
      "question": "❓ Tôi có được hoàn tiền nếu dịch vụ không như cam kết?",
      "answer": "TomOi.vn luôn ưu tiên quyền lợi khách hàng. Nếu tài khoản gặp lỗi do hệ thống và không thể khắc phục, TomOi.vn cam kết hoàn tiền 100% hoặc hỗ trợ đổi tài khoản khác phù hợp. Bạn có thể tham khảo chính sách bảo hành của TomOi.vn <b><a href=\"https://help.tomoi.vn/chinh-sach-bao-hanh\" target=\"_blank\">tại đây</a></b>."
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
                <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
              </FAQContent>
            </FAQItem>
          ))}
        </FAQContainer>
        
        <CTAButton 
          href="https://www.instagram.com/tomoivn/" 
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