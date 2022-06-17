import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/colors";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadContainer = styled.div`
       width: 32px;
       height: 32px;
       border: 5px solid ${colors.dark};
       border-bottom-color: transparent;
       border-radius: 50%;
       display: inline-block;
       animation: ${rotate} 1s linear infinite;
`
