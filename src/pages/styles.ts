import styled from "styled-components";
import { device } from "../styles/dimensions";

export const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  
  .first-block, .second-block {
    flex: unset;
    padding: 0 1rem;
  }
  
  .second-block {
    margin-top: 1rem;
  }
  
  @media ${device.tablet} {
    flex-direction: row;

    .first-block {
      flex: 1;
      padding: 0 2rem;
    }
    
    .second-block {
      flex: 3;
      padding: 0;
      margin-top: 0;
    }
  }
`
