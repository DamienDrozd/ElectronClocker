import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Space Mono';
    src: url(../../../public/fonts/SpaceMono-Regular.ttf) format('regular');
      url(../../../public/fonts/SpaceMono-Bold.ttf) format('bold');
      url(../../../public/fonts/SpaceMono-Italic.ttf) format('italic');
      url(../../../public/fonts/SpaceMono-BoldItalic.ttf) format('bold-italic');
  }

  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.background_main};
    font-family: 'Space Mono', monospace;
  }

  a {
    color: #333;
    text-decoration: none;
  }
`;

