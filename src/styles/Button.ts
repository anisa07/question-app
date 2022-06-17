import styled from "styled-components";
import { colors } from "./colors";

const Button = styled.button`
  background: ${colors.primary};
  border-radius: 3px;
  border: none;
  color: ${colors.light};
  padding: .75rem;
  font-weight: bold;
  
  :disabled {
    background: lightgrey;
  }
`
const WarnButton = styled(Button)`
  background: ${colors.warn};
`



export { Button, WarnButton };
