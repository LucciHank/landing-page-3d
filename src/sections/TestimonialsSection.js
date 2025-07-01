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
  overflow: hidden;
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
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 64em) {
    width: 90%;
  }
`;

const TestimonialsContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: hidden;
  position: relative;
  scroll-behavior: smooth;
`;

const Testimonial = styled.div`
  min-width: 350px;
  width: 350px;
  height: 450px;
  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 0 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transform: scale(0.9);
  opacity: 0.7;
  transition: all 0.5s ease;

  &.active {
    transform: scale(1);
    opacity: 1;
  }

  @media screen and (max-width: 48em) {
    min-width: 300px;
    width: 300px;
    height: 400px;
    margin: 0 1rem;
  }
`;

const TestimonialContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Quote = styled.div`
  font-size: 4rem;
  color: rgba(223, 38, 38, 0.5);
  line-height: 1;
  margin-bottom: 1rem;
`;

const TestimonialText = styled.p`
  font-size: var(--fontxs);
  color: var(--greyLight);
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const Rating = styled.div`
  display: flex;
  margin-bottom: 1rem;
  
  span {
    color: var(--primary);
    font-size: var(--fontsm);
    margin-right: 0.3rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  border: 2px solid var(--primary);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h4`
  font-size: var(--fontxs);
  color: var(--white);
  font-weight: 600;
`;

const UserLocation = styled.p`
  font-size: var(--fontxxs);
  color: var(--greyLight);
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  gap: 1rem;
`;

const ControlButton = styled.button`
  background: rgba(223, 38, 38, 0.2);
  color: var(--white);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary);
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background: rgba(223, 38, 38, 0.2);
      transform: scale(1);
    }
  }
`;

const ProgressBar = styled.div`
  width: 50%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 3rem;
  border-radius: 2px;
  overflow: hidden;
  
  @media screen and (max-width: 48em) {
    width: 80%;
  }
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
`;

const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: radial-gradient(ellipse at center, rgba(223, 38, 38, 0.1) 0%, transparent 70%);
  pointer-events: none;
`;

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Testimonials data
  const testimonials = [
    {
      text: "Đăng ký Netflix Premium bên TomOi.vn thấy ưng lắm luôn. Coi phim mượt, không quảng cáo, chất lượng 4K nét căng. Mỗi tối về chỉ muốn nằm xem cho đã!.",
      rating: 5,
      name: "Quốc Hưng",
      location: "Hà Nội",
      image: "https://res.cloudinary.com/dmtqemcid/image/upload/v1751356688/32e9cc9a-5d02-4f6e-9756-2fbe46018ae4.png"
    },
    {
      text: "Lúc trước nghe nhạc toàn bị quảng cáo chen ngang, khó chịu lắm. Giờ có Spotify Premium bên TomOi.vn rồi, nhạc chơi liên tục, chọn bài nào cũng được, thích ghê!",
      rating: 5,
      name: "Tùng Anh",
      location: "Bình Dương",
      image: "https://res.cloudinary.com/dmtqemcid/image/upload/v1751357342/484034819_605697545633918_8345424114695342951_n_fzlnjp.jpg"
    },
    {
      text: "Mình dùng YouTube Premium ở đây chắc cũng hơn nửa năm rồi, ổn định từ đầu đến giờ luôn. Cần hỏi gì nhắn Zalo là được trả lời liền. Dịch vụ quá ok!",
      rating: 5,
      name: "Ngọc Hân",
      location: "Đà Nẵng",
      image: "https://res.cloudinary.com/dmtqemcid/image/upload/v1751357341/de9f5bd0-9823-4579-b59b-0c4a2feb5600_ho9mmc.jpg"
    },
    {
      text: "Dùng Office 365 làm việc mỗi ngày, đồng bộ cực tiện. Lúc đầu cũng hơi lăn tăn nhưng được tư vấn kỹ, giờ dùng quen rồi, thấy quá hời so với giá.",
      rating: 5,
      name: "Đức Minh",
      location: "Hồ Chí Minh",
      image: "https://res.cloudinary.com/dmtqemcid/image/upload/v1751357553/485387182_2496173287407426_6110116245869713847_n_kisldd.jpg"
    },
    {
      text: "Combo bên này giá rẻ thật sự luôn, có mấy nghìn/ngày mà dùng cả đống dịch vụ. Tưởng hàng Premium là mắc lắm, ai ngờ rẻ mà chất. Vote 5 sao!",
      rating: 5,
      name: "Khắc Đức",
      location: "Huế",
      image: "https://res.cloudinary.com/dmtqemcid/image/upload/v1751357848/472297629_2410161515997981_3994469589014196254_n_yzwstl.jpg"
    }
  ];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      
      const scrollAmount = -370; // width + margin
      testimonialsRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
      
      const scrollAmount = 370; // width + margin
      testimonialsRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Calculate progress percentage
  const progressPercent = ((currentIndex + 1) / testimonials.length) * 100;

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

    // Animation for testimonials container
    gsap.fromTo(
      testimonialsRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Section id="testimonials" ref={sectionRef}>
      <Title ref={titleRef}>Khách Hàng Nói Gì Về Chúng Tôi</Title>
      
      <Container>
        <TestimonialsContainer ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} className={currentIndex === index ? 'active' : ''}>
              <TestimonialContent>
                <Quote>"</Quote>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <Rating>
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < testimonial.rating ? '★' : '☆'}</span>
                  ))}
                </Rating>
              </TestimonialContent>
              <UserInfo>
                <UserImage>
                  <img src={testimonial.image} alt={testimonial.name} />
                </UserImage>
                <UserDetails>
                  <UserName>{testimonial.name}</UserName>
                  <UserLocation>{testimonial.location}</UserLocation>
                </UserDetails>
              </UserInfo>
            </Testimonial>
          ))}
        </TestimonialsContainer>
        
        <Controls>
          <ControlButton onClick={handlePrev} disabled={currentIndex === 0}>
            &lt;
          </ControlButton>
          <ControlButton onClick={handleNext} disabled={currentIndex === testimonials.length - 1}>
            &gt;
          </ControlButton>
        </Controls>
        
        <ProgressBar>
          <Progress progress={progressPercent} />
        </ProgressBar>
      </Container>
      
      <BackgroundAnimation />
    </Section>
  );
};

export default TestimonialsSection; 