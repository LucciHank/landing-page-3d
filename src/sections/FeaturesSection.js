import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

// Sphere model component
const Sphere = ({ color }) => {
  return (
    <mesh rotation={[0, 0, 0]} scale={1.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.7} 
        roughness={0.2} 
      />
    </mesh>
  );
};

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
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (max-width: 64em) {
    width: 90%;
    flex-direction: column;
  }
`;

const FeatureText = styled.div`
  width: 50%;
  z-index: 5;
  
  @media screen and (max-width: 64em) {
    width: 100%;
    order: 2;
    margin-top: 2rem;
  }
`;

const FeatureModel = styled.div`
  width: 50%;
  height: 70vh;
  position: relative;
  z-index: 5;

  @media screen and (max-width: 64em) {
    width: 100%;
    height: 50vh;
    order: 1;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  counter-reset: feature-counter;
`;

const FeatureItem = styled.li`
  margin-bottom: 4rem;
  display: flex;
  opacity: 0;
  transform: translateX(-50px);
  
  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    counter-increment: feature-counter;
    content: counter(feature-counter);
    font-size: var(--fontxl);
    font-weight: 700;
    color: var(--primary);
    margin-right: 2rem;
    background: rgba(223, 38, 38, 0.2);
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeatureTitle = styled.h3`
  font-size: var(--fontlg);
  color: var(--white);
  margin-bottom: 1rem;

  @media screen and (max-width: 48em) {
    font-size: var(--fontmd);
  }
`;

const FeatureDescription = styled.p`
  font-size: var(--fontxs);
  color: var(--greyLight);
  line-height: 1.5;
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

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featureItemsRef = useRef([]);
  const modelRef = useRef(null);

  // Features data
  const features = [
    {
      title: "Truy cập không giới hạn",
      description: "Trải nghiệm toàn bộ nội dung Premium không giới hạn, không quảng cáo và có thể sử dụng trên nhiều thiết bị khác nhau."
    },
    {
      title: "Chất lượng cao nhất",
      description: "Thưởng thức nội dung với chất lượng tốt nhất có thể - video 4K HDR, âm thanh Dolby Atmos và trải nghiệm không bị giới hạn."
    },
    {
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi với các vấn đề về tài khoản hoặc dịch vụ."
    },
    {
      title: "Cập nhật liên tục",
      description: "Các tài khoản Premium của chúng tôi luôn được cập nhật và duy trì, đảm bảo trải nghiệm liền mạch dài hạn."
    }
  ];

  useLayoutEffect(() => {
    // Ref for feature items
    const featureItems = featureItemsRef.current;
    
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

    // Animation for feature items
    featureItems.forEach((item, index) => {
      gsap.to(item, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        },
        delay: 0.2 * index,
      });
    });

    // Animation for 3D model
    if (modelRef.current) {
      gsap.fromTo(
        modelRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Section id="features" ref={sectionRef}>
      <Title ref={titleRef}>Tính Năng Nổi Bật</Title>
      
      <Container>
        <FeatureText>
          <FeatureList>
            {features.map((feature, index) => (
              <FeatureItem key={index} ref={el => (featureItemsRef.current[index] = el)}>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            ))}
          </FeatureList>
        </FeatureText>
        
        <FeatureModel ref={modelRef}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, 0, -20]} intensity={0.5} color="#df2626" />
            <pointLight position={[0, -10, 0]} intensity={0.5} color="#df2626" />
            <Sphere color="#df2626" />
            <Environment preset="studio" />
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </FeatureModel>
      </Container>
      
      <BackgroundAnimation />
    </Section>
  );
};

export default FeaturesSection; 