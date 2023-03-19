import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.background_main};
  }

  a {
    color: #333;
    text-decoration: none;
  }
`;

