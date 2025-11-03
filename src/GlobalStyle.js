import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-family: "Momo Trust Display", sans-serif;
    --color-background: #e2dcc5;
    --color-card: #c3baa7;
    --color-text1: #222222;
    --color-text2: #e9f1f1ff;
    --color-primary: #6c5ce7;
    --color-primary-hover: #5b4ac7;
    --color-secondary: #d1cfe9ff;
    --color-status1: #ff4d4f;
    --color-status2: #00b894;
    --color-border: #ccc;
    --color-success: #27ae60;
    --color-error: #ff4d4f;
    --color-footer: #222222;
    --color-text: #222222;
    --border-radius: 10px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    background-color: var(--color-background);
    color: var(--color-text);
  }
`
