import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";

const commonInputStyle = css<{ error: boolean }>`
  padding: 10px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: ${({error}) => error ? colors.warn : colors.dark }
  color: ${({error}) => error ? colors.warn : colors.dark};
  font-family: 'Poppins', sans-serif;
  font-weight: 450;
`

export const StyledInput = styled.input<{ error: boolean }>`
  ${commonInputStyle}
`;

export const ErrorMessage = styled.p`
    color: ${colors.warn};
`

export const StyledArea = styled.textarea<{ error: boolean }>`
  ${commonInputStyle}
`;
