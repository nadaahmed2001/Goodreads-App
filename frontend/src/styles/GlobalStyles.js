import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
 ////////////////////////////////////////////////////
  &, &.light-mode {
    --bg-beige: #f5eed8;
    --bg-box: #fff7e7;
    --bg-btn:#59461b;
    --bg-brown: #59461b;
    --text-brown: #59461b;
    --text-brown-hover:rgb(175, 157, 118);

    --text-beige: #f5eed8;
    --border-no:transparent;
     --bg-white:#fff;
     --chat-btn: #59461b;
   --chat-btn-hover:rgb(151, 136, 102);
   

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  
    --image-grayscale: 0;
  --image-opacity: 100%;

  .box-gradient {
  background: rgba(60, 51, 80, 0);
  background: linear-gradient(-90deg, rgba(60, 51, 80, 0) 0%, #199ae8 100%);
  background: -webkit-linear-gradient(
    -90deg,
    rgba(60, 51, 80, 0) 0%,
    #199ae8 100%
  );
}
  }
  ////////////////////////////////////////////////
  &.dark-mode {
    --bg-beige: #18212f;
    --text-brown: #f5eed8;
    --bg-brown: #18212f;
    --text-brown-hover:rgb(199, 179, 133);
    --bg-box: #18212f;
    --bg-btn:transparent;
    --text-beige: #f5eed8;
    --border-no:#59461b;
    --bg-white:#18212f;
    --chat-btn:#18212f;
    --chat-btn-hover:#;

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
////////////////////////////////////////////////
  }
  
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;
  
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;


}

// *,
// *::before,
// *::after {
//   box-sizing: border-box;
//   padding: 0;
//   margin: 0;

//   /* Creating animations for dark mode */
//   transition: background-color 0.3s, border 0.3s;
// }

// html {
//   font-size: 82.5%;
// }

// body {
//   font-family: "Poppins", sans-serif;
//   color: var(--color-grey-700);

//   transition: color 0.3s, background-color 0.3s;
//   min-height: 100vh;
//   line-height: 1.5;
//   font-size: 1.6rem;
// }

// input,
// button,
// textarea,
// select {
//   font: inherit;
//   color: inherit;
// }

// button {
//   cursor: pointer;
// }

// *:disabled {
//   cursor: not-allowed;
// }

// select:disabled,
// input:disabled {
//   background-color: var(--color-grey-200);
//   color: var(--color-grey-500);
// }

// input:focus,
// button:focus,
// textarea:focus,
// select:focus {
//   outline: 2px solid var(--color-brand-600);
//   outline-offset: -1px;
// }

/* Parent selector, finally   */
// button:has(svg) {
//   line-height: 0;
// }

// a {
//   color: inherit;
//   text-decoration: none;
// }

// ul {
//   list-style: none;
// }

// p,
// h1,
// h2,
// h3,
// h4,
// h5,
// h6 {
//   overflow-wrap: break-word;
//   hyphens: auto;
// }

img {
  // max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
