import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    /* Colors */
    --primary: #df2626;
    --primaryDark: #c71f1f;
    --secondary: #1e1e1e;
    --black: #121212;
    --darkBg: #0a0a0a;
    --white: #ffffff;
    --grey: #666666;
    --greyLight: #999999;
    --success: #4BB543;
    --error: #FF3333;

    /* Font Sizes */
    --fontxxxl: 4rem;
    --fontxxl: 3rem;
    --fontxl: 2.2rem;
    --fontlg: 1.8rem;
    --fontmd: 1.5rem;
    --fontsm: 1.2rem;
    --fontxs: 1rem;
    --fontxxs: 0.8rem;

    /* Font Families */
    --fontL: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --fontR: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  /* SF Pro Display and SF Pro Text Font Faces */
  @font-face {
    font-family: 'SF Pro Display';
    src: url('https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'SF Pro Display';
    src: url('https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-medium-webfont.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'SF Pro Display';
    src: url('https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-semibold-webfont.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'SF Pro Display';
    src: url('https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-bold-webfont.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'SF Pro Text';
    src: url('https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscotext-regular-webfont.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'SF Pro Text';
    src: url('https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscotext-medium-webfont.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'SF Pro Text';
    src: url('https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscotext-semibold-webfont.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
}

  body {
    font-family: var(--fontR);
    background-color: var(--black);
    color: var(--white);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--fontL);
    font-weight: 600;
    margin: 0;
    padding: 0;
    letter-spacing: -0.02em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: var(--fontR);
    font-weight: 500;
    cursor: pointer;
  }

  input, textarea {
    font-family: var(--fontR);
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  /* Selection styling */
  ::selection {
    background-color: var(--primary);
    color: var(--white);
  }
  
  /* Optimize for mobile */
  @media screen and (max-width: 48em) {
    :root {
      --fontxxxl: 2.8rem;
      --fontxxl: 2.2rem;
      --fontxl: 1.8rem;
      --fontlg: 1.5rem;
      --fontmd: 1.2rem;
      --fontsm: 1rem;
      --fontxs: 0.9rem;
      --fontxxs: 0.75rem;
}
  }
`;

export default GlobalStyle;