import {createGlobalStyle} from "styled-components"
import { colors } from "./colors";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    color: ${colors.dark}
  }

  #root {
    margin: 0 auto;
  }
  
  button {
    border: none;
    background: none;
    outline: none;
  }
`

export default GlobalStyle;
