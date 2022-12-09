import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme['green-500']};
  }

  body {
    background: ${({ theme }) => theme['gray-900']};
    color: ${({ theme }) => theme['gray-300']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`
