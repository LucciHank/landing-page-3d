import React, { Suspense } from 'react';

const LoadingFallback = () => (
  <div 
    style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'var(--darkBg)'
    }}
  >
    <div 
      style={{ 
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '3px solid rgba(223, 38, 38, 0.2)',
        borderTop: '3px solid var(--primary)',
        animation: 'spin 1s linear infinite'
      }} 
    />
  </div>
);

export const lazyLoad = (importFunc) => {
  const LazyComponent = React.lazy(importFunc);
  
  return (props) => (
    <Suspense fallback={<LoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Image lazy loading
export const LazyImage = ({ src, alt, ...rest }) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
  }, [src]);

  return (
    <>
      {!imageLoaded && (
        <div 
          style={{
            backgroundColor: 'rgba(30, 30, 30, 0.8)',
            height: rest.height || '200px',
            width: rest.width || '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px'
          }}
        >
          <div 
            style={{ 
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: '2px solid rgba(223, 38, 38, 0.2)',
              borderTop: '2px solid var(--primary)',
              animation: 'spin 1s linear infinite'
            }} 
          />
        </div>
      )}
      <img
        src={imageSrc || ''}
        alt={alt}
        loading="lazy"
        style={{ 
          display: imageLoaded ? 'block' : 'none',
          transition: 'opacity 0.3s ease',
          opacity: imageLoaded ? 1 : 0
        }}
        {...rest}
      />
    </>
  );
}; 