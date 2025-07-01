import { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { ColorContextProvider } from "./context/ColorContext";
import NavBar from './components/NavBar';

// Lazy load sections
const HeroSection = lazy(() => import('./sections/HeroSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const FeaturesSection = lazy(() => import('./sections/FeaturesSection'));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'));
const PricingSection = lazy(() => import('./sections/PricingSection'));
const FAQSection = lazy(() => import('./sections/FAQSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

const LoadingFallback = () => (
  <div style={{
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#121212'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '3px solid rgba(223, 38, 38, 0.2)',
      borderTop: '3px solid #df2626',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
  </div>
);

function App() {
  return (
    <Router>
      <GlobalStyle />
      <NavBar />
      <ColorContextProvider>
        <Suspense fallback={<LoadingFallback />}>
          <HeroSection />
          <ServicesSection />
          <FeaturesSection />
          <TestimonialsSection />
        <PricingSection />
          <FAQSection />
          <ContactSection />
        </Suspense>
      </ColorContextProvider>
    </Router>
  );
}

export default App;
