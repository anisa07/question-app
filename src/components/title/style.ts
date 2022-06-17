import styled from "styled-components";
import { colors } from "../../styles/colors";

export const TitleContainer = styled.div`
  margin: 0 0 1rem;
  
  h3 {
    position: relative;
    display: inline-block;
    font-size: 1.2rem;
  }
  
  .prompt {
    position: absolute;
    font-size: 12px;
    font-weight: normal;
    top: 1.5rem;
    left: 50%;
    background: white;
    padding: 0.3rem;
    z-index: 10;
    min-width: 200px;
    border: 1px solid ${colors.dark};
  }
`
