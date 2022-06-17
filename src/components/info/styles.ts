import styled from "styled-components";
import { colors } from "../../styles/colors";
import { device } from "../../styles/dimensions";

export const InfoContainer = styled.p`
  border: none;
  border-bottom: 1.5px solid ${colors.dark};
  padding-bottom: 1rem;
  line-height: 1.2rem;

  @media ${device.tablet} {
    border: none;
    border-right: 1.5px solid ${colors.dark};
    height: 100%;
    padding-right: 1rem;
    line-height: 1.5rem;
  }
`;
