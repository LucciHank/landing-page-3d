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
  justify-content: center;
  align-items: flex-start;
  gap: 4rem;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 64em) {
    width: 90%;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
`;

const LeftColumn = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateX(-50px);

  @media screen and (max-width: 64em) {
    width: 100%;
    max-width: 500px;
  }
`;

const InfoBox = styled.div`
  margin-bottom: 3rem;
`;

const InfoTitle = styled.h3`
  font-size: var(--fontlg);
  color: var(--white);
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const InfoText = styled.p`
  font-size: var(--fontxs);
  color: var(--greyLight);
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialIcon = styled.a`
  width: 50px;
  height: 50px;
  background: rgba(223, 38, 38, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: var(--primary);
    transform: translateY(-5px);
  }
  
  &.zalo {
    font-family: var(--fontR);
    font-weight: 700;
    font-size: 1.8rem;
  }
`;

const RightColumn = styled.div`
  width: 45%;
  opacity: 0;
  transform: translateX(50px);
  display: flex;
  justify-content: center;

  @media screen and (max-width: 64em) {
    width: 100%;
  }
`;

const ContactForm = styled.form`
  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(223, 38, 38, 0.1);
    border-color: rgba(223, 38, 38, 0.1);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.8rem;
  text-align: left;
`;

const FormLabel = styled.label`
  display: block;
  font-size: var(--fontxs);
  color: var(--white);
  margin-bottom: 0.7rem;
  font-weight: 500;
  letter-spacing: -0.01em;
`;

const FormInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.2rem 1rem;
  color: var(--white);
  font-size: var(--fontxs);
  transition: all 0.3s ease;
  font-family: var(--fontR);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(223, 38, 38, 0.15);
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: var(--greyLight);
    opacity: 0.7;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.2rem 1rem;
  color: var(--white);
  font-size: var(--fontxs);
  resize: none;
  transition: all 0.3s ease;
  font-family: var(--fontR);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(223, 38, 38, 0.15);
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: var(--greyLight);
    opacity: 0.7;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 10px;
  padding: 1.2rem 2rem;
  font-size: var(--fontxs);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.02em;
  
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
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    background: var(--primaryDark);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  i {
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(223, 38, 38, 0.05) 0%, transparent 70%);
  pointer-events: none;
`;

const FooterText = styled.p`
  font-size: var(--fontxxs);
  color: var(--greyLight);
  text-align: center;
  margin-top: 5rem;
  opacity: 0;
`;

const MessageBox = styled.div`
  background: ${props => props.success ? 'rgba(0, 200, 0, 0.2)' : 'rgba(200, 0, 0, 0.2)'};
  color: ${props => props.success ? '#00c800' : '#ff0000'};
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
  display: ${props => props.visible ? 'block' : 'none'};
`;

// Thêm styled components cho dialog
const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogContent = styled.div`
  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DialogTitle = styled.h3`
  font-size: var(--fontlg);
  color: ${props => props.success ? '#4CAF50' : '#df2626'};
  margin-bottom: 1rem;
`;

const DialogMessage = styled.p`
  font-size: var(--fontxs);
  color: var(--white);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const DialogButton = styled.button`
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 30px;
  padding: 0.8rem 2rem;
  font-size: var(--fontxs);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primaryDark);
    transform: translateY(-3px);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: var(--greyLight);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--white);
    transform: rotate(90deg);
  }
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [message, setMessage] = useState({ text: '', success: false, visible: false });
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', message: '', success: false });
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const footerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setDialogContent({
        title: 'Lỗi Gửi Form',
        message: 'Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên, Email và Tin nhắn).',
        success: false
      });
      setShowDialog(true);
      return;
    }
    
    try {
      const form = e.target;
      const formData = new FormData(form);
      
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success
        setDialogContent({
          title: 'Gửi Thành Công',
          message: 'Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.',
          success: true
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        form.reset();
      } else {
        // Error
        const data = await response.json();
        setDialogContent({
          title: 'Lỗi Gửi Form',
          message: data.error || 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau hoặc liên hệ qua các kênh khác.',
          success: false
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setDialogContent({
        title: 'Lỗi Kết Nối',
        message: 'Có lỗi kết nối khi gửi tin nhắn. Vui lòng kiểm tra kết nối internet và thử lại.',
        success: false
      });
    }
    
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

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

    // Animation for left column
    gsap.to(leftColumnRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: leftColumnRef.current,
        start: "top 80%",
      }
    });

    // Animation for right column
    gsap.to(rightColumnRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: rightColumnRef.current,
        start: "top 80%",
      }
    });

    // Animation for footer text
    gsap.to(footerRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Section id="contact" ref={sectionRef}>
      <Title ref={titleRef}>Liên Hệ Với Chúng Tôi</Title>
      
      <Container>
        <LeftColumn ref={leftColumnRef}>
          <InfoBox>
            <InfoTitle>Hãy nói chuyện với chúng tôi</InfoTitle>
            <InfoText>
              Bạn đang quan tâm đến dịch vụ Premium của chúng tôi? Đừng ngần ngại liên hệ để được tư vấn.
              Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn 24/7.
            </InfoText>
            <InfoText>
              <strong>Email:</strong> support@tomoi.vn<br />
              <strong>Hotline:</strong> 0988.888.888<br />
              <strong>Địa chỉ:</strong> 123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
            </InfoText>
          </InfoBox>
          
          <InfoBox>
            <InfoTitle>Giờ làm việc</InfoTitle>
            <InfoText>
              <strong>Thứ 2 - Thứ 6:</strong> 8:00 - 21:00<br />
              <strong>Thứ 7 - Chủ Nhật:</strong> 9:00 - 18:00
            </InfoText>
          </InfoBox>
          
          <SocialLinks>
            <SocialIcon href="https://www.facebook.com/tomoi.vn" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/tomoi.vn/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
            <SocialIcon href="https://www.tiktok.com/@tomoi.vn" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-tiktok"></i>
            </SocialIcon>
            <SocialIcon href="https://zalo.me/tomoi.vn" target="_blank" rel="noopener noreferrer" className="zalo">
              Z
            </SocialIcon>
          </SocialLinks>
        </LeftColumn>
        
        <RightColumn ref={rightColumnRef}>
          <ContactForm 
            onSubmit={handleSubmit}
            action="https://formspree.io/f/xnnvwdvw"
            method="POST"
          >
            <MessageBox success={message.success} visible={message.visible}>
              {message.text}
            </MessageBox>
            
            <FormGroup>
              <FormLabel>Họ và tên *</FormLabel>
              <FormInput 
                type="text" 
                name="name" 
                placeholder="Nhập họ và tên của bạn" 
                value={formData.name}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Email *</FormLabel>
              <FormInput 
                type="email" 
                name="email" 
                placeholder="Nhập địa chỉ email của bạn" 
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Số điện thoại</FormLabel>
              <FormInput 
                type="tel" 
                name="phone" 
                placeholder="Nhập số điện thoại của bạn" 
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Tin nhắn *</FormLabel>
              <FormTextarea 
                name="message" 
                placeholder="Nhập nội dung tin nhắn" 
                value={formData.message}
                onChange={handleChange}
              />
            </FormGroup>
            
            {/* Honeypot field để tránh spam và tắt reCAPTCHA */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} />
            
            <SubmitButton type="submit">
              <i className="fa fa-paper-plane"></i> Gửi tin nhắn
            </SubmitButton>
          </ContactForm>
        </RightColumn>
      </Container>
      
      <FooterText ref={footerRef}>
        © {new Date().getFullYear()} TomOi.vn. Tất cả các quyền được bảo lưu.
      </FooterText>
      
      <BackgroundAnimation />
      
      {/* Dialog thông báo */}
      <DialogOverlay show={showDialog} onClick={closeDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={closeDialog}>
            <i className="fas fa-times"></i>
          </CloseButton>
          <DialogTitle success={dialogContent.success}>
            {dialogContent.title}
          </DialogTitle>
          <DialogMessage>
            {dialogContent.message}
          </DialogMessage>
          <DialogButton onClick={closeDialog}>
            Đóng
          </DialogButton>
        </DialogContent>
      </DialogOverlay>
    </Section>
  );
};

export default ContactSection; 